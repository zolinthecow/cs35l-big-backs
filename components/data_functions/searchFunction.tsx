'use server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface UserResult {
  id: string;
  name: string;
}

const searchUsersByName = (searchTerm: string): Promise<UserResult[]> => {
  return new Promise(async (resolve, reject) => {
    try {
      const users = await prisma.user.findMany({
        where: {
          name: {
            contains: searchTerm,
            mode: 'insensitive', // Case-insensitive search
          },
        },
        select: {
          id: true,
          name: true,
        },
      });
      const formattedUsers: UserResult[] = users.map((user) => ({
        id: user.id,
        name: user.name || '', // Ensure name is not nullable
      }));
      resolve(formattedUsers);
    } catch (error) {
      console.error('Error searching users by name:', error);
      reject(error);
    } finally {
      await prisma.$disconnect();
    }
  });
};

export default searchUsersByName;
