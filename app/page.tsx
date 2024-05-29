import {
  fetchAirbudsFromServer,
  fetchArtistsFromServer,
  fetchPlaylistsFromServer,
  fetchSongsFromServer,
} from './api/mock_api';
import React, { Suspense } from 'react';
import { NavBar } from '@/components/ui/navbar';

const LeftSidebar = React.lazy(() => import('../components/leftsidebar'));
const RightSidebar = React.lazy(() => import('../components/rightsidebar'));
const SnappingScrollContainer = React.lazy(
  () => import('../components/airbudsinterface'),
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

interface HomePageProps {
  songData: SongDataProps[];
  playlistData: PlaylistDataProps[];
  artistData: ArtistDataProps[];
  airbudsData: AirbudsDataProps[];
}

export default async function HomePage() {
  const songData = await fetchSongsFromServer();
  const playlistData = await fetchPlaylistsFromServer();
  const artistData = await fetchArtistsFromServer();
  const airbudsData = await fetchAirbudsFromServer();

  return (
    <div className="h-screen w-screen flex flex-col">
      <NavBar />
      <div className="flex flex-1 overflow-hidden">
        <Suspense fallback={<div>Loading...</div>}>
          <LeftSidebar
            song_items={songData}
            playlist_items={playlistData}
            artist_items={artistData}
          />
          <div className="h-full flex-1 overflow-y-auto border-t border-gray-100 border-b rounded bg-gray-100">
            <SnappingScrollContainer items={airbudsData} />
          </div>
          <RightSidebar song_items={songData} artist_items={artistData} />
        </Suspense>
      </div>
    </div>
  );
}
