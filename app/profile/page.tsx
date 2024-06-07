'use server';
import React, { FC, Suspense } from 'react';
const ProfileSideBar = React.lazy(
  () => import('@/components/profile_ui/profile-side-bar'),
);
import { ProfileProps } from '@/components/profile_ui/profile-side-bar';
const PinnedSideBar = React.lazy(
  () => import('@/components/profile_ui/pinned-side-bar'),
);
import { SectionProps } from '@/components/profile_ui/pinned-side-bar';
import { NavBar } from '@/components/navbar';
import { SkeletonLoader } from '@/components/skeleton_loader';
import { PrismaClient } from '@prisma/client';
import {
  handleUnpinClickArtist,
  handleUnpinClickPlaylist,
  handleUnpinClickTrack,
} from '@/components/data_functions/unpinningFunctions';

const prisma = new PrismaClient();

const Page: FC = async () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900">
      <NavBar className="sticky top-0 z-20" />
      <div className="flex flex-col md:flex-row gap-6 px-4 pt-16 py-4 md:px-6 md:py-4">
        <Suspense fallback={<SkeletonLoader />}>
          <ProfileSideBarComponent />
        </Suspense>
        <Suspense fallback={<SkeletonLoader />}>
          <PinnedSideBarComponent />
        </Suspense>
      </div>
    </div>
  );
};

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

const ProfileSideBarComponent = async (): Promise<JSX.Element> => {
  const userData = await fetchData('user');
  const props: ProfileProps = {
    name: userData.name,
    username: userData.username,
    profilePicture: userData.profilePicture,
    bio: userData.bio,
    ratingValue: userData.ratingValue,
    friendsCount: userData.friendsCount,
  };

  return <ProfileSideBar {...props} />;
};

const PinnedSideBarComponent = async (): Promise<JSX.Element> => {
  const userId = '23'; // Replace with actual user ID

  const songData = await getPinnedSongs(userId);
  const artistData = await getPinnedArtists(userId);
  const playlistData = await getPinnedPlaylists(userId);
  const friendData = await fetchData('airbuds'); // TODO: friends data remains mock

  const props: SectionProps = {
    songData,
    artistData,
    playlistData,
    friendData,
    userId,
    handleUnpinClickTrack,
    handleUnpinClickArtist,
    handleUnpinClickPlaylist,
  };

  return <PinnedSideBar {...props} />;
};

interface pinnedPlaylist {
  name: string;
  playlistImage: string;
  playlistURL: string;
  numberOfSongs: number;
  id: string;
}

interface pinnedArtist {
  name: string;
  artistImage: string;
  artistURL: string;
  id: string;
}

interface pinnedSong {
  name: string;
  artistName: string;
  songImage: string;
  songURL: string;
  id: string;
}

async function getPinnedArtists(UserID: string): Promise<pinnedArtist[]> {
  const pinnedArtists = await prisma.artistPinned.findMany({
    where: {
      userId: UserID,
    },
  });

  // Transform the data into the correct structure
  const transformedPinnedArtists: pinnedArtist[] = pinnedArtists.map(
    (artist): pinnedArtist => ({
      name: artist.artistName,
      artistImage: artist.artistImageLink,
      artistURL: artist.artistLink,
      id: artist.artistID,
    }),
  );
  console.log('PINNED ARTISTS', transformedPinnedArtists);
  return transformedPinnedArtists;
}

async function getPinnedSongs(UserID: string): Promise<pinnedSong[]> {
  const pinnedSongs = await prisma.songPinned.findMany({
    where: {
      userId: UserID,
    },
  });

  // Transform the data into the correct structure
  const transformedPinnedSongs: pinnedSong[] = pinnedSongs.map(
    (song): pinnedSong => ({
      name: song.songName,
      artistName: song.artistName,
      songImage: song.songImageLink,
      songURL: song.songLink,
      id: song.songID,
    }),
  );
  console.log('PINNED SONGS', transformedPinnedSongs);
  return transformedPinnedSongs;
}

async function getPinnedPlaylists(UserID: string): Promise<pinnedPlaylist[]> {
  const pinnedPlaylists = await prisma.playlistPinned.findMany({
    where: {
      userId: UserID,
    },
  });

  // Transform the data into the correct structure
  const transformedPinnedPlaylists: pinnedPlaylist[] = pinnedPlaylists.map(
    (playlist): pinnedPlaylist => ({
      name: playlist.playlistName,
      playlistImage: playlist.playlistImageLink,
      playlistURL: playlist.playlistLink,
      numberOfSongs: playlist.numberOfTracks,
      id: playlist.playlistID,
    }),
  );

  return transformedPinnedPlaylists;
}

export default Page;
