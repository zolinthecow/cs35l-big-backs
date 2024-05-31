'use client';
import React, { FC } from 'react';
import { SongLayout } from '../ui/layouts/song-layout';
import { PlaylistLayout } from '../ui/layouts/playlist-layout';
import { ArtistLayout } from '../ui/layouts/artist-layout-sidebar';

interface SongDataProps {
  id: string;
  title: string;
  artist: string;
  album_url: string;
  song_url: string;
}

interface PlaylistDataProps {
  id: string;
  title: string;
  album_url: string;
  playlist_url: string;
  numberOfSongs: number;
}

interface ArtistDataProps {
  id: string;
  artist: string;
  artist_url: string;
}

export interface LeftSidebarProps {
  songData: SongDataProps[];
  artistData: ArtistDataProps[];
  playlistData: PlaylistDataProps[];
}

const LeftSidebar: FC<LeftSidebarProps> = ({
  songData,
  playlistData,
  artistData,
}) => {
  return (
    <div className="h-full w-full bg-gray-100 overflow-y-auto p-4 text-black flex flex-col">
      <div className="mt-4">
        <h1 className="text-xl font-bold mb-4">Pinned Songs</h1>
        <div className="space-y-4">
          {songData.map((song: SongDataProps) => (
            <SongLayout
              key={song.id}
              title={song.title}
              artist={song.artist}
              album_url={song.album_url}
              song_url={song.song_url}
              className="hover:bg-gray-200 transition-colors duration-200"
            />
          ))}
        </div>
      </div>
      <div className="mt-8">
        <h1 className="text-xl font-bold mb-4">Pinned Artists</h1>
        <div className="space-y-4">
          {artistData.map((artist: ArtistDataProps) => (
            <ArtistLayout
              key={artist.id}
              artist={artist.artist}
              artist_url={artist.artist_url}
              className="hover:bg-gray-200 transition-colors duration-200"
            />
          ))}
        </div>
      </div>
      <div className="mt-8">
        <h1 className="text-xl font-bold mb-4">Pinned Playlists</h1>
        <div className="space-y-4">
          {playlistData.map((playlist: PlaylistDataProps) => (
            <PlaylistLayout
              key={playlist.id}
              title={playlist.title}
              album_url={playlist.album_url}
              playlist_url={playlist.playlist_url}
              numberOfSongs={playlist.numberOfSongs}
              className="hover:bg-gray-200 transition-colors duration-200"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LeftSidebar;
