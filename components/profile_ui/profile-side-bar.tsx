'use client';
import React, { FC } from 'react';
import { AvatarImage, AvatarFallback, Avatar } from '@/components/ui/avatar';
import { Rating } from '@/components/ui/rating';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export interface ProfileProps {
  name: string;
  username: string;
  profilePicture: string;
  bio: string[];
  ratingValue: number;
  friendsCount: number;
}

const ProfileSideBar: FC<ProfileProps> = ({
  name,
  username,
  profilePicture,
  bio,
  ratingValue,
  friendsCount,
}) => {
  return (
    <div className="flex flex-col h-full items-center gap-6 md:w-1/3 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md md:sticky md:top-16">
      <div className="w-full text-left mb-0">
        <h1 className="text-2xl font-bold mb-0">Profile Page</h1>
      </div>
      <div className="flex flex-col items-center space-y-4">
        <Avatar className="h-40 w-40 md:h-60 md:w-60 border-4 border-white dark:border-gray-900">
          <AvatarImage alt={username} src={profilePicture} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <Rating rating={ratingValue} />
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold">{name}</h1>
          <div className="flex items-center space-x-2">
            <p className="text-gray-500 dark:text-gray-400">{username}</p>
            <span className="text-xl">·</span>
            <p className="text-gray-500 dark:text-gray-400">
              {friendsCount} friends
            </p>
          </div>
        </div>
      </div>
      <div className="w-full text-left mb-1">
        <h2 className="text-xl font-bold mb-0">Bio</h2>
        <div className="text-gray-700 dark:text-gray-300">
          {bio.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileSideBar;
