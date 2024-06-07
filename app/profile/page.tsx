'use server';
import React, { FC } from 'react';
import { getSession } from '@auth0/nextjs-auth0';
import ProfilePageUsingId from '@/components/profile_ui/ProfilePageUsingId';

const Page: FC = async () => {
  const session = await getSession();
  if (!session?.user?.sub) {
    console.error('NO SESSION');
    return null;
  }

  return <ProfilePageUsingId userId={session.user.sub} />;
};

export default Page;
