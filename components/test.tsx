'use client';

import { useEffect } from 'react';

import getSpotifyClient from '@/lib/spotify';

export default function TestComponent(props: { accessToken: string }) {
  useEffect(() => {
    (async () => {
      const spotifyClient = await getSpotifyClient(props.accessToken);
      const resp = await spotifyClient.get(`/me`);
      console.log(resp.data);
    })();
  }, [props.accessToken]);

  return <div>hi</div>;
}
