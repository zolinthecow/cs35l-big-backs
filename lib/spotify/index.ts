import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import { getSpotifyAccessToken, refreshSpotifyToken } from './actions';

const getSpotifyClient = async (): Promise<AxiosInstance> => {
  const accessToken = await getSpotifyAccessToken();

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
          const newAccessToken = await refreshSpotifyToken();
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
