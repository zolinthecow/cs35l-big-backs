import getSpotifyClient from '@/lib/spotify';
import { Session } from '@auth0/nextjs-auth0';
import prisma from '@/prisma';

export default async function populateDBUserWithSpotifyData(session: Session) {
  const spotifyClient = await getSpotifyClient();
  const spotifyUserResp = await spotifyClient.get(`/me`);
  const spotifyUserData = spotifyUserResp.data;
  if (!spotifyUserData) {
    throw new Error('NO SPOTIFY USER??');
  }
  await prisma.user.update({
    where: {
      id: session.user.sub,
    },
    data: {
      name: spotifyUserData.display_name,
    },
  });
}
