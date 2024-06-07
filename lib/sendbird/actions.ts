import sendbirdApi from './index';
import prisma from '@/prisma';
import { getSession, Session } from '@auth0/nextjs-auth0';
import getSpotifyClient from '../spotify';

export async function createSendbirdUserIfNotExisting(session?: Session) {
  let _session: Session | null | undefined = session;
  if (!_session) {
    _session = await getSession();
  }
  if (!_session) {
    throw new Error('NO SESSION');
  }

  const dbUser = await prisma.user.findUnique({
    where: {
      id: _session.user.sub,
    },
    select: {
      sendbirdId: true,
    },
  });
  const sbUserId = dbUser?.sendbirdId;
  if (!sbUserId) {
    console.error('NO SB USER ID THIS SHOULD NOT BE POSSIBLE');
    throw new Error('NO SB USER ID');
  }

  try {
    const sbUserResp = await sendbirdApi.get(`/users/${sbUserId}`);
    if (sbUserResp.status === 200) {
      console.log('SB USER EXISTS');
      return;
    }
  } catch (e) {
    console.log('SB USER DOES NOT EXIST');
    // This happens if the SB user doesn't exit so pass through
  }

  const spotifyClient = await getSpotifyClient({ session: _session });
  console.log('GOT SPOTIFY CLIENT');

  const currentUser = await spotifyClient.get('/me');
  const userData = currentUser.data;
  if (!userData) {
    console.warn('NO CORRESPONDING SPOTIFY USER');
    return;
  }
  console.log('GOT SPOTIFY USER', JSON.stringify(userData, null, 2));
  await sendbirdApi.post('/users', {
    user_id: sbUserId,
    nickname: userData.display_name,
    profile_url: userData.images.length > 0 ? userData.images[0].url : '',
  });
}
