import { Rating } from '../rating';
import Link from 'next/link';
import Image from 'next/image';
import { getAverageRating } from '@/components/data_functions/ratingPlaylists';
import { get } from 'http';
import { useState, useEffect, FC } from 'react';

// Props and PlaylistLayout from previous playlist
interface PlaylistItemLayoutProps {
  id: string;
  name: string;
  url: string;
}

const PlaylistLayout: FC<PlaylistItemLayoutProps> = ({ id, name, url }) => {
  const [rating, setRating] = useState<number | null>(null);

  useEffect(() => {
    const fetchRating = async () => {
      const result = await getAverageRating(id); // Replace '23' with userID
      setRating(result);
    };

    fetchRating();
  }, [id]);

  return (
    <Link
      className="flex items-center gap-4 transition-colors duration-200 h-18 w-full p-1 rounded-md bg-gray-100 overflow-x-hidden"
      href={`playlists/${id}`}
    >
      <div className="flex-none w-30 h-30 bg-gray-200 rounded-md flex items-center justify-center max-h-screen shadow-lg">
        <Image
          src={url}
          alt={name}
          className="object-cover rounded-md"
          height={50}
          width={50}
        />
      </div>
      <div className="overflow-hidden">
        <div className="font-semibold text-sm text-gray-800 truncate hover:underline">
          {name}
        </div>
        {rating !== null && rating !== -1 && (
          <div className="text-xs text-yellow-500 font-bold">★ {rating}</div>
        )}
      </div>
    </Link>
  );
};

interface PlaylistItem {
  id: string;
  name: string;
  images: {
    url: string;
  }[];
}

// List of playlists props
type ListofPlaylistsLayoutProps = {
  playlists: PlaylistItem[];
};

export const ListofPlaylistsLayout: FC<ListofPlaylistsLayoutProps> = ({
  playlists,
}) => {
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold mb-4">Playlists</h1>
      <div className="grid gap-6">
        {playlists?.map(({ id, name, images }) => (
          <PlaylistLayout key={id} id={id} name={name} url={images?.[0].url} />
        ))}
      </div>
    </div>
  );
};
