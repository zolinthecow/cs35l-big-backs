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

export default Page;
