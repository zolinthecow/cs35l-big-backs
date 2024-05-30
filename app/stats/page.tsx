'use server';

import React from 'react';
import { getSpotifyAccessToken } from '@/lib/spotify';
import StatsPage from '@/components/stats/page';

const Page = async () => {
  const spotifyAccessToken = await getSpotifyAccessToken();

  return <StatsPage accessToken={spotifyAccessToken} />;
};

export default Page;
