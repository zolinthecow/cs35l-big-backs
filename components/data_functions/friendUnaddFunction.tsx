'use server';
import { PrismaClient } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { getSession } from '@auth0/nextjs-auth0';

type PinStatus = 'success' | 'notFound' | 'error';
const prisma = new PrismaClient();

interface FriendItem {
  id: string;
}

export const handleFriendRemove = async (
  item: FriendItem,
): Promise<{ status: PinStatus }> => {
  'use server';
  const session = await getSession();
  const userID = session?.user?.sub;

  try {
    // Remove the friend from the user's friends list
    await prisma.user.update({
      where: { id: userID },
      data: {
        friends: {
          disconnect: { id: item.id },
        },
      },
    });

    // Remove the user from the friend's friends list
    await prisma.user.update({
      where: { id: item.id },
      data: {
        friends: {
          disconnect: { id: userID },
        },
      },
    });

    return { status: 'success' };
  } catch (error) {
    console.error('An error occurred while removing a friend:', error);
    return { status: 'error' };
  }
};
