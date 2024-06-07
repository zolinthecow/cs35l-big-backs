'use server';

import getSpotifyClient from '@/lib/spotify';
import { ListofPlaylistsLayout } from '@/components/ui/playlists/playlists-list-layout';
import Component from '@/components/playlists_ui/playlist_ui2';
import React, { FC, Suspense } from 'react';
import { getSession } from '@auth0/nextjs-auth0';
import { PrismaClient } from '@prisma/client';
import { SkeletonLoader } from '@/components/skeleton_loader';
import { getCommentsFromDb } from '@/components/data_functions/commentsFunctions';
import { DateTime } from 'luxon';

const prisma = new PrismaClient();

type Props = {
  params: {
    playlistID: string;
  };
};

interface PlaylistItem {
  id: string;
  name: string;
  images: {
    url: string;
  }[];
}

interface SongItem {
  track: {
    id: string;
    name: string;
    artists: Artist[];
    duration_ms: string;
    album: {
      name: string;
      images: {
        url: string;
      }[];
    };
    external_urls: {
      spotify: string;
    };
  };
}

interface Artist {
  name: string;
}

interface TitleLayoutProps {
  name: string;
  images: {
    url: string;
  }[];
  description: string;
}

interface PlaylistResponse {
  items: PlaylistItem[];
}

interface SongResponse {
  items: SongItem[];
}

async function fetchData2(endpoint: string) {
  const spotifyClient = await getSpotifyClient();
  const resp = await spotifyClient.get(endpoint);
  return resp.data.items;
}

async function fetchData3(endpoint: string) {
  const spotifyClient = await getSpotifyClient();
  const resp = await spotifyClient.get(endpoint);
  return resp.data;
}

async function getPlaylists(): Promise<PlaylistItem[]> {
  // Endpoint reference: https://developer.spotify.com/documentation/web-api/reference/get-current-users-profile
  const response = await fetchData2('/me/playlists?limit=20&offset=0');
  return response;
}

async function getSongs(playlistID: string): Promise<SongItem[]> {
  // Endpoint reference: https://developer.spotify.com/documentation/web-api/reference/get-track
  const response = await fetchData2(`/playlists/${playlistID}/tracks`);
  return response;
}

async function getTitle(playlistID: string): Promise<TitleLayoutProps> {
  // Endpoint reference: https://developer.spotify.com/documentation/web-api/reference/get-playlist
  const response = await fetchData3(`/playlists/${playlistID}`);
  console.log('title', response);
  return response;
}
async function getPlaylistReactions(playlistID: string): Promise<number[]> {
  const numbersArray = [0, 0, 0, 0, 0]; // Initialize array with 4 zeros

  for (let i = 0; i < 5; i++) {
    const reactionCount = await prisma.playlistReactions.findMany({
      where: {
        playlistID: playlistID,
        reaction: i,
      },
    });
    numbersArray[i] = reactionCount[0]?.count || 0;
  }
  return numbersArray;
}

async function getUserIDReactions(
  userID: string,
  playlistID: string,
): Promise<boolean[]> {
  const booleanArray = [false, false, false, false, false]; // Initialize array with 5 falses

  try {
    const reactions = await prisma.userPlaylistReactions.findMany({
      where: {
        playlistID: playlistID,
        userID: userID,
      },
      select: {
        reaction: true,
      },
    });

    reactions.forEach(({ reaction }: { reaction: number }) => {
      if (reaction >= 0 && reaction < 5) {
        booleanArray[reaction] = true;
      }
    });
  } catch (error) {
    console.error('Error fetching reactions:', error);
  }
  return booleanArray;
}
async function getAverageRating(playlistID: string): Promise<number> {
  'use client';
  const reactions = await prisma.playlistRating.findMany({
    where: {
      playlistID: playlistID,
    },
  });

  if (reactions.length === 0) {
    return -1; // Return 0 or some other value indicating no ratings
  }

  const totalStars = reactions.reduce(
    (acc: number, curr: { stars: number }) => acc + curr.stars,
    0,
  );
  const totalUsers = reactions.length;
  console.log('AVERAGE RATING', totalStars / totalUsers);

  return totalStars / totalUsers;
}
async function getUserIDRating(
  userID: string,
  playlistID: string,
): Promise<number> {
  'use client';
  const rating = await prisma.playlistRating.findMany({
    where: {
      playlistID: playlistID,
      userID: userID,
    },
  });

  if (rating.length > 0) {
    return rating[0].stars; // Return true if a rating from that user exists
  }

  return -1; // Return false if no rating exists
}

export default async function Page({ params }: Props) {
  const listOfPlaylists = await getPlaylists();
  const playlistID = params.playlistID;
  const title = await getTitle(playlistID);
  const commentsFromDb = await getCommentsFromDb(playlistID);
  const listOfSongs = await getSongs(playlistID);
  const initialCount = await getPlaylistReactions(playlistID);
  const averageRating = await getAverageRating(playlistID);
  const session = await getSession();
  const userID = session?.user?.sub;
  const initialUserReaction = await getUserIDReactions(userID, playlistID);
  const userRating = await getUserIDRating(userID, playlistID);

  return (
    <div className="h-100vh overflow-y-hidden fixed w-full">
      <div className="h-screen overflow-hidden">
        <Suspense>
          <Component
            listOfPlaylists={listOfPlaylists}
            listOfSongs={listOfSongs}
            title={title}
            initialCount={initialCount}
            booleanArray={initialUserReaction}
            averageRating={averageRating}
            userIDStar={userRating}
            commentsFromDb={commentsFromDb}
            userID={userID}
            playlistID={playlistID}
          />
        </Suspense>
      </div>
    </div>
  );
}
