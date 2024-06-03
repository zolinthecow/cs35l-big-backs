import prisma from '@/prisma';
import getSpotifyClient from '@/lib/spotify';
import sendbirdApi from '@/lib/sendbird';
import { Session } from '@auth0/nextjs-auth0';

export default async function createUserIfNotExisting(session: Session) {
  const userId = session.user.sub;
  const nickname = session.user.nickname;
  const prismaUser = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (prismaUser != null) return;

  await prisma.user.create({
    data: {
      id: userId,
      nickname: nickname,
    },
  });
}
