'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { AvatarImage, AvatarFallback, Avatar } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { NavBar } from '@/components/navbar';
import { useState } from 'react';
import { mockPlaylistData } from '@/components/mock_data/playlist_data';
import { PlaylistLayout } from '@/components/ui/playlists/playlist-layout';
import { mockSongData } from '@/components/mock_data/song_data';
import { SongLayout } from '@/components/ui/playlists/song-layout';
import { ListofPlaylistsLayout } from '../ui/playlists/playlists-list-layout';
import React, { FC } from 'react';

import {
  ClapperboardIcon,
  DownloadIcon,
  FrownIcon,
  HomeIcon,
  ImageIcon,
  MusicIcon,
  NotebookIcon,
  PaperclipIcon,
  PlayIcon,
  SearchIcon,
  SendIcon,
  ShuffleIcon,
  SmileIcon,
  StarIcon,
  ThumbsDownIcon,
  ThumbsUpIcon,
  IconWithCounter,
  StarRating,
} from '@/components/ui/playlisticons';

interface PlaylistItem {
  id: string;
  name: string;
  images: {
    url: string;
  }[];
}

interface PlaylistPageProps {
  listOfPlaylists: PlaylistItem[];
}

const Component: FC<PlaylistPageProps> = ({ listOfPlaylists }) => {
  const [commentsCollapsed, setCommentsCollapsed] = useState(false);

  return (
    <div className="grid grid-rows-[auto_1fr] h-screen w-full">
      <NavBar />
      <div className="grid grid-cols-[240px_1fr]">
        <div className="custom-bg-cream text-gray-700 p-6 overflow-y-auto max-h-screen">
          <nav className="space-y-4">
            <ListofPlaylistsLayout playlists={listOfPlaylists} />
          </nav>
        </div>
        <div className="bg-white text-gray-700 overflow-y-auto">
          <div className="p-6 overflow-y-auto">
            <div className="flex gap-6">
              <Image
                alt="Playlist Cover"
                className="rounded-md"
                height={200}
                src="/playlisttestimg.webp"
                style={{
                  aspectRatio: '200/200',
                  objectFit: 'cover',
                }}
                width={200}
              />
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2.5">
                  <h1 className="text-2xl font-bold text-gray-900">
                    Chill Vibes
                  </h1>
                  <div className="flex items-center gap-1 text-yellow-500">
                    <StarRating />
                  </div>
                </div>
                <p className="text-gray-600">
                  A carefully curated playlist of soothing and relaxing music to
                  help you unwind and de-stress.
                </p>
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
            <div
              className={`mt-8 space-y-4 overflow-y-auto ${commentsCollapsed ? 'max-h-none' : 'max-h-48'}`}
            >
              {mockSongData.map((song) => (
                <SongLayout
                  key={song.id}
                  id={song.id}
                  title={song.title}
                  artist={song.artist}
                  album={song.album}
                  album_url={song.album_url}
                  song_url={song.song_url}
                  song_length={song.song_length}
                />
              ))}
            </div>
          </div>
          <div className="mt-8 border-t border-gray-300 pt-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-gray-900">Comments</h2>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setCommentsCollapsed(!commentsCollapsed)}
              >
                {commentsCollapsed ? 'Show Comments' : 'Hide Comments'}
              </Button>
            </div>
            {!commentsCollapsed && (
              <div className="space-y-4 overflow-y-auto max-h-48">
                <div className="flex gap-4">
                  <div className="border-t px-4 py-3 border-gray-300 flex-1">
                    <div className="flex items-center gap-2">
                      <Input
                        className="flex-1"
                        placeholder="Type your message..."
                      />
                      <Button size="icon" variant="ghost">
                        <PaperclipIcon className="h-5 w-5 text-gray-500" />
                        <span className="sr-only">Attach file</span>
                      </Button>
                      <Button size="icon" variant="ghost">
                        <SmileIcon className="h-5 w-5 text-gray-500" />
                        <span className="sr-only">Add emoji</span>
                      </Button>
                      <Button size="icon" variant="ghost">
                        <SendIcon className="h-5 w-5 text-gray-500" />
                        <span className="sr-only">Send message</span>
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Avatar className="h-10 w-10">
                    <AvatarImage alt="@shadcn" src="/placeholder-avatar.jpg" />
                    <AvatarFallback>JP</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div className="font-medium text-gray-900">John Doe</div>
                      <div className="text-sm text-gray-600">2 days ago</div>
                    </div>
                    <p className="text-gray-600">
                      This playlist is perfect for my morning commute. The chill
                      vibes really help me start the day on the right note.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Avatar className="h-10 w-10">
                    <AvatarImage alt="@shadcn" src="/placeholder-avatar.jpg" />
                    <AvatarFallback>JP</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div className="font-medium text-gray-900">
                        Jane Smith
                      </div>
                      <div className="text-sm text-gray-600">1 week ago</div>
                    </div>
                    <p className="text-gray-600">
                      Ive been listening to this playlist on repeat all week.
                      Its the perfect background music for when Im working or
                      studying.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Component;
