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
  const songData = await fetchData('song');
  const artistData = await fetchData('artist');
  const playlistData = await fetchData('playlist');

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
  const spotifyClient = await getSpotifyClient();
  console.log('HI PLEASE WORK', spotifyClient);
  const resp = await spotifyClient.get(endpoint);
  console.log('HI PLEASE WORK', resp.data.items);
  return resp.data.items;
}

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
  console.log(response);
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
  console.log('WHERE', response);
  return response.slice(0, 5);
}

export default Page;
