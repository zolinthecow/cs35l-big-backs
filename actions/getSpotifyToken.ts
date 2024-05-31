'use server';

import { getSession } from '@auth0/nextjs-auth0';
import { getSpotifyAccessTokenWithSession } from '@/lib/spotify';

export default async function getSpotifyAccessToken() {
  const session = await getSession();
  if (!session) {
    throw new Error('NO SESSION');
  }
  const token = await getSpotifyAccessTokenWithSession(session);
  return token;
}
