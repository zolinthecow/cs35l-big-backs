'use client';
import Image from 'next/image';

type ArtistLayoutProps = {
  artist: string;
  artist_url: string;
  className?: string;
};

export function ArtistLayout({
  artist,
  artist_url,
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
          src={artist_url}
          layout="fill"
        />
      </div>
      <div className="flex flex-col justify-center flex-1 min-w-0">
        <h1 className="font-bold text-[18px] text-gray-900 truncate">
          {artist}
        </h1>
      </div>
    </div>
  );
}
