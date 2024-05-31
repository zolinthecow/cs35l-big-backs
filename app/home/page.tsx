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
let ACCESSTOKEN =
  'BQAXTPaaVg1bdan8TPqvOqICOqkDb2GkOvLdlnXTutK3L0jnhJwcz0_Wj0OAad-i7hLL9r50wc2_ztVrVor0E36bc8p03G8KAi0XsQWbiPOVFSVkXUVIzAk84HemJ0i-i5yWGXG3hGfndkUURGe8oZPYHBXqsWvxiXb7qk2Gczx6lTwxbTmu5z7o6p_AgCIP1rhq';
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

async function fetchWebApi(
  endpoint: string,
  method: string,
  body: any = null,
): Promise<any> {
  const token =
    'BQBQvz1F3KpXf8cLcHm4-AA4eKMXK7RSkljS8_kE6ByV0o3ZzzXxW3wmCXE8hC3rtPHowEyb3vnxWb7XSSE-WnJaUrGW3RUVdU_nfy5ju9G8SEA1uGCQl33dG3cNB6gjpjh5stEHejdeweZYucbCtXgov7QwCYRJLrhyYkxZjl58q0OLP4O9liksN1foh-A-UxlvduxPd5cSnU1QffXpxZKzHVR-QNpX0cZkRtf_Yex3tK0NuuDytzzi45nHEuu7wZK9q_k';
  const res = await fetch(`https://api.spotify.com/${endpoint}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method,
    body: body ? JSON.stringify(body) : null,
  });
  return await res.json();
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
  const response = await fetchWebApi(
    'v1/me/top/tracks?time_range=short_term&limit=5',
    'GET',
  );
  return response.items;
}

async function getTopArtists(): Promise<TopArtist[]> {
  const response = await fetchWebApi(
    'v1/me/top/artists?time_range=short_term&limit=5',
    'GET',
  );
  return response.items;
}

async function getRecentlyPlayed(): Promise<RecentlyPlayed[]> {
  const response = await fetchWebApi(
    'v1/me/player/recently-played?before=1717138548800&limit=5',
    'GET',
  );
  console.log(response);
  return response.items;
}

export default Page;
