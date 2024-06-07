'use client';
import React, { FC, Suspense } from 'react';
import RightSidebar, {
  RightSidebarProps,
} from '@/components/homepage_ui/rightsidebar';
import LeftSidebar, {
  LeftSidebarProps,
} from '@/components/homepage_ui/leftsidebar';
import SnappingScrollContainer, {
  SnappingScrollContainerProps,
} from '@/components/homepage_ui/airbudsinterface';
import {
  LeftSidebarSkeleton,
  RightSidebarSkeleton,
  AirbudsInterfaceSkeleton,
} from '@/components/skeleton_loader';
import { NavBar } from '@/components/navbar';
import getSpotifyClient from '@/lib/spotify';
import { PrismaClient } from '@prisma/client';
import { getSession } from '@auth0/nextjs-auth0';
import { useState, useEffect } from 'react';
import {
  getPinnedArtist,
  getPinnedPlaylists,
  getPinnedSong,
} from '@/components/data_functions/pinningFunctions';

const prisma = new PrismaClient();

//This is the basic function to get the mock data for now
async function fetchData(endpoint: string) {
  try {
    const data = await import(
      `../../components/mock_data/${endpoint}_data.json`
    );
    return data.default;
  } catch (error) {
    throw new Error(`Failed to fetch ${endpoint}`);
  }
}

//server side rendering with a skeleton
export default async function HomePage({
  userId,
}: {
  userId: string;
}): Promise<JSX.Element> {
  return (
    <div className="h-screen w-screen flex flex-col">
      <NavBar />
      <div className="flex flex-1 overflow-hidden">
        <Suspense fallback={<LeftSidebarSkeleton />}>
          <div className="w-1/4">
            <LeftSideBarComponent userId={userId} />
          </div>
        </Suspense>
        <div className="h-full flex-1 overflow-y-auto border-t border-gray-100 border-b rounded bg-gray-100">
          <Suspense fallback={<AirbudsInterfaceSkeleton />}>
            <AirbudsComponents />
          </Suspense>
        </div>
        <Suspense fallback={<RightSidebarSkeleton />}>
          <div className="w-1/4">
            <RightSideBarComponent />
          </div>
        </Suspense>
      </div>
    </div>
  );
}

//Each of these functions renders the elements client side so that way people can interact with them
const AirbudsComponents: FC = () => {
  const [airbudsData, setAirbudsData] = useState(null);

  useEffect(() => {
    const fetchDataAsync = async () => {
      const data = await fetchData('airbuds');
      setAirbudsData(data);
    };

    fetchDataAsync();
  }, []);

  if (!airbudsData) return <AirbudsInterfaceSkeleton />;

  const props: SnappingScrollContainerProps = {
    airbudsData,
  };

  return <SnappingScrollContainer {...props} />;
};

const LeftSideBarComponent: FC<{ userId: string }> = ({ userId }) => {
  const [songData, setSongData] = useState<pinnedSong[]>([]);
  const [artistData, setArtistData] = useState<pinnedArtist[]>([]);
  const [playlistData, setPlaylistData] = useState<pinnedPlaylist[]>([]);

  useEffect(() => {
    if (!userId) return;

    const fetchPinnedData = async () => {
      const [songs, artists, playlists] = await Promise.all([
        getPinnedSong(userId),
        getPinnedArtist(userId),
        getPinnedPlaylists(userId),
      ]);

      setSongData(songs);
      setArtistData(artists);
      setPlaylistData(playlists);
    };

    fetchPinnedData();
  }, [userId]);

  if (!songData || !artistData || !playlistData) return <LeftSidebarSkeleton />;

  const props: LeftSidebarProps = {
    songData,
    artistData,
    playlistData,
  };

  return <LeftSidebar {...props} />;
};

const RightSideBarComponent: FC = () => {
  const [songData, setSongData] = useState<Track[]>([]);
  const [artistData, setArtistData] = useState<TopArtist[]>([]);
  const [recentlyPlayed, setRecentlyPlayed] = useState<RecentlyPlayed[]>([]);

  useEffect(() => {
    const fetchRightSidebarData = async () => {
      const [songs, artists, recentlyPlayed] = await Promise.all([
        getTopTracks(),
        getTopArtists(),
        getRecentlyPlayed(),
      ]);

      setSongData(songs);
      setArtistData(artists);
      setRecentlyPlayed(recentlyPlayed);
    };

    fetchRightSidebarData();
  }, []);

  if (!songData || !artistData || !recentlyPlayed)
    return <RightSidebarSkeleton />;

  const props: RightSidebarProps = {
    songData,
    artistData,
    recentlyPlayed,
  };

  return <RightSidebar {...props} />;
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

async function getTopTracks(): Promise<Track[]> {
  return await fetchData2('/me/top/tracks?time_range=short_term&limit=5');
}

async function getTopArtists(): Promise<TopArtist[]> {
  return await fetchData2('/me/top/artists?time_range=short_term&limit=5');
}

async function getRecentlyPlayed(): Promise<RecentlyPlayed[]> {
  const oneMinuteAgo = new Date(Date.now() - 60 * 1000);
  const unixTimestamp = Math.floor(oneMinuteAgo.getTime() / 1000);
  const response = await fetchData2(
    `/me/player/recently-played?after=${unixTimestamp}&limit=50`,
  );
  return response.slice(0, 5);
}
