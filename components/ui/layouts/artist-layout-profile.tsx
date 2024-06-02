'use client';
import Image from 'next/image';

type ArtistItemProps = {
  artist: string;
  artist_url: string;
  className?: string;
};
export function ArtistLayoutProfile({
  artist,
  artist_url,
  className,
}: ArtistItemProps) {
  return (
    <div
      className={`flex flex-col items-center gap-2 p-4 rounded-md transition-all duration-200 ease-in-out hover:bg-gray-100 hover:shadow-xl ${className}`}
    >
      <div style={{ width: '100px', height: '100px', position: 'relative' }}>
        <Image
          alt={`${artist} cover`}
          src={artist_url}
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
    </div>
  );
}
