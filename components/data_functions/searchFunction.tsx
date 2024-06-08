'use server';
import { PrismaClient } from '@prisma/client';
import { getSession } from '@auth0/nextjs-auth0';

const prisma = new PrismaClient();

interface UserResult {
  id: string;
  name: string;
}

const searchUsersByName = async (searchTerm: string): Promise<UserResult[]> => {
  try {
    const session = await getSession();
    const userID = session?.user?.sub;

    const users = await prisma.user.findMany({
      where: {
        name: {
          contains: searchTerm,
          mode: 'insensitive', // Case-insensitive search
        },
        id: {
          not: userID,
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

    return formattedUsers;
  } catch (error) {
    console.error('Error searching users by name:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
};

export default searchUsersByName;
