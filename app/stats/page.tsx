'use server';

import React from 'react';
import { getSpotifyAccessToken } from '@/lib/spotify';
import StatsPage from '@/components/stats/page';

const Page = async () => {
  const spotifyAccessToken = await getSpotifyAccessToken();

  return <StatsPage accessToken={spotifyAccessToken.access_token} />;
};

export default Page;
