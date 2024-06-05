import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import React, { FC } from 'react';
import {
  ClapperboardIcon,
  DownloadIcon,
  FrownIcon,
  PlayIcon,
  SearchIcon,
  ShuffleIcon,
  SmileIcon,
  ThumbsDownIcon,
  ThumbsUpIcon,
  IconWithCounter,
  StarRating,
} from '@/components/ui/playlisticons';

interface TitleLayoutProps {
  name: string;
  images: {
    url: string;
  }[];
  description: string;
}

export function TitleLayout({ name, images, description }: TitleLayoutProps) {
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
                <StarRating />
              </div>
            </div>
            <p className="text-gray-600">{description}</p>
            <div className="flex items-center gap-4">
              <Button size="icon" variant="ghost">
                <PlayIcon className="w-6 h-6" />
                <span className="sr-only">Play</span>
              </Button>
              <Button size="icon" variant="ghost">
                <ShuffleIcon className="w-6 h-6" />
                <span className="sr-only">Shuffle</span>
              </Button>
              <Button size="icon" variant="ghost">
                <DownloadIcon className="w-6 h-6" />
                <span className="sr-only">Download</span>
              </Button>
              <Button size="icon" variant="ghost">
                <SearchIcon className="w-6 h-6" />
                <span className="sr-only">Search</span>
              </Button>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2">
                  <IconWithCounter
                    icon={ThumbsUpIcon}
                    initialCount={0}
                    className="text-gray-400"
                  />
                  <IconWithCounter
                    icon={ThumbsDownIcon}
                    initialCount={0}
                    className="text-gray-400"
                  />
                  <IconWithCounter
                    icon={ClapperboardIcon}
                    initialCount={0}
                    className="text-gray-400"
                  />
                  <IconWithCounter
                    icon={SmileIcon}
                    initialCount={0}
                    className="text-gray-400"
                  />
                  <IconWithCounter
                    icon={FrownIcon}
                    initialCount={0}
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
