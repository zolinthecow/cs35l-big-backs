'use client';

import { useEffect } from 'react';

import getSpotifyClient from '@/lib/spotify';

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
