import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function searchUsersByName(searchTerm: string) {
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
    return users;
  } catch (error) {
    console.error('Error searching users by name:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

export default searchUsersByName;
