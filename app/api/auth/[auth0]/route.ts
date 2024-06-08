import {
  AfterCallbackAppRoute,
  handleAuth,
  handleCallback,
  handleLogin,
} from '@auth0/nextjs-auth0';
import { NextApiRequest, NextApiResponse } from 'next';
import createUserIfNotExisting from '@/actions/createUserIfNotExisting';
import { getSpotifyAccessTokenFromSession } from '@/lib/spotify/actions';
import { createSendbirdUserIfNotExisting } from '@/lib/sendbird/actions';
import populateDBUserWithSpotifyData from '@/actions/populateDBUserWithSpotifyData';

const scopes = [
  'user-read-private',
  'user-read-email',
  'user-top-read',
  'user-read-recently-played',
  'playlist-read-private',
];

const afterCallback: AfterCallbackAppRoute = async (req, session, state) => {
  const { user } = session;

  if (user) {
    console.log(user);

    await createUserIfNotExisting(session);
    await getSpotifyAccessTokenFromSession(session.user.sub);
    await createSendbirdUserIfNotExisting(session);
    await populateDBUserWithSpotifyData(session);
  }

  return session;
};
export const GET = handleAuth({
  async login(req: NextApiRequest, res: NextApiResponse) {
    return await handleLogin(req, res, {
      authorizationParams: {
        connection_scope: scopes.join(' '),
      },
    });
  },
  callback: handleCallback({ afterCallback }),
});
