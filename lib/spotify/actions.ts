'use server';

import { getSession, Session } from '@auth0/nextjs-auth0';
import prisma from '@/prisma';
import { Auth0ManagementService } from '../auth0';

export async function getSpotifyAccessTokenFromSession(
  session: Session,
): Promise<string> {
  const apiToken = await Auth0ManagementService.getAccessToken();
  const auth0Url = new URL(
    session.user.sub,
    `${process.env['AUTH0_ISSUER_BASE_URL']}/api/v2/users/`,
  ).href;
  const auth0Options = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${apiToken}`,
    },
  };
  const userResp = await fetch(auth0Url, auth0Options);
  const user = await userResp.json();
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
      // @ts-expect-error its fine
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

export async function getSpotifyAccessToken() {
  const session = await getSession();

  if (!session) {
    throw new Error('NO SESSION');
  }

  let accessToken = await getSpotifyAccessTokenFromDB(session);
  if (accessToken === 'NONE') {
    accessToken = await getSpotifyAccessTokenFromSession(session);
  }
  return accessToken;
}
