// app/page.tsx
import {
  fetchAirbudsFromServer,
  fetchArtistsFromServer,
  fetchPlaylistsFromServer,
  fetchSongsFromServer,
} from './api/mock_api';
import React, { Suspense } from 'react';
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
  SkeletonLoader,
  LeftSidebarSkeleton,
  RightSidebarSkeleton,
  AirbudsInterfaceSkeleton,
} from '@/components/skeleton_loader'; // Adjust the path as needed
import { NavBar } from '@/components/navbar';
import { getSession, withPageAuthRequired } from '@auth0/nextjs-auth0';

const Page: React.FC = () => {
  return (
    <div className="h-screen w-screen flex flex-col">
      <NavBar />
      <div className="flex flex-1 overflow-hidden">
        <Suspense fallback={<LeftSidebarSkeleton />}>
          <LeftSideBarComponent />
        </Suspense>
        <div className="h-full flex-1 overflow-y-auto border-t border-gray-100 border-b rounded bg-gray-100">
          <Suspense fallback={<AirbudsInterfaceSkeleton />}>
            <AirbudsComponents />
          </Suspense>
        </div>
        <Suspense fallback={<RightSidebarSkeleton />}>
          <RightSideBarComponent />
        </Suspense>
      </div>
    </div>
  );
};

const AirbudsComponents = async (): Promise<JSX.Element> => {
  const airbudsData = await fetchAirbudsFromServer();

  const props: SnappingScrollContainerProps = {
    airbudsData,
  };

  return <SnappingScrollContainer {...props} />;
};

const LeftSideBarComponent = async (): Promise<JSX.Element> => {
  const songData = await fetchSongsFromServer();
  const artistData = await fetchArtistsFromServer();
  const playlistData = await fetchPlaylistsFromServer();

  const props: LeftSidebarProps = {
    songData,
    artistData,
    playlistData,
  };

  return <LeftSidebar {...props} />;
};

const RightSideBarComponent = async (): Promise<JSX.Element> => {
  const songData = await fetchSongsFromServer();
  const artistData = await fetchArtistsFromServer();

  const props: RightSidebarProps = {
    songData,
    artistData,
  };

  return <RightSidebar {...props} />;
};

export default Page;
