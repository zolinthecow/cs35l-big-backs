'use client';
import { Button } from '../button';
import Image from 'next/image';
import Link from 'next/link';
type PlaylistLayoutProps = {
  title: string;
  album_url: string;
  playlist_url: string;
  numberOfSongs: number;
  className?: string;
  playlistID: string;
};

export function PlaylistLayout({
  title,
  album_url,
  playlist_url,
  numberOfSongs,
  className,
  playlistID,
}: PlaylistLayoutProps) {
  return (
    <div
      className={`relative flex items-center space-x-4 p-4 bg-white rounded-lg shadow-lg ${className}`}
    >
      <img
        alt="Album Cover"
        className="w-20 h-20 rounded-lg object-cover"
        src={album_url}
      />
      <div className="flex flex-col justify-center flex-1 min-w-0">
        <Link href={`/playlists/${playlistID}`}>
          <h1 className="font-bold text-[15px] text-gray-900 truncate hover:underline">
            {title}
          </h1>
        </Link>
        <p className="text-[13px] text-gray-500">
          {numberOfSongs ? numberOfSongs.toString() : '0'} songs
        </p>
      </div>
      <Link href={playlist_url} passHref>
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
  );
}
