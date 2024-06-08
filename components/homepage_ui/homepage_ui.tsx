import React, { FC } from 'react';
import SnappingScrollContainer, {
  AirbudsElement,
} from '@/components/homepage_ui/airbudsinterface';
import getSpotifyClient from '@/lib/spotify';

//Each of these functions renders the elements client side so that way people can interact with them
export const AirbudsComponents: FC<{ airbudsData: AirbudsElement[] }> = (
  props,
) => {
  return <SnappingScrollContainer airbudsData={props.airbudsData} />;
};

//database and api rendering functions
//api fetch function
async function fetchData2(endpoint: string) {
  try {
    const spotifyClient = await getSpotifyClient();
    const resp = await spotifyClient.get(endpoint);
    return resp.data.items;
  } catch (error) {
    console.error('An error occurred while fetching data:', error);
    throw new Error(`Failed to fetch data from ${endpoint}`);
  }
}

//left sidebar functions from database
interface pinnedPlaylist {
  name: string;
  playlistImage: string;
  playlistURL: string;
  playlistID: string;
  numberOfSongs: number;
}

interface pinnedArtist {
  name: string;
  artistImage: string;
  artistURL: string;
}

interface pinnedSong {
  name: string;
  artistName: string;
  songImage: string;
  songURL: string;
}

//spotify api  functions for right sidebar
interface Artist {
  name: string;
}

interface Track {
  name: string;
  artists: Artist[];
  album: {
    images: { url: string }[];
  };
  external_urls: {
    spotify: string;
  };
}

interface TopArtist {
  name: string;
  images: { url: string }[];
  external_urls: {
    spotify: string;
  };
}

interface RecentlyPlayed {
  track: {
    name: string;
    artists: Artist[];
    album: {
      images: { url: string }[];
    };
    external_urls: {
      spotify: string;
    };
  };
}

export async function getTopTracks(): Promise<Track[]> {
  return await fetchData2('/me/top/tracks?time_range=short_term&limit=5');
}

export async function getTopArtists(): Promise<TopArtist[]> {
  return await fetchData2('/me/top/artists?time_range=short_term&limit=5');
}

export async function getRecentlyPlayed(): Promise<RecentlyPlayed[]> {
  const oneMinuteAgo = new Date(Date.now() - 60 * 1000);
  const unixTimestamp = Math.floor(oneMinuteAgo.getTime() / 1000);
  const response = await fetchData2(
    `/me/player/recently-played?after=${unixTimestamp}&limit=50`,
  );
  return response.slice(0, 5);
}
