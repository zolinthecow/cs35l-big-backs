import {
  AfterCallbackAppRoute,
  handleAuth,
  handleCallback,
  handleLogin,
} from '@auth0/nextjs-auth0';
import createUserIfNotExisting from '@/actions/createUserIfNotExisting';

const scopes = [
  'openid',
  'profile',
  'email',
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

    await createUserIfNotExisting(user.sub, user.nickname);
  }

  return session;
};
export const GET = handleAuth({
  // @ts-expect-error whatever
  async login(req, res) {
    return await handleLogin(req, res, {
      authorizationParams: {
        scope: scopes.join(' '),
      },
    });
  },
  callback: handleCallback({ afterCallback }),
});
