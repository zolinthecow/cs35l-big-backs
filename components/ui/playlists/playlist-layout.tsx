import Link from 'next/link';
import Image from 'next/image';
import { MusicIcon } from '@/components/ui/playlisticons';

type PlaylistLayoutProps = {
  id: string;
  title: string;
  playlist_url: string;
  className?: string;
  rating: number;
  album_url: string;
};

export function PlaylistLayout({
  id,
  title,
  playlist_url,
  rating,
  className,
  album_url,
}: PlaylistLayoutProps) {
  return (
    <Link
      key={id}
      className={`flex items-center gap-2 hover:text-gray-900 ${className}`}
      href={playlist_url}
    >
      <div className="w-40 h-40 bg-gray-200 rounded-md flex items-center justify-center">
        <Image
          src={album_url}
          alt={title}
          className="w-full h-full object-cover rounded-md"
          height={30}
          width={30}
        />
      </div>
      <div>
        <div className="font-medium">{title}</div>
        <div className="text-xs text-gray-500">★ {rating.toFixed(1)}</div>
      </div>
    </Link>
  );
}
