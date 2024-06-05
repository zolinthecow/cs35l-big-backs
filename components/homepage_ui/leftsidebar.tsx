'use client';
import React, { FC } from 'react';
import { SongLayout } from '../ui/layouts/song-layout';
import { PlaylistLayout } from '../ui/layouts/playlist-layout';
import { ArtistLayout } from '../ui/layouts/artist-layout-sidebar';

interface pinnedSong {
  name: string;
  artistName: string;
  songImage: string;
  songURL: string;
}

interface pinnedPlaylist {
  name: string;
  playlistImage: string;
  playlistURL: string;
  numberOfSongs: number;
}

interface pinnedArtist {
  name: string;
  artistImage: string;
  artistURL: string;
}

export interface LeftSidebarProps {
  songData: pinnedSong[];
  artistData: pinnedArtist[];
  playlistData: pinnedPlaylist[];
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
          {songData?.map(({ name, artistName, songImage, songURL }, index) => (
            <SongLayout
              key={index}
              title={name}
              artist={artistName}
              album_url={songImage}
              song_url={songURL}
              className="hover:bg-gray-200 transition-colors duration-200"
            />
          ))}
        </div>
      </div>
      <div className="mt-8">
        <h1 className="text-xl font-bold mb-4">Pinned Artists</h1>
        <div className="space-y-4">
          {artistData?.map(({ name, artistImage, artistURL }, index) => (
            <ArtistLayout
              key={index}
              artist={name}
              artistImage={artistImage}
              artistUrl={'espn.com'}
              className="hover:bg-gray-200 transition-colors duration-200"
            />
          ))}
        </div>
      </div>
      <div className="mt-8">
        <h1 className="text-xl font-bold mb-4">Pinned Playlists</h1>
        <div className="space-y-4">
          {playlistData?.map(
            ({ name, playlistImage, playlistURL, numberOfSongs }, index) => (
              <PlaylistLayout
                key={index}
                title={name}
                album_url={playlistImage}
                playlist_url={playlistURL}
                numberOfSongs={numberOfSongs}
                className="hover:bg-gray-200 transition-colors duration-200"
              />
            ),
          )}
        </div>
      </div>
    </div>
  );
};

export default LeftSidebar;
