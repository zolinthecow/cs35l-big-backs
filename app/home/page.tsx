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
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

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
      <NavBar
        handlePinClickArtist={handlePinClickArtist}
        handlePinClickPlaylist={handlePinClickPlaylist}
        handlePinClickTrack={handlePinClickTrack}
      />
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

//database and api rendering functions

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

//left sidebar functions from database
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
      playlistImage: playlist.playlistImageLink,
      playlistURL: playlist.playlistLink,
      numberOfSongs: playlist.numberOfTracks,
    }),
  );

  return transformedPinnedPlaylists;
}

async function getPinnedArtist(UserID: string): Promise<pinnedArtist[]> {
  const pinnedArtist = await prisma.artistPinned.findMany({
    where: {
      userId: UserID,
    },
  });

  // Transform the data into the correct structure
  const transformedPinnedArtists: pinnedArtist[] = pinnedArtist.map(
    (artist) => ({
      name: artist.artistName,
      artistName: artist.artistName,
      artistImage: artist.artistImageLink,
      artistURL: artist.artistLink,
    }),
  );
  console.log('PINNED ARTISTS', transformedPinnedArtists);
  return transformedPinnedArtists;
}

async function getPinnedSong(UserID: string): Promise<pinnedSong[]> {
  const pinnedArtist = await prisma.songPinned.findMany({
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

//functions to pin items
interface ArtistItem {
  id: string;
  name: string;
  images: { url: string }[];
  external_urls: { spotify: string };
}

interface TrackItem {
  id: string;
  name: string;
  external_urls: { spotify: string };
  artists: { name: string }[];
  album: { images: { url: string }[] };
}

interface PlaylistItem {
  id: string;
  images: { url: string }[];
  external_urls: { spotify: string };
  name: string;
  tracks: { total: number };
}
type PinStatus = 'success' | 'duplicate' | 'limitReached' | 'error';

const handlePinClickArtist = async (
  item: ArtistItem,
): Promise<{ status: PinStatus }> => {
  'use server';
  console.log('Pinned artist:', item);

  // Check if the user has already pinned 5 or more artists
  const count = await prisma.artistPinned.count({
    where: {
      userId: '23',
    },
  });

  if (count >= 5) {
    return { status: 'limitReached' };
  }

  try {
    const newRecord = await prisma.artistPinned.create({
      data: {
        userId: '23',
        artistID: item.id,
        artistName: item.name,
        artistImageLink: item.images[0].url,
        artistLink: item.external_urls.spotify,
      },
    });
    return { status: 'success' };
  } catch (error) {
    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === 'P2002'
    ) {
      return { status: 'duplicate' };
    } else {
      console.error('An error occurred:', error);
      return { status: 'error' };
    }
  }
};

const handlePinClickTrack = async (
  item: TrackItem,
): Promise<{ status: PinStatus }> => {
  'use server';
  console.log('Pinned track:', item);

  // Check if the user has already pinned 5 or more tracks
  const count = await prisma.songPinned.count({
    where: {
      userId: '23',
    },
  });

  if (count >= 5) {
    return { status: 'limitReached' };
  }

  try {
    const newRecord = await prisma.songPinned.create({
      data: {
        userId: '23',
        songID: item.id,
        songName: item.name,
        artistName: item.artists[0].name,
        songImageLink: item.album.images[0].url,
        songLink: item.external_urls.spotify,
      },
    });
    return { status: 'success' };
  } catch (error) {
    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === 'P2002'
    ) {
      return { status: 'duplicate' };
    } else {
      console.error('An error occurred:', error);
      return { status: 'error' };
    }
  }
};

const handlePinClickPlaylist = async (
  item: PlaylistItem,
): Promise<{ status: PinStatus }> => {
  'use server';
  console.log('Pinned playlist:', item);

  // Check if the user has already pinned 5 or more playlists
  const count = await prisma.playlistPinned.count({
    where: {
      userId: '23',
    },
  });

  if (count >= 3) {
    return { status: 'limitReached' };
  }

  try {
    const newRecord = await prisma.playlistPinned.create({
      data: {
        userId: '23',
        playlistID: item.id,
        playlistName: item.name,
        playlistImageLink: item.images[0].url,
        playlistLink: item.external_urls.spotify,
        numberOfTracks: item.tracks.total,
      },
    });
    return { status: 'success' };
  } catch (error) {
    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === 'P2002'
    ) {
      return { status: 'duplicate' };
    } else {
      console.error('An error occurred:', error);
      return { status: 'error' };
    }
  }
};
export default Page;
