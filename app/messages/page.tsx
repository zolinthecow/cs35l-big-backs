'use client';

import React from 'react';

import SendbirdApp from '@sendbird/uikit-react/App';
import '@sendbird/uikit-react/dist/index.css';

import { useUser } from '@auth0/nextjs-auth0/client';
import { NavBar } from '@/components/navbar';

const SENBIRD_APP_ID = process.env['NEXT_PUBLIC_SENDBIRD_APP_ID'] ?? '';

export default function Page() {
  const user = useUser();

  if (!user.user?.sub) {
    console.log('NO USER');
    return null;
  }

  return (
    <div className="h-screen w-full">
      <NavBar />
      <SendbirdApp appId={SENBIRD_APP_ID} userId={user.user!.sub} />
    </div>
  );
}
