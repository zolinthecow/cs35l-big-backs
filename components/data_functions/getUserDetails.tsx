'use server';
import prisma from '@/prisma';
import getSpotifyClient from '@/lib/spotify';

export const getUserName = async ({
  userId,
}: {
  userId: string;
}): Promise<string> => {
  'use server';
  const userData = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      friends: true,
    },
  });

  if (!userData) {
    console.error('NO USER DATA');
    return '';
  }
  console.log('HERE', userData);
  return userData.name ?? '';
};
