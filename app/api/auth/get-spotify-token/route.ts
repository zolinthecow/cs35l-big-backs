import { getSpotifyAccessTokenWithSession } from '@/lib/spotify';

import { NextRequest, NextResponse } from 'next/server';
import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0';

export const GET = withApiAuthRequired(async function route(req: NextRequest) {
  const res = new NextResponse();
  const session = await getSession(req, res);
  if (!session) {
    return NextResponse.json({}, { status: 401, statusText: 'NO SESSION' });
  }

  const apiToken = await getSpotifyAccessTokenWithSession(session);
  return NextResponse.json({ apiToken }, res);
});
