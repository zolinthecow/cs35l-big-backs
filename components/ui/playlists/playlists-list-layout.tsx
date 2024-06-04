import { Rating } from '../rating';
import Link from 'next/link';
import Image from 'next/image';

// Props and PlaylistLayout from previous playlist
interface PlaylistItemLayoutProps {
  id: string;
  name: string;
  url: string;
}

function PlaylistLayout({ id, name, url }: PlaylistItemLayoutProps) {
  return (
    <Link className={`flex items-center gap-4 hover:text-gray-900`} href={id}>
      <div className="flex-none w-30 h-30 bg-gray-200 rounded-md flex items-center justify-center">
        <Image
          src={url}
          alt={name}
          className="object-cover rounded-md"
          height={50}
          width={50}
        />
      </div>
      <div>
        <div className="font-medium text-sm">{name}</div>
        <div className="text-xs text-gray-500">★ 4</div>
      </div>
    </Link>
  );
}

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

export function ListofPlaylistsLayout({
  playlists,
}: ListofPlaylistsLayoutProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium text-gray-600">Playlists</h3>
      <div className="grid gap-6">
        {playlists?.map(({ id, name, images }, index) => (
          <PlaylistLayout key={index} id={id} name={name} url={images[0].url} />
        ))}
      </div>
    </div>
  );
}
