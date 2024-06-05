'use server';

import { getSession, Session } from '@auth0/nextjs-auth0';
import prisma from '@/prisma';
import { Auth0ManagementService } from '../auth0';
import axios from 'axios';

export async function getSpotifyAccessTokenFromSession(
  session: Session,
): Promise<string> {
  const apiToken = await Auth0ManagementService.getAccessToken();
  console.log('GOT API TOKKKNENEEN', apiToken);
  const auth0Url = new URL(
    session.user.sub,
    `${process.env['AUTH0_ISSUER_BASE_URL']}/api/v2/users/`,
  ).href;
  const auth0Options = {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${apiToken}`,
    },
  };
  console.log(auth0Url, auth0Options);
  const userResp = await axios.get(auth0Url, auth0Options);
  console.log(userResp);
  const user = userResp.data;
  console.log(user);

  if (user?.identities?.length === 0) {
    console.log('NO IDENTITIES, HOPE THIS IS FIRST LOGIN');
    return 'NONE';
  }

  console.log('GOT USER WITH IDENTITIES', JSON.stringify(user, null, 2));
  const spotifyAccessToken = user.identities[0].access_token as string;
  const spotifyRefreshToken = user.identities[0].refresh_token as string;

  await prisma.user.update({
    where: {
      id: session.user.sub,
    },
    data: {
      spotifyAccessToken,
      spotifyRefreshToken,
    },
  });

  return spotifyAccessToken;
}

async function getSpotifyAccessTokenFromDB(
  session: Session,
): Promise<string | 'NONE'> {
  const userResp = await prisma.user.findUnique({
    where: {
      id: session.user.sub,
    },
  });

  if (!userResp?.spotifyAccessToken) {
    return 'NONE';
  }

  return userResp.spotifyAccessToken;
}

export async function refreshSpotifyToken(): Promise<
  string | 'REAUTHENTICATE'
> {
  const session = await getSession();
  console.log(session);
  if (!session) {
    return 'REAUTHENTICATE';
  }

  const userResp = await prisma.user.findUnique({
    where: {
      id: session.user.sub,
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
      id: session.user.sub,
    },
    data: {
      spotifyRefreshToken: newRefreshToken,
      spotifyAccessToken: newAccessToken,
    },
  });

  return newAccessToken;
}

export async function getSpotifyAccessToken(session?: Session) {
  let _session: Session | null | undefined = session;
  if (!session) {
    _session = await getSession();
  }

  if (!_session) {
    throw new Error('NO SESSION');
  }

  let accessToken = await getSpotifyAccessTokenFromDB(_session);
  if (accessToken === 'NONE') {
    accessToken = await getSpotifyAccessTokenFromSession(_session);
  }
  return accessToken;
}
