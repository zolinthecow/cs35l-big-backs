import Link from 'next/link';
import {
  MusicIcon,
  NotebookIcon,
  ImageIcon,
} from '@/components/ui/playlisticons';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

type SongItemLayoutProps = {
  id: string;
  title: string;
  artist: string;
  album: string;
  album_url: string;
  song_url: string;
  song_length: string;
};

export function SongItemLayout({
  title,
  artist,
  album,
  album_url,
  song_url,
  song_length,
}: SongItemLayoutProps) {
  return (
    <div className="grid grid-cols-[48px_1fr_1fr_0.4fr_auto] items-center gap-7">
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
      <div className="flex items-right gap-2">
        <Button size="icon" variant="ghost">
          {' '}
          {/* Notebook Icon Button; not showing up? */}
          <NotebookIcon className="w-5 h-5" />
          <span className="sr-only">Add note</span>
        </Button>
        <Button size="icon" variant="ghost">
          <ImageIcon className="w-5 h-5" />
          <span className="sr-only">Add image</span>
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
};

export function ListofSongsLayout({ songs }: ListofSongsLayoutProps) {
  return (
    <div className="grid gap-6">
      {songs?.map(({ track }, index) => (
        <SongItemLayout
          key={index}
          id={track.id}
          title={track.name}
          artist={track.artists.map((artist) => artist.name).join(', ')}
          album={track.album.name}
          album_url={track.album.images[0].url}
          song_url={track.external_urls.spotify}
          song_length={track.duration_ms}
        />
      ))}
    </div>
  );
}
