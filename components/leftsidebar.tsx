import React, {FC} from 'react';
import { SongLayout } from './ui/song-layout';
import { mockSongData } from './mock_data/song_data';
import { PlaylistLayout } from './ui/playlist-layout';
import { mockPlaylistData } from './mock_data/playlist_data';
import { mockArtistData } from './mock_data/artist_data';
import { ArtistLayout } from './ui/artist-layout';



interface LeftSidebarProps {
  profileImage: string;
  profileName: string;
  profileTime: string;
  albumImage: string;
  albumTitle: string;
  albumArtist: string;
}

const LeftSidebar: FC<LeftSidebarProps> = ({
  profileImage,
  profileName,
  profileTime,
  albumImage,
  albumTitle,
  albumArtist,
}) => {
  return (
    <div className="h-full w-84 bg-gray-100 overflow-y-auto scrollbar-hide p-4 text-black">
      <div className="mt-8">
        <h1 className="text-xl font-bold mb-4">Pinned Songs</h1>
        <div className="space-y-4">
          {mockSongData.map((song) => (
            <SongLayout key={song.id} {...song}/>
          ))}
        </div>
      </div>
      <div className="mt-10">
        <h1 className="text-xl font-bold mb-4">Pinned Artists</h1>
        <div className="space-y-4">
          {mockArtistData.map((artist) => (
            <ArtistLayout key={artist.id} {...artist} />
          ))}
        </div>
      </div>
      <div className="mt-10">
        <h1 className="text-xl font-bold mb-4">Pinned Playlists</h1>
        <div className="space-y-4">
          {mockPlaylistData.map((playlist) => (
            <PlaylistLayout key={playlist.id} {...playlist} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LeftSidebar;
