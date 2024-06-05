import sendbirdApi from './index';
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
  const sbUserResp = await sendbirdApi.get(`/users/${_session.user.sub}`);
  if (sbUserResp.status === 200) {
    console.log('SB USER EXISTS');
    return;
  }

  console.log('SB USER DOES NOT EXIST');

  const spotifyClient = await getSpotifyClient(_session);
  console.log('GOT SPOTIFY CLIENT');

  const currentUser = await spotifyClient.get('/me');
  const userData = currentUser.data;
  if (!userData) {
    console.warn('NO CORRESPONDING SPOTIFY USER');
    return;
  }
  console.log('GOT SPOTIFY USER', JSON.stringify(userData, null, 2));
  await sendbirdApi.post('/users', {
    user_id: _session.user.sub,
    nickname: userData.display_name,
    profile_url: userData.images.length > 0 ? userData.images[0].url : '',
  });
}
