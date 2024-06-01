import axios from 'axios';

const SENDBIRD_APP_ID = process.env['NEXT_PUBLIC_SENDBIRD_APP_ID'] ?? '';
const SENDBIRD_BASE_URL = `https://api-${SENDBIRD_APP_ID}.sendbird.com/v3`;
const SENDBIRD_API_TOKEN = process.env['SENDBIRD_API_TOKEN'] ?? '';

const sendbirdApiSingleton = () => {
  const sendbirdApi = axios.create({
    baseURL: SENDBIRD_BASE_URL,
    headers: {
      'Api-Token': `${SENDBIRD_API_TOKEN}`,
    },
  });

  return sendbirdApi;
};

declare global {
  var sendbirdApiGlobal: undefined | ReturnType<typeof sendbirdApiSingleton>;
}

const sendbirdApi = globalThis.sendbirdApiGlobal ?? sendbirdApiSingleton();

export default sendbirdApi;

if (process.env.NODE_ENV !== 'production')
  globalThis.sendbirdApiGlobal = sendbirdApi;
