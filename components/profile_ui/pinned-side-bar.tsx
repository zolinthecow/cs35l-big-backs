'use client';
import React, { FC } from 'react';
import { SongLayout } from '../ui/layouts/song-layout';
import { PlaylistLayout } from '../ui/layouts/playlist-layout';
import { ArtistLayoutProfile } from '../ui/layouts/artist-layout-profile';
import { FriendItem } from '../ui/layouts/friend-layout';

interface SongProps {
  id: string;
  title: string;
  artist: string;
  album_url: string;
  song_url: string;
}

interface ArtistProps {
  id: string;
  artist: string;
  artist_url: string;
}

interface PlaylistProps {
  id: string;
  title: string;
  album_url: string;
  playlist_url: string;
  numberOfSongs: number;
}

interface FriendProps {
  key: string;
  profileName: string;
  songArtist: string;
  profileImage: string;
  songLink: string;
}

export interface SectionProps {
  songData: SongProps[];
  artistData: ArtistProps[];
  playlistData: PlaylistProps[];
  friendData: FriendProps[];
}

const Section: FC<{
  title: string;
  scrollable?: boolean;
  children: React.ReactNode;
}> = ({ title, scrollable, children }) => (
  <div className="flex flex-col gap-4 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
    <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
      {title}
    </h2>
    <div className={`flex gap-4 ${scrollable ? 'overflow-x-auto' : ''}`}>
      {children}
    </div>
  </div>
);

const PinnedSideBar: FC<SectionProps> = ({
  songData,
  artistData,
  playlistData,
  friendData,
}) => {
  return (
    <div className="flex flex-col h-full gap-6 md:w-2/3 overflow-y-auto">
      <div className="flex flex-col bg-white p-6 rounded-lg shadow-md space-y-4">
        <h2 className="text-2xl font-bold text-gray-800">Pinned Songs</h2>
        {songData.map((song) => (
          <SongLayout
            key={song.id}
            {...song}
            className="transition-all duration-200 ease-in-out hover:bg-gray-100 hover:shadow-xl"
          />
        ))}
      </div>
      <div className="flex flex-col bg-white p-6 rounded-lg shadow-md space-y-4">
        <h2 className="text-2xl font-bold text-gray-800">Pinned Playlists</h2>
        {playlistData.map((playlist) => (
          <PlaylistLayout
            key={playlist.id}
            {...playlist}
            className="transition-all duration-200 ease-in-out hover:bg-gray-100 hover:shadow-xl"
          />
        ))}
      </div>
      <Section title="Pinned Artists" scrollable>
        {artistData.map((artist) => (
          <ArtistLayoutProfile
            key={artist.id}
            artist={artist.artist}
            artist_url={artist.artist_url}
          />
        ))}
      </Section>
      <Section title="Friends" scrollable>
        {friendData.map((data) => (
          <FriendItem
            key={data.key}
            name={data.profileName}
            username={data.songArtist}
            cover_url={data.profileImage}
            profile_link={data.songLink}
          />
        ))}
      </Section>
    </div>
  );
};

export default PinnedSideBar;
