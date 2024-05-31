'use client';
import React, { FC } from 'react';
import { SongLayout } from '../ui/layouts/song-layout';
import { ArtistLayout } from '../ui/layouts/artist-layout-sidebar';

interface TopArtist {
  name: string;
  images: { url: string }[];
  external_urls: {
    spotify: string;
  };
}

interface Artist {
  name: string;
}

interface Track {
  name: string;
  artists: Artist[];
  album: {
    images: { url: string }[];
  };
  external_urls: {
    spotify: string;
  };
}

interface RecentlyPlayed {
  track: {
    name: string;
    artists: Artist[];
    album: {
      images: { url: string }[];
    };
    external_urls: {
      spotify: string;
    };
  };
}

export interface RightSidebarProps {
  songData: Track[];
  artistData: TopArtist[];
  recentlyPlayed: RecentlyPlayed[];
}

const RightSidebar: FC<RightSidebarProps> = ({
  songData,
  artistData,
  recentlyPlayed,
}) => {
  return (
    <div className="h-full w-full bg-gray-100 overflow-y-auto scrollbar-hide p-4 text-black">
      <div className="mt-4">
        <h1 className="text-xl font-bold mb-4">Top Five Songs of the Month</h1>
        <div className="space-y-4 w-30">
          {songData?.map(({ name, artists, album, external_urls }, index) => (
            <SongLayout
              key={index}
              title={name}
              artist={artists.map((artist) => artist.name).join(', ')}
              album_url={album.images[0].url}
              song_url={external_urls.spotify}
              className="hover:bg-gray-200 transition-colors duration-200"
            />
          ))}
        </div>
      </div>
      <div className="mt-8">
        <h1 className="text-xl font-bold mb-4">
          Top Five Artists of the Month
        </h1>
        <div className="space-y-4">
          {artistData?.map(({ name, images, external_urls }, index) => (
            <ArtistLayout
              key={index}
              artist={name}
              artist_url={images[0].url}
              className="hover:bg-gray-200 transition-colors duration-200"
            />
          ))}
        </div>
      </div>
      <div className="mt-8">
        <h1 className="text-xl font-bold mb-4">Recently Played</h1>
        <div className="space-y-4 w-20">
          {recentlyPlayed?.map(({ track }, index) => (
            <SongLayout
              key={index}
              title={track.name}
              artist={track.artists.map((artist) => artist.name).join(', ')}
              album_url={track.album.images[0].url}
              song_url={track.external_urls.spotify}
              className="hover:bg-gray-200 transition-colors duration-200"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;
