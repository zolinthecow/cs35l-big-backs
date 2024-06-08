'use client';
import React, { FC, useEffect, useState } from 'react';
import { AvatarImage, AvatarFallback, Avatar } from '@/components/ui/avatar';
import { Rating } from '@/components/ui/rating';
import { Button } from '@/components/ui/button';
import { updateBio } from '../data_functions/editingProfileFunction';
import { getSession } from '@auth0/nextjs-auth0';

export interface ProfileProps {
  name: string;
  username: string;
  profilePicture: string;
  bio: string;
  ratingValue: number;
  friendsCount: number;
  userId: string;
}

const ProfileSideBar: FC<ProfileProps> = ({
  name,
  username,
  profilePicture,
  bio,
  ratingValue,
  friendsCount,
  userId,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newBio, setNewBio] = useState(bio);

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleBioChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setNewBio(event.target.value);
  };

  const handleSaveClick = () => {
    updateBio(userId, newBio);
    setIsEditing(false);
  };

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
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold mb-0">Bio</h2>
          <button
            onClick={handleEditClick}
            className={`ml-2 py-1 px-3 text-xs rounded transition duration-200 ${
              isEditing
                ? 'bg-red-500 hover:bg-red-600'
                : 'bg-blue-500 hover:bg-blue-600'
            } text-white`}
          >
            {isEditing ? 'Cancel' : 'Edit'}
          </button>
        </div>
        {isEditing ? (
          <div className="mt-2">
            <textarea
              value={newBio}
              onChange={handleBioChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
            />
            <button
              onClick={handleSaveClick}
              className="mt-2 py-1 px-3 text-sm bg-green-500 hover:bg-green-600 text-white rounded transition duration-200"
            >
              Save
            </button>
          </div>
        ) : (
          <div className="text-gray-700 dark:text-gray-300 mt-1">{newBio}</div>
        )}
      </div>
    </div>
  );
};

export default ProfileSideBar;
