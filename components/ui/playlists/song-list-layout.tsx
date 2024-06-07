import Link from 'next/link';
import {
  MusicIcon,
  NotebookIcon,
  ImageIcon,
} from '@/components/ui/playlisticons';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import React, { useState } from 'react';
import { PrismaClient } from '@prisma/client';
import {
  checkNoteExists,
  submitNote,
} from '@/components/data_functions/note_playlists';
import { getSession } from '@auth0/nextjs-auth0';

const prisma = new PrismaClient();

type SongItemLayoutProps = {
  id: string;
  title: string;
  artist: string;
  album: string;
  album_url: string;
  song_url: string;
  song_length: string;
  note: string;
  userID: string;
  onAddNote: (id: string, note: string) => void;
};

function formatDuration(ms: string): string {
  // Turn the string into a number
  const duration = parseInt(ms, 10);
  const minutes = Math.floor(duration / 60000);
  const seconds = Math.floor((duration % 60000) / 1000);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

export async function SongItemLayout({
  id,
  title,
  artist,
  album,
  album_url,
  song_url,
  song_length,
  userID,
}: SongItemLayoutProps) {
  const [showNotebox, setShowNotebox] = useState(false);
  const [newNote, setNewNote] = useState('');
  const toggleNotebox = () => {
    setShowNotebox(!showNotebox);
  };

  return (
    <div className="grid grid-cols-[48px_1fr_1fr_0.4fr_0.4fr_auto] items-center gap-7">
      <div className="w-14 h-14 bg-gray-200 rounded-md flex items-center justify-center">
        <img
          src={album_url}
          alt={album}
          className="w-full h-full object-cover rounded-md"
        />
      </div>
      <div>
        <Link href={song_url} passHref>
          {' '}
          {/* Song URL that leads to Spotify */}
          <div className="font-medium text-gray-900 hover:underline cursor-pointer">
            {title}
          </div>
        </Link>
        <div className="text-sm text-gray-600">{artist}</div>
      </div>
      <div className="text-sm text-gray-600 truncate text-ellipsis">
        {album}
      </div>
      <div className="text-sm text-gray-600">{song_length}</div>
      <div className="flex items-right gap-2 pl-9">
        <Button
          size="icon"
          variant="ghost"
          onClick={async () => {
            const note = await checkNoteExists({
              userID: userID,
              songID: id,
              playlistID: '37i9dQZF1DX8Sz1gsYZdwj',
            });
            setShowNotebox(true);
            setNewNote(note.note);
          }}
        >
          <NotebookIcon className="w-6.5 h-6.5" />
          <span className="sr-only">Add note</span>
        </Button>
        <Link href={song_url} passHref>
          <Button
            variant="default"
            size="sm"
            className="p-2 text-white bg-transparent rounded-full hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75"
          >
            <Image
              src="https://static-00.iconduck.com/assets.00/spotify-icon-2048x2048-n3imyp8e.png"
              alt="Spotify"
              width={24}
              height={24}
            />
          </Button>
        </Link>
      </div>
      {showNotebox && (
        <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
          <div className="p-4 bg-white rounded-md shadow-lg">
            <textarea
              rows={4}
              cols={50}
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              placeholder="Add your note..."
            />
            <div className="flex justify-end gap-2 mt-2">
              <Button onClick={toggleNotebox}>Close</Button>
              <Button
                onClick={async () => {
                  const note = await submitNote({
                    userID: userID,
                    songID: id,
                    playlistID: '37i9dQZF1DX8Sz1gsYZdwj',
                    note: newNote, // Use newNote here to pass the updated value
                  });
                  setShowNotebox(false);
                }}
              >
                Send
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
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

// List of songs props
type ListofSongsLayoutProps = {
  songs: SongItem[];
  notes: { [id: string]: string };
  onAddNote: (id: string, note: string) => void;
  userID: string;
};

export function ListofSongsLayout({
  songs,
  notes,
  onAddNote,
  userID,
}: ListofSongsLayoutProps) {
  return (
    <div className="grid gap-6 h-auto overflow-y-hidden">
      {songs?.map(({ track }, index) => (
        <SongItemLayout
          key={index}
          id={track.id}
          title={track.name}
          artist={track.artists.map((artist) => artist.name).join(', ')}
          album={track.album.name}
          album_url={track.album.images[0].url}
          song_url={track.external_urls.spotify}
          song_length={formatDuration(track.duration_ms)}
          note={notes[track.id] || ''}
          onAddNote={onAddNote}
          userID={userID}
        />
      ))}
    </div>
  );
}
