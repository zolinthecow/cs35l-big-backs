// app/page.tsx
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
const Page: FC = async () => {
  return (
    <div className="h-screen w-screen flex flex-col">
      <NavBar />
      <div className="flex flex-1 overflow-hidden">
        <Suspense fallback={<LeftSidebarSkeleton />}>
          <div className="w-1/4">
            <LeftSideBarComponent />
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
};

//Each of these functions renders the elements client side so that way people can interact with them
const AirbudsComponents = async (): Promise<JSX.Element> => {
  const airbudsData = await fetchData('airbuds');

  const props: SnappingScrollContainerProps = {
    airbudsData,
  };

  return <SnappingScrollContainer {...props} />;
};

const LeftSideBarComponent = async (): Promise<JSX.Element> => {
  const songData = await getPinnedSong('23');
  const artistData = await getPinnedArtist('23');
  const playlistData = await getPinnedPlaylists('23');

  const props: LeftSidebarProps = {
    songData,
    artistData,
    playlistData,
  };

  return <LeftSidebar {...props} />;
};

const RightSideBarComponent = async (): Promise<JSX.Element> => {
  const songData = await getTopTracks();
  const artistData = await getTopArtists();
  const recentlyPlayed = await getRecentlyPlayed();

  const props: RightSidebarProps = {
    songData,
    artistData,
    recentlyPlayed,
  };
  return <RightSidebar {...props} />;
};

async function fetchData2(endpoint: string) {
  try {
    const spotifyClient = await getSpotifyClient();
    const resp = await spotifyClient.get(endpoint);
    return resp.data.items;
  } catch (error) {
    console.error('An error occurred while fetching data:', error);
    // You can decide what to return in case of error
    throw new Error(`Failed to fetch data from ${endpoint}`);
  }
}

interface pinnedPlaylist {
  name: string;
  playlistImage: string;
  playlistURL: string;
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

async function getPinnedPlaylists(UserID: string): Promise<pinnedPlaylist[]> {
  const pinnedPlaylists = await prisma.playlistPinned.findMany({
    where: {
      userId: UserID,
    },
  });

  // Transform the data into the correct structure
  const transformedPinnedPlaylists: pinnedPlaylist[] = pinnedPlaylists.map(
    (playlist) => ({
      name: playlist.playlistName,
      playlistImage: playlist.PlaylistImageLink,
      playlistURL: playlist.PlaylistLink,
      numberOfSongs: playlist.NumbeOfTracks,
    }),
  );

  return transformedPinnedPlaylists;
}

async function getPinnedArtist(UserID: string): Promise<pinnedArtist[]> {
  const pinnedArtist = await prisma.ArtistPinned.findMany({
    where: {
      userId: UserID,
    },
  });

  // Transform the data into the correct structure
  const transformedPinnedArtists: pinnedArtist[] = pinnedArtist.map(
    (artist) => ({
      name: artist.artistName,
      artistName: artist.artistName,
      artistImage: artist.ArtistImageLink,
      artistURL: artist.ArtistLink,
    }),
  );
  console.log('PINNED ARTISTS', transformedPinnedArtists);
  return transformedPinnedArtists;
}

async function getPinnedSong(UserID: string): Promise<pinnedSong[]> {
  const pinnedArtist = await prisma.SongPinned.findMany({
    where: {
      userId: UserID,
    },
  });

  // Transform the data into the correct structure
  const transformedPinnedSongs: pinnedSong[] = pinnedArtist.map((song) => ({
    name: song.songName,
    artistName: song.artistName,
    songImage: song.songImageLink,
    songURL: song.songLink,
  }));
  console.log('PINNED SONGS', transformedPinnedSongs);
  return transformedPinnedSongs;
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
  // Endpoint reference : https://developer.spotify.com/documentation/web-api/reference/get-users-top-artists-and-tracks
  const response = await fetchData2(
    '/me/top/tracks?time_range=short_term&limit=5',
  );
  return response;
}

async function getTopArtists(): Promise<TopArtist[]> {
  const response = await fetchData2(
    '/me/top/artists?time_range=short_term&limit=5',
  );
  return response;
}

async function getRecentlyPlayed(): Promise<RecentlyPlayed[]> {
  const oneMinuteAgo = new Date(Date.now() - 60 * 1000);
  const unixTimestamp = Math.floor(oneMinuteAgo.getTime() / 1000);
  console.log(unixTimestamp);
  const response = await fetchData2(
    `/me/player/recently-played?after=${unixTimestamp}&limit=50`,
  );
  return response.slice(0, 5);
}

export default Page;
