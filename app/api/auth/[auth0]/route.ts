import {
  AfterCallbackAppRoute,
  handleAuth,
  handleCallback,
} from '@auth0/nextjs-auth0';
import createUserIfNotExisting from '@/actions/createUserIfNotExisting';

const afterCallback: AfterCallbackAppRoute = async (req, session, state) => {
  const { user } = session;

  if (user) {
    console.log(user);

    await createUserIfNotExisting(user.sub, user.nickname);
  }

  return session;
};
export const GET = handleAuth({
  callback: handleCallback({ afterCallback }),
});
