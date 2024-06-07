'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { AvatarImage, AvatarFallback, Avatar } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { NavBar } from '@/components/navbar';
import { useState } from 'react';
import { ListofPlaylistsLayout } from '../ui/playlists/playlists-list-layout2';
import { ListofSongsLayout } from '../ui/playlists/song-list-layout';
import React, { FC } from 'react';
import { TitleLayout } from '../ui/playlists/title-layout';

import {
  PaperclipIcon,
  SendIcon,
  SmileIcon,
} from '@/components/ui/playlisticons';
import { CommentSection } from '../ui/playlists/comment-layout';

interface PlaylistItem {
  id: string;
  name: string;
  images: {
    url: string;
  }[];
}

interface SongItem {
  track: {
    id: string;
    name: string;
    artists: Artist[];
    duration_ms: string;
    album: {
      name: string;
      images: {
        url: string;
      }[];
    };
    external_urls: {
      spotify: string;
    };
  };
}

interface Artist {
  name: string;
}

interface TitleLayoutProps {
  name: string;
  images: {
    url: string;
  }[];
  description: string;
}

interface NoteReturn {
  songID: string;
  note: string;
}

interface Note {
  userID: string;
  songID: string;
  playlistID: string;
}

interface PlaylistPageProps {
  listOfPlaylists: PlaylistItem[];
  listOfSongs: SongItem[];
  title: TitleLayoutProps;
  initialCount: number[];
  booleanArray: boolean[];
  averageRating: number;
  userIDStar: number;
  commentsFromDb: CommentReturn[];
  userID: string;
  playlistID: string;
}

interface CommentReturn {
  // For putting comment into database
  userID: string;
  playlistID: string;
  username: string;
  comment: string;
  time: Date;
}

const Component: FC<PlaylistPageProps> = ({
  listOfPlaylists,
  listOfSongs,
  title,
  initialCount,
  booleanArray,
  averageRating,
  userIDStar,
  commentsFromDb,
  userID,
  playlistID,
}) => {
  const [commentsCollapsed, setCommentsCollapsed] = useState(true);
  const [notes, setNotes] = useState<{ [id: string]: string }>({});

  const handleAddNote = (id: string, note: string) => {
    setNotes((prevNotes) => ({ ...prevNotes, [id]: note }));
  };

  return (
    <div className="grid grid-rows-[auto_1fr_auto] h-full w-full bg-gray-50 overflow-hidden">
      <NavBar />
      <div className="grid grid-cols-[240px_1fr] overflow-hidden max-h-100vh w-full">
        <div className="bg-gray-100 text-gray-700 p-6 overflow-y-auto max-h-screen shadow-lg">
          <div className="space-y-4">
            <ListofPlaylistsLayout playlists={listOfPlaylists} />
          </div>
        </div>
        <div className="flex flex-col overflow-hidden h-full w-full">
          <div className="flex-1 mt-8 space-y-4 overflow-y-auto px-6 w-full">
            <TitleLayout
              name={title.name}
              images={title.images}
              description={title.description}
              userID={userID}
              playlistID={playlistID}
              initialCount={initialCount}
              booleanArray={booleanArray}
              averageRating={averageRating}
              userRating={userIDStar}
            />
            <div className="px-5 max-h-full">
              <ListofSongsLayout
                songs={listOfSongs}
                notes={notes}
                onAddNote={handleAddNote}
                userID={userID}
                playlistID={playlistID}
              />
            </div>
          </div>
          <div className="border-t border-gray-300 pt-6 bg-white">
            <div className="flex justify-between items-center mb-4 px-6">
              <h2 className="text-lg font-bold text-gray-900">Comments</h2>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setCommentsCollapsed(!commentsCollapsed)}
                className="text-gray-500 hover:text-gray-900"
              >
                {commentsCollapsed ? 'Show Comments' : 'Hide Comments'}
              </Button>
            </div>

            {!commentsCollapsed && (
              <div className="space-y-4 overflow-y-auto max-h-48 px-6">
                <div className="flex gap-4 border-t pt-4 border-gray-200">
                  <div className="flex-1">
                    <CommentSection
                      playlistID={'37i9dQZF1EVHGWrwldPRtj'}
                      commentsFromDb={commentsFromDb}
                      userID={userID}
                    ></CommentSection>
                  </div>
                </div>
              </div>
            )}

            {commentsCollapsed && (
              <div className="space-y-4 overflow-y-auto max-h-0 px-6"></div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Component;
