'use server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface FriendProps {
  key: string;
  profileName: string;
  songArtist: string;
  profileImage: string;
  songLink: string;
}

export const getFriendsFromDb = async (
  userId: string,
): Promise<FriendProps[]> => {
  'use server';
  console.log('Fetching friends from database for user:', userId);
  try {
    // Get the user with their friends from the database
    const userWithFriends = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        friends: true, // Include the friends relation
      },
    });

    if (!userWithFriends) {
      console.log('User not found');
      return [];
    }

    console.log('Friends from db: ', userWithFriends);

    // Map the data to the FriendItem type
    const friends = userWithFriends.friends.map((friend) => ({
      key: friend.id,
      profileName: friend.username,
      songArtist: friend.nickname || '',
      profileImage: friend.cover_url || '',
      songLink: friend.profile_link || '',
    }));

    console.log('Friend information: ', friends);
    return friends;
  } catch (error) {
    console.error('An error occurred:', error);
    return [];
  }
};
