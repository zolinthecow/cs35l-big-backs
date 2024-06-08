import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import { getSpotifyAccessToken, refreshSpotifyToken } from './actions';
import { Session, getSession } from '@auth0/nextjs-auth0';

type Props = {
  session?: Session;
  userId?: string;
};

const getSpotifyClient = async (props?: Props): Promise<AxiosInstance> => {
  let _userId = props?.userId;
  if (!_userId) {
    let _session: Session | null | undefined = props?.session;
    if (!_session) {
      _session = await getSession();
    }
    _userId = _session?.user?.sub;
  }

  if (!_userId) {
    throw new Error('NO SESSION OR USER ID');
  }

  const accessToken = await getSpotifyAccessToken(_userId);

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
          /* const newAccessTokenResp = await fetch(`/api/auth/get-spotify-token`);
          const newAccessTokenData = await newAccessTokenResp.json();
          const newAccessToken = newAccessTokenData.apiToken as string; */
          console.log('GETTING NEW ACCESS TOKEN');
          const newAccessToken = await refreshSpotifyToken(_userId);
          console.log('GOT NEW ACCESS TOKEN', newAccessToken);
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
