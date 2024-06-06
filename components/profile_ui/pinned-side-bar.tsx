'use client';
import React, { FC } from 'react';
import { SongLayout } from '../ui/layouts/song-layout';
import { PlaylistLayout } from '../ui/layouts/playlist-layout';
import { ArtistLayoutProfile } from '../ui/layouts/artist-layout-profile';
import { FriendItem } from '../ui/layouts/friend-layout';

// interface SongProps {
//   id: string;
//   title: string;
//   artist: string;
//   album_url: string;
//   song_url: string;
// }

// interface ArtistProps {
//   id: string;
//   artist: string;
//   artist_url: string;
// }

// interface PlaylistProps {
//   id: string;
//   title: string;
//   album_url: string;
//   playlist_url: string;
//   numberOfSongs: number;
// }


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

interface FriendProps {
  key: string;
  profileName: string;
  songArtist: string;
  profileImage: string;
  songLink: string;
}

export interface SectionProps {
  songData: pinnedSong[];
  artistData: pinnedArtist[];
  playlistData: pinnedPlaylist[];
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
        {songData.map(({ name, artistName, songImage, songURL }, index) => (
          <SongLayout
            key={index}
            title={name}
            artist={artistName}
            album_url={songImage}
            song_url={songURL}
            className="transition-all duration-200 ease-in-out hover:bg-gray-100 hover:shadow-xl"
          />
        ))}
      </div>
      <div className="flex flex-col bg-white p-6 rounded-lg shadow-md space-y-4">
        <h2 className="text-2xl font-bold text-gray-800">Pinned Playlists</h2>
        {playlistData?.map(
            ({ name, playlistImage, playlistURL, numberOfSongs }, index) => (
              <PlaylistLayout
                key={index}
                title={name}
                album_url={playlistImage}
                playlist_url={playlistURL}
                numberOfSongs={numberOfSongs}
                className="transition-all duration-200 ease-in-out hover:bg-gray-100 hover:shadow-xl"
              />
            ),
          )}
      </div>
      <Section title="Pinned Artists" scrollable>
        {artistData.map(({ name, artistImage, artistURL }, index) => (
          <ArtistLayoutProfile
            key={index}
            artist={name}
            artistImage={artistImage}
            artistUrl={artistURL}
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
