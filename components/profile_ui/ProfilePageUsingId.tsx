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
import prisma from '@/prisma';
import getSpotifyClient from '@/lib/spotify';

//This is the basic function to get the mock data for now
async function fetchData(endpoint: string) {
  try {
    const data = await import(`../mock_data/${endpoint}_data.json`);
    return data.default;
  } catch (error) {
    throw new Error(`Failed to fetch ${endpoint}`);
  }
}

export default async function ProfilePageUsingId({
  userId,
}: {
  userId: string;
}): Promise<JSX.Element> {
  console.log('UID', userId);
  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900">
      <NavBar className="sticky top-0 z-20" />
      <div className="flex flex-col md:flex-row gap-6 px-4 pt-16 py-4 md:px-6 md:py-4">
        <Suspense fallback={<SkeletonLoader />}>
          <ProfileSideBarComponent userId={userId} />
        </Suspense>
        <Suspense fallback={<SkeletonLoader />}>
          <PinnedSideBarComponent />
        </Suspense>
      </div>
    </div>
  );
}

const ProfileSideBarComponent = async ({
  userId,
}: {
  userId: string;
}): Promise<JSX.Element> => {
  const userData = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      friends: true,
    },
  });
  const spotifyClient = await getSpotifyClient();
  const spotifyUserResp = await spotifyClient.get(`/me`);
  const spotifyUserData = spotifyUserResp.data;

  if (!userData || !spotifyUserData) {
    console.error('NO USER DATA');
    return <div></div>;
  }

  const props: ProfileProps = {
    name: userData.name ?? '',
    username: userData.nickname,
    profilePicture: spotifyUserData.images?.[0]?.url ?? '',
    bio: userData.bio ?? '',
    ratingValue: parseFloat(userData.ratingValue ?? '0'),
    friendsCount: userData.friends.length,
  };

  return <ProfileSideBar {...props} />;
};

const PinnedSideBarComponent = async (): Promise<JSX.Element> => {
  const songData = await fetchData('song');
  const artistData = await fetchData('artist');
  const playlistData = await fetchData('playlist');
  const friendData = await fetchData('airbuds');

  const props: SectionProps = {
    songData,
    artistData,
    playlistData,
    friendData,
  };

  return <PinnedSideBar {...props} />;
};
