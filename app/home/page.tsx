'use server';
import React, { FC, Suspense } from 'react';
import { getSession } from '@auth0/nextjs-auth0';
import { NavBar } from '@/components/navbar';
import {
  LeftSideBarComponent,
  AirbudsComponents,
  RightSideBarComponent,
} from '@/components/homepage_ui/homepage_ui';
import {
  LeftSidebarSkeleton,
  RightSidebarSkeleton,
  AirbudsInterfaceSkeleton,
} from '@/components/skeleton_loader';
import prisma from '@/prisma';
import getSpotifyClient from '@/lib/spotify';
import { AirbudsElement } from '@/components/homepage_ui/airbudsinterface';

const Page: FC = async () => {
  const session = await getSession();
  if (!session?.user?.sub) {
    console.error('NO SESSION');
    return null;
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
  const airbudsData: AirbudsElement[] = [];

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
      const friendSpotifyClient = await getSpotifyClient({ userId: friend.id });
      const friendSpotifyUserResp = await friendSpotifyClient.get(`/me`);
      const friendCurrentTrackResp = await friendSpotifyClient.get(
        `/me/player/currently-playing`,
      );
      const friendRecentlyPlayedResp = await friendSpotifyClient.get(
        `/me/player/recently-played`,
      );
      if (
        !friendSpotifyUserResp.data ||
        (!friendCurrentTrackResp.data && !friendRecentlyPlayedResp.data)
      ) {
        console.error(`NO SPOTIFY USER DATA FOR ${friend.id}`);
        continue;
      }
      const spotifyFriend = friendSpotifyUserResp.data;
      const friendCurrentTrack = friendCurrentTrackResp.data;
      const friendRecentlyPlayedTracks = friendRecentlyPlayedResp.data;
      const itemToUse =
        friendCurrentTrack.item ?? friendRecentlyPlayedTracks.items[0]?.track;
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

  return (
    <div className="h-screen w-screen flex flex-col">
      <NavBar />
      <div className="flex flex-1 overflow-hidden">
        <Suspense fallback={<LeftSidebarSkeleton />}>
          <div className="w-1/4">
            <LeftSideBarComponent userId={session.user.sub} />
          </div>
        </Suspense>
        <div className="h-full flex-1 overflow-y-auto border-t border-gray-100 border-b rounded bg-gray-100">
          <Suspense fallback={<AirbudsInterfaceSkeleton />}>
            <AirbudsComponents airbudsData={airbudsData} />
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

export default Page;
