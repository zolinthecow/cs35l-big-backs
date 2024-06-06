'use client';

import { useEffect } from 'react';

import { useRouter } from 'next/navigation';
import getSpotifyClient from '@/lib/spotify';

const ME_UID = 'oauth2|spotify|spotify:user:zolinthecow';

export default function TestComponent() {
  useEffect(() => {
    (async () => {
      const spotifyClient = await getSpotifyClient();
      const resp = await spotifyClient.get(`/me`);
      console.log(resp.data);
    })();
  }, []);
  return <div>hi</div>;
}
