'use client';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '../button';

type ArtistLayoutProps = {
  artist: string;
  artistImage: string;
  artistUrl: string;
  className?: string;
};

export function ArtistLayout({
  artist,
  artistImage,
  artistUrl,
  className,
}: ArtistLayoutProps) {
  return (
    <div
      className={`relative flex items-center space-x-4 p-4 bg-white rounded-lg shadow-lg ${className}`}
    >
      <div style={{ width: '80px', height: '80px', position: 'relative' }}>
        <Image
          alt="Album Cover"
          className="rounded-md"
          objectFit="cover"
          src={artistImage}
          layout="fill"
        />
      </div>
      <div className="flex flex-col justify-center flex-1 min-w-0">
        <h1 className="font-bold text-[18px] text-gray-900 truncate">
          {artist}
        </h1>
      </div>
      <Link href={artistUrl} passHref>
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
