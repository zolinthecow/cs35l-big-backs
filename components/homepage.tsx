'use client';
import React, { Suspense } from 'react';
import { NavBar } from '@/components/ui/navbar';
import SkeletonLoader from '@/components/skeleton_loader'; // Adjust the path as needed

const LeftSidebar = React.lazy(
  () => import('../components/homepage_ui/leftsidebar'),
);
const RightSidebar = React.lazy(
  () => import('../components/homepage_ui/rightsidebar'),
);
const SnappingScrollContainer = React.lazy(
  () => import('../components/homepage_ui/airbudsinterface'),
);

interface AirbudsDataProps {
  key: string;
  profileImage: string;
  profileName: string;
  profileTime: string;
  albumImage: string;
  songTitle: string;
  songArtist: string;
  songLink: string;
}

interface SongDataProps {
  id: string;
  title: string;
  artist: string;
  album_url: string;
  song_url: string;
}

interface PlaylistDataProps {
  id: string;
  title: string;
  album_url: string;
  playlist_url: string;
  numberOfSongs: number;
}

interface ArtistDataProps {
  id: string;
  artist: string;
  artist_url: string;
}

export interface HomePageProps {
  songData: SongDataProps[];
  playlistData: PlaylistDataProps[];
  artistData: ArtistDataProps[];
  airbudsData: AirbudsDataProps[];
}

const HomePage: React.FC<HomePageProps> = ({
  songData,
  playlistData,
  artistData,
  airbudsData,
}) => {
  return (
    <div className="h-screen w-screen flex flex-col">
      <NavBar />
      <div className="flex flex-1 overflow-hidden">
        <Suspense fallback={<SkeletonLoader />}>
          <LeftSidebar
            song_items={songData}
            playlist_items={playlistData}
            artist_items={artistData}
          />
        </Suspense>
        <div className="h-full flex-1 overflow-y-auto border-t border-gray-100 border-b rounded bg-gray-100">
          <Suspense fallback={<SkeletonLoader />}>
            <SnappingScrollContainer items={airbudsData} />
          </Suspense>
        </div>
        <Suspense fallback={<SkeletonLoader />}>
          <RightSidebar song_items={songData} artist_items={artistData} />
        </Suspense>
      </div>
    </div>
  );
};

export default HomePage;
