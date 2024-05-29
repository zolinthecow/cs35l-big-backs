import React, { FC } from 'react';
import { SongLayout } from '../ui/song-layout';
import { ArtistLayout } from '../ui/artist-layout';

interface SongDataProps {
  id: string;
  title: string;
  artist: string;
  album_url: string;
  song_url: string;
}

interface SongDataPropsReturn {
  song_items: SongDataProps[];
}

interface ArtistDataProps {
  id: string;
  artist: string;
  artist_url: string;
}

interface ArtistDataPropsReturn {
  artist_items: ArtistDataProps[];
}

interface RightSidebarProps
  extends SongDataPropsReturn,
    ArtistDataPropsReturn {}

const RightSidebar: FC<RightSidebarProps> = ({ song_items, artist_items }) => {
  return (
    <div className="h-full w-84 bg-gray-100 overflow-y-auto scrollbar-hide p-4 text-black">
      <div className="mt-4">
        <h1 className="text-xl font-bold mb-4">Top Five Songs of the Week</h1>
        <div className="space-y-4">
          {song_items.map((song: SongDataProps) => (
            <SongLayout
              key={song.id}
              title={song.title}
              artist={song.artist}
              album_url={song.album_url}
              song_url={song.song_url}
            />
          ))}
        </div>
      </div>
      <div className="mt-8">
        <h1 className="text-xl font-bold mb-4">Top 3 Artists of the Week</h1>
        <div className="space-y-4">
          {artist_items.map((artist: ArtistDataProps) => (
            <ArtistLayout
              key={artist.id}
              artist={artist.artist}
              artist_url={artist.artist_url}
            />
          ))}
        </div>
      </div>
      <div className="mt-8">
        <h1 className="text-xl font-bold mb-4">Recently Played</h1>
        <div className="space-y-4">
          {song_items.map((song: SongDataProps) => (
            <SongLayout
              key={song.id}
              title={song.title}
              artist={song.artist}
              album_url={song.album_url}
              song_url={song.song_url}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;
