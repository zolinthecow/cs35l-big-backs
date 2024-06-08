'use server';
import { PrismaClient } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { getSession } from '@auth0/nextjs-auth0';

type PinStatus = 'success' | 'duplicate' | 'limitReached' | 'error';
const prisma = new PrismaClient();

interface FriendItem {
  id: string;
  name: string;
}

export const handleFriendAdd = async (
  item: FriendItem,
): Promise<{ status: PinStatus }> => {
  'use server';
  console.log('Pinned artist:', item);
  const session = await getSession();
  const userID = session?.user?.sub;
  try {
    // Fetch the user with their friends
    const user = await prisma.user.findUnique({
      where: { id: userID },
      include: { friends: true },
    });

    // Check if the friend is already in the user's friends list
    if (user && user.friends.some((friend) => friend.id === item.id)) {
      console.log('This user is already a friend.');
      return { status: 'duplicate' };
    }

    // If the friend is not already in the user's friends list, add them
    await prisma.user.update({
      where: { id: userID },
      data: {
        friends: {
          connect: { id: item.id },
        },
      },
    });
    await prisma.user.update({
      where: { id: item.id },
      data: {
        friendsRelation: {
          connect: { id: userID },
        },
      },
    });
    return { status: 'success' };
  } catch (error) {
    console.error('An error occurred while adding a friend:', error);
    return { status: 'error' };
  }
};
