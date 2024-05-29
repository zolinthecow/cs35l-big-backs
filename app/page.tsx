// app/page.tsx
import {
  fetchAirbudsFromServer,
  fetchArtistsFromServer,
  fetchPlaylistsFromServer,
  fetchSongsFromServer,
} from './api/mock_api';
import React, { Suspense } from 'react';
import HomePage, { HomePageProps } from '@/components/homepage'; // Adjust the path as needed
import SkeletonLoader from '@/components/skeleton_loader'; // Adjust the path as needed

const Page: React.FC = () => {
  return (
    <Suspense fallback={<SkeletonLoader />}>
      <ServerComponent />
    </Suspense>
  );
};

const ServerComponent = async (): Promise<JSX.Element> => {
  const songData = await fetchSongsFromServer();
  const playlistData = await fetchPlaylistsFromServer();
  const artistData = await fetchArtistsFromServer();
  const airbudsData = await fetchAirbudsFromServer();

  const props: HomePageProps = {
    songData,
    playlistData,
    artistData,
    airbudsData,
  };

  return <HomePage {...props} />;
};

export default Page;
