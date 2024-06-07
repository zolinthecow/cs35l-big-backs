import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import React, { FC } from 'react';
import {
  ClapperboardIcon,
  FrownIcon,
  SmileIcon,
  ThumbsDownIcon,
  ThumbsUpIcon,
  IconWithCounter,
  StarRating,
} from '@/components/ui/playlisticons';
import { useState } from 'react';
import {
  submitReaction,
  submitUserPlaylistReaction,
} from '@/components/data_functions/reactionFunctions';
import { submitRating } from '@/components/data_functions/ratingPlaylists';

interface TitleLayoutProps {
  name: string;
  images: {
    url: string;
  }[];
  description: string;
  initialCount: number[];
  booleanArray: boolean[];
  userID: string;
  playlistID: string;
  averageRating: number;
  userRating: number;
}

export function TitleLayout({
  name,
  images,
  description,
  initialCount,
  userID,
  playlistID,
  booleanArray,
  averageRating,
  userRating,
}: TitleLayoutProps) {
  const [counts, setCounts] = useState(initialCount);
  const handleCountChange = (reaction: number, newCount: number) => {
    const newCounts = [...counts];
    newCounts[reaction] = newCount;
    console.log('NEW COUNTS', newCounts);
    console.log('reaction', reaction);
    setCounts(newCounts);
    submitReaction(playlistID, reaction, newCount);
    submitUserPlaylistReaction(playlistID, userID, reaction);
  };
  return (
    <div className="bg-white text-gray-700 overflow-y-auto">
      <div className="p-6 overflow-y-auto">
        <div className="flex gap-6">
          <Image
            alt="Playlist Cover"
            className="rounded-md"
            height={200}
            src={images[0].url}
            style={{
              aspectRatio: '200/200',
              objectFit: 'cover',
            }}
            width={200}
          />
          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-2.5">
              <h1 className="text-2xl font-bold text-gray-900">{name}</h1>
              <div className="flex items-center gap-1 text-yellow-500">
                <StarRating
                  initialUserRating={userRating === -1 ? 0 : userRating}
                  playlistID={playlistID}
                  userID={userID}
                  averageRating={averageRating === -1 ? 0 : averageRating}
                  onCountChange={submitRating}
                />
              </div>
            </div>
            <p className="text-gray-600">{description}</p>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2">
                  <IconWithCounter
                    icon={ThumbsUpIcon}
                    initialCount={counts[0]}
                    didUserReact={booleanArray[0]}
                    onCountChange={(count) => handleCountChange(0, count)}
                    className="text-gray-400"
                  />
                  <IconWithCounter
                    icon={ThumbsDownIcon}
                    initialCount={counts[1]}
                    didUserReact={booleanArray[1]}
                    onCountChange={(count) => handleCountChange(1, count)}
                    className="text-gray-400"
                  />
                  <IconWithCounter
                    icon={ClapperboardIcon}
                    initialCount={counts[2]}
                    didUserReact={booleanArray[2]}
                    onCountChange={(count) => handleCountChange(2, count)}
                    className="text-gray-400"
                  />
                  <IconWithCounter
                    icon={SmileIcon}
                    initialCount={counts[3]}
                    didUserReact={booleanArray[3]}
                    onCountChange={(count) => handleCountChange(3, count)}
                    className="text-gray-400"
                  />
                  <IconWithCounter
                    icon={FrownIcon}
                    initialCount={counts[4]}
                    didUserReact={booleanArray[4]}
                    onCountChange={(count) => handleCountChange(4, count)}
                    className="text-gray-400"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
