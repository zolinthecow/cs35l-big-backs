'use server';
import React, { FC } from 'react';
import ProfilePageUsingId from '@/components/profile_ui/ProfilePageUsingId2';

type Props = {
  params: {
    userId: string;
  };
};

export default async function Page({ params }: Props) {
  const userId = decodeURIComponent(params.userId);
  return <ProfilePageUsingId userId={userId} />;
}
