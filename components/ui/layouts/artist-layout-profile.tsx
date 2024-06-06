'use client';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '../button';

type ArtistItemProps = {
  artist: string;
  artistImage: string;
  artistUrl: string;
  className?: string;
};
export function ArtistLayoutProfile({
  artist,
  artistImage,
  artistUrl,
  className,
}: ArtistItemProps) {
  return (
    <div
      className={`flex flex-col items-center gap-2 p-4 rounded-md transition-all duration-200 ease-in-out hover:bg-gray-100 hover:shadow-xl ${className}`}
    >
      <div style={{ width: '100px', height: '100px', position: 'relative' }}>
        <Image
          alt={`${artist} cover`}
          src={artistImage}
          layout="fill"
          objectFit="cover"
          className="rounded-md"
        />
      </div>
      <div className="text-center w-40">
        <h3 className="font-bold text-[15px] text-gray-900 dark:text-gray-200 truncate text-ellipsis">
          {artist}
        </h3>
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
