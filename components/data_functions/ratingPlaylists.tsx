'use server';
import prisma from '@/prisma';
import { use } from 'react';

export async function getAverageRating(playlistID: string): Promise<number> {
  'use server';
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

  return totalStars / totalUsers;
}

export const submitRating = async (
  playlistID: string,
  stars: number,
  userID: string,
): Promise<void> => {
  'use server';
  try {
    await prisma.playlistRating.upsert({
      where: {
        userID_playlistID: {
          playlistID: playlistID,
          userID: userID,
        },
      },
      update: {
        stars: stars,
      },
      create: {
        playlistID: playlistID,
        userID: userID,
        stars: stars,
      },
    });
  } catch (error) {
    console.error('An error occurred:', error);
  }
};

export async function getUserIDRating(
  userID: string,
  playlistID: string,
): Promise<number> {
  'use server';
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
