'use server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

type reactionStatus = 'success' | 'error';

export const submitReaction = async (
  playlistID: string,
  reaction: number,
  count: number,
): Promise<{ status: reactionStatus }> => {
  'use server';
  try {
    const noteInDB = await prisma.playlistReactions.upsert({
      where: {
        playlistID_reaction: {
          playlistID: playlistID,
          reaction: reaction,
        },
      },
      update: {
        count: count,
      },
      create: {
        playlistID: playlistID,
        reaction: reaction,
        count: count,
      },
    });
    return { status: 'success' };
  } catch (error) {
    console.error('An error occurred:', error);
    return { status: 'error' };
  }
};

export async function submitUserPlaylistReaction(
  playlistID: string,
  userID: string,
  reaction: number,
) {
  try {
    const reactionInDB = await prisma.userPlaylistReactions.findUnique({
      where: {
        userID_playlistID_reaction: {
          playlistID: playlistID,
          userID: userID,
          reaction: reaction,
        },
      },
    });

    if (reactionInDB) {
      // If the reaction exists, delete it
      await prisma.userPlaylistReactions.delete({
        where: {
          userID_playlistID_reaction: {
            playlistID: playlistID,
            userID: userID,
            reaction: reaction,
          },
        },
      });
      return { status: 'success', action: 'deleted' };
    } else {
      // If the reaction doesn't exist, create it
      await prisma.userPlaylistReactions.create({
        data: {
          playlistID: playlistID,
          userID: userID,
          reaction: reaction,
        },
      });
      return { status: 'success', action: 'created' };
    }
  } catch (error) {
    console.error('An error occurred:', error);
    return { status: 'error', message: (error as Error).message };
  }
}
