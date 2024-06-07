'use server';
import { PrismaClient } from '@prisma/client';
import { use } from 'react';

const prisma = new PrismaClient();

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
