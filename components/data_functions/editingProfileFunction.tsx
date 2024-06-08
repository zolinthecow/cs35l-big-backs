'use server';
import prisma from '@/prisma';

export const updateBio = async (
  userId: string,
  newBio: string,
): Promise<void> => {
  try {
    await prisma.user.upsert({
      where: { id: userId },
      update: { bio: newBio },
      create: {
        id: userId,
        bio: newBio,
      },
    });
  } catch (error) {
    console.error('An error occurred:', error);
  }
};
