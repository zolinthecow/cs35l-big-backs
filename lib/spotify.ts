import { getSession } from '@auth0/nextjs-auth0';
import { AccessToken } from '@spotify/web-api-ts-sdk';
import { Auth0ManagementService } from './auth0';
import axios, { AxiosInstance } from 'axios';

export async function getSpotifyAccessToken() {
  const session = await getSession();
  if (!session) {
    throw new Error('NO SESSION');
  }
  if (
    !process.env['SPOTIFY_CLIENT_ID'] ||
    !process.env['SPOTIFY_CLIENT_SECRET']
  ) {
    throw new Error('NO CLIENT ENV VARS');
  }

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
  const spotifyRefreshToken = user.identities[0].refresh_token as string;

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
      Authorization: 'Basic ' + new Buffer.from(secretAndId).toString('base64'),
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: spotifyRefreshToken,
    }),
  };
  const refreshBody = await fetch(refreshUrl, refreshPaylod);
  const accessToken = (await refreshBody.json()) as AccessToken;
  accessToken.refresh_token = spotifyRefreshToken;

  return accessToken;
}

const getSpotifyClient = async (
  accessToken: string,
): Promise<AxiosInstance> => {
  const spotifyInstance = axios.create({
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  // Optional: You can also set other default configurations here
  spotifyInstance.defaults.baseURL = 'https://api.spotify.com/v1/';

  return spotifyInstance;
};

export default getSpotifyClient;
