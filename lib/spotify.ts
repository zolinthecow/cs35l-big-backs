import { getSession, Session } from '@auth0/nextjs-auth0';
import { AccessToken } from '@spotify/web-api-ts-sdk';
import { Auth0ManagementService } from './auth0';
import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';

export async function getSpotifyAccessTokenWithSession(session: Session) {
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
  return spotifyAccessToken;
}

export async function getSpotifyAccessToken() {
  const session = await getSession();
  if (!session) {
    throw new Error('NO SESSION');
  }

  return getSpotifyAccessTokenWithSession(session);
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
  //
  // Response interceptor
  spotifyInstance.interceptors.response.use(
    (response: AxiosResponse) => {
      return response;
    },
    async (error: AxiosError) => {
      console.log('HANDLING ERROR');
      const originalRequest = error.config as any;
      if (
        error.response?.status === 401 &&
        // @ts-expect-error It should be fine?
        error.response?.data?.error?.message === 'The access token expired' &&
        !originalRequest._retry
      ) {
        originalRequest._retry = true;
        originalRequest._retryCount = originalRequest._retryCount || 0;

        if (originalRequest._retryCount < 3) {
          originalRequest._retryCount += 1;

          // Get a new access token
          const newAccessTokenResp = await fetch(`/api/auth/get-spotify-token`);
          const newAccessTokenData = await newAccessTokenResp.json();
          const newAccessToken = newAccessTokenData.apiToken as string;
          spotifyInstance.defaults.headers.Authorization = `Bearer ${newAccessToken}`;
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

          // Retry the original request with the new access token
          return spotifyInstance(originalRequest);
        }
      }
      return Promise.reject(error);
    },
  );
  return spotifyInstance;
};

export default getSpotifyClient;
