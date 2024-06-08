'use server';
import getSpotifyClient from '@/lib/spotify';

export async function fetchData(endpoint: string) {
  'use server';
  const spotifyClient = await getSpotifyClient();
  const resp = await spotifyClient.get(endpoint);
  return resp.data.items;
}
