'use client';
import { Button } from '../button';
import Image from 'next/image';
import Link from 'next/link';

type SongLayoutProps = {
  title: string;
  artist: string;
  album_url: string;
  song_url: string;
  className?: string;
  onUnpin: () => void;
};

export function SongLayout({
  title,
  artist,
  album_url,
  song_url,
  className,
  onUnpin,
}: SongLayoutProps) {
  return (
    <div
      className={`relative flex items-center space-x-4 p-4 bg-white rounded-lg shadow-lg w-full ${className}`}
    >
      <Image
        alt="Album Cover"
        className="rounded-lg object-cover"
        src={album_url}
        height={80}
        width={80}
      />
      <div className="flex flex-col justify-center flex-1 min-w-0">
        <h1 className="font-bold text-[15px] text-gray-900 truncate text-ellipsis">
          {title}
        </h1>
        <p className="text-[12px] text-gray-600 truncate text-ellipsis">
          {artist}
        </p>
      </div>
      <div className="flex space-x-2">
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
        <Button
          variant="ghost"
          size="sm"
          onClick={onUnpin}
          className="text-red-500 hover:text-red-700"
        >
          Unpin
        </Button>
      </div>
    </div>
  );
}
