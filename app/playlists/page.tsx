'use server';

import getSpotifyClient from '@/lib/spotify';
import { ListofPlaylistsLayout } from '@/components/ui/playlists/playlists-list-layout';
import Component from '@/components/playlists_ui/playlist_ui';
import React, { FC } from 'react';

interface PlaylistItem {
  id: string;
  name: string;
  images: {
    url: string;
  };
}

interface PlaylistResponse {
  items: PlaylistItem[];
}

async function fetchData2(endpoint: string) {
  const spotifyClient = await getSpotifyClient();
  console.log('HI PLEASE WORK', spotifyClient);
  const resp = await spotifyClient.get(endpoint);
  console.log('HI PLEASE WORK', resp.data.items);
  return resp.data.items;
}

async function getPlaylists(): Promise<PlaylistItem[]> {
  // Endpoint reference: https://developer.spotify.com/documentation/web-api/reference/get-current-users-profile
  const response = await fetchData2('/me/playlists?limit=20&offset=0');
  return response;
}

interface PageProps {
  listOfPlaylists: PlaylistResponse;
}

const Page: FC = async () => {
  const listOfPlaylists = await getPlaylists();
  return (
    <div>
      <Component listOfPlaylists={listOfPlaylists} />
    </div>
  );
};

export default Page;
