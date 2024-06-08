'use server';
import prisma from '@/prisma';
import { getSession } from '@auth0/nextjs-auth0';
import getSpotifyClient from '@/lib/spotify';

interface AirbudsData {
  profileUserId: string;
  profileImage: string;
  profileName: string;
  profileTime: string;
  albumImage: string;
  songTitle: string;
  songArtist: string;
  songLink: string;
}

export async function getAirbudsData(): Promise<AirbudsData[]> {
  'use server';
  const session = await getSession();
  if (!session?.user?.sub) {
    console.error('NO SESSION');
    return [];
  }

  const prismaUser = await prisma.user.findUnique({
    where: {
      id: session.user.sub,
    },
    include: {
      friends: true,
    },
  });
  if (!prismaUser) {
    console.error('NO PRISMA USER');
    return [];
  }
  const friends = [...prismaUser.friends, prismaUser];
  const airbudsData: AirbudsData[] = [];

  function idHash(str: string) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash += str.charCodeAt(i);
    }
    return (hash % 50) + 1;
  }

  for (const friend of friends) {
    try {
      const friendSpotifyClient = await getSpotifyClient({
        userId: friend.id,
        user: session.user,
      });
      const friendSpotifyUserResp = await friendSpotifyClient.get(`/me`);
      const friendCurrentTrackResp = await friendSpotifyClient.get(
        `/me/player/currently-playing`,
      );
      const friendRecentlyPlayedResp = await friendSpotifyClient.get(
        `/me/player/recently-played`,
      );
      if (
        !friendSpotifyUserResp.data ||
        !friendCurrentTrackResp.data ||
        !friendRecentlyPlayedResp.data
      ) {
        console.error(`NO SPOTIFY USER DATA FOR ${friend.id}`);
        continue;
      }
      const spotifyFriend = friendSpotifyUserResp.data;
      const friendCurrentTrack = friendCurrentTrackResp.data;
      const friendRecentlyPlayedTracks = friendRecentlyPlayedResp.data;
      const itemToUse =
        friendCurrentTrack.item ?? friendRecentlyPlayedTracks.items[0];
      airbudsData.push({
        profileUserId: friend.id,
        profileImage:
          spotifyFriend.images?.[0]?.url ??
          `https://avatar.iran.liara.run/public/${idHash(friend.id)}`,
        profileName: friend.name ?? '',
        profileTime: 'Now',
        albumImage: itemToUse.album.images?.[0].url,
        songTitle: itemToUse.name,
        songArtist: itemToUse.artists?.[0].name,
        songLink: `https://open.spotify.com/track/${itemToUse.id}`,
      });
    } catch (e) {
      console.error(e);
    }
  }

  return airbudsData;
}
