'use client';
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
import { getSession } from '@auth0/nextjs-auth0';
import { DateTime } from 'luxon';
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
const AirbudsComponents = async (): Promise<JSX.Element> => {
  const session = await getSession();
  if (!session?.user?.sub) {
    console.error('NO SESSION');
    return <div></div>;
  }

  const prismaUser = await prisma.user.findUnique({
    where: {
      id: session.user.sub,
    },
    include: {
      friends: true,
    },
  });
  if (!prismaUser) {
    console.error('NO PRISMA USER');
    return <div></div>;
  }
  const friends = [...prismaUser.friends, prismaUser];
  const airbudsData: {
    profileUserId: string;
    profileImage: string;
    profileName: string;
    profileTime: string;
    albumImage: string;
    songTitle: string;
    songArtist: string;
    songLink: string;
  }[] = [];

  function idHash(str: string) {
    let hash = 0;

    // Sum ASCII values of each character in the string
    for (let i = 0; i < str.length; i++) {
      hash += str.charCodeAt(i);
    }

    // Use modulus to get a result from 0 to 49, then add 1 to change the range to 1 to 50
    return (hash % 50) + 1;
  }

  for (const friend of friends) {
    try {
      const friendSpotifyClient = await getSpotifyClient({
        userId: friend.id,
        user: session.user,
      });
      const friendSpotifyUserResp = await friendSpotifyClient.get(`/me`);
      const friendCurrentTrackResp = await friendSpotifyClient.get(
        `/me/player/currently-playing`,
      );
      const friendRecentlyPlayedResp = await friendSpotifyClient.get(
        `/me/player/recently-played`,
      );
      if (
        !friendSpotifyUserResp.data ||
        !friendCurrentTrackResp.data ||
        !friendRecentlyPlayedResp.data
      ) {
        console.error(`NO SPOTIFY USER DATA FOR ${friend.id}`);
        continue;
      }
      const spotifyFriend = friendSpotifyUserResp.data;
      const friendCurrentTrack = friendCurrentTrackResp.data;
      const friendRecentlyPlayedTracks = friendRecentlyPlayedResp.data;
      const itemToUse =
        friendCurrentTrack.item ?? friendRecentlyPlayedTracks.items[0];
      airbudsData.push({
        profileUserId: friend.id,
        profileImage:
          spotifyFriend.images?.[0]?.url ??
          `https://avatar.iran.liara.run/public/${idHash(friend.id)}`,
        profileName: friend.name ?? '',
        profileTime: 'Now',
        albumImage: itemToUse.album.images?.[0].url,
        songTitle: itemToUse.name,
        songArtist: itemToUse.artists?.[0].name,
        songLink: `https://open.spotify.com/track/${itemToUse.id}`,
      });
    } catch (e) {
      console.error(e);
    }
  }

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
