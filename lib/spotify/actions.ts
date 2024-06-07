'use server';

import { getSession, Session } from '@auth0/nextjs-auth0';
import prisma from '@/prisma';
import { Auth0ManagementService } from '../auth0';
import axios from 'axios';

export async function getSpotifyAccessTokenFromSession(
  userId: string,
): Promise<string> {
  const apiToken = await Auth0ManagementService.getAccessToken();
  const auth0Url = new URL(
    userId,
    `${process.env['AUTH0_ISSUER_BASE_URL']}/api/v2/users/`,
  ).href;
  const auth0Options = {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${apiToken}`,
    },
  };
  const userResp = await axios.get(auth0Url, auth0Options);
  const user = userResp.data;

  if (user?.identities?.length === 0) {
    console.log('NO IDENTITIES, HOPE THIS IS FIRST LOGIN');
    return 'NONE';
  }

  const spotifyAccessToken = user.identities[0].access_token as string;
  const spotifyRefreshToken = user.identities[0].refresh_token as string;

  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      spotifyAccessToken,
      spotifyRefreshToken,
    },
  });

  return spotifyAccessToken;
}

async function getSpotifyAccessTokenFromDB(
  userId: string,
): Promise<string | 'NONE'> {
  const userResp = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!userResp?.spotifyAccessToken) {
    return 'NONE';
  }

  return userResp.spotifyAccessToken;
}

export async function refreshSpotifyToken(
  userId?: string,
): Promise<string | 'REAUTHENTICATE'> {
  let _userId = userId;
  if (!_userId) {
    const session = await getSession();
    if (!session?.user?.sub) {
      return 'REAUTHENTICATE';
    }
    _userId = session.user.sub;
  }

  const userResp = await prisma.user.findUnique({
    where: {
      id: _userId,
    },
  });
  if (!userResp?.spotifyRefreshToken) {
    return 'REAUTHENTICATE';
  }
  const refreshToken = userResp.spotifyRefreshToken;

  const refreshUrl = `https://accounts.spotify.com/api/token`;
  const secretAndId =
    process.env['SPOTIFY_CLIENT_ID'] +
    ':' +
    process.env['SPOTIFY_CLIENT_SECRET'];
  const refreshPaylod = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: 'Basic ' + Buffer.from(secretAndId).toString('base64'),
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
    }),
  };
  const refreshBody = await fetch(refreshUrl, refreshPaylod);
  const accessToken = await refreshBody.json();

  const newRefreshToken = accessToken.refresh_token;
  const newAccessToken = accessToken.access_token;

  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      spotifyRefreshToken: newRefreshToken,
      spotifyAccessToken: newAccessToken,
    },
  });

  return newAccessToken;
}

export async function getSpotifyAccessToken(userId: string) {
  let accessToken = await getSpotifyAccessTokenFromDB(userId);
  if (accessToken === 'NONE') {
    accessToken = await getSpotifyAccessTokenFromSession(userId);
  }
  return accessToken;
}
