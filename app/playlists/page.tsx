'use server';

import getSpotifyClient from '@/lib/spotify';
import { ListofPlaylistsLayout } from '@/components/ui/playlists/playlists-list-layout';
import Component from '@/components/playlists_ui/playlist_ui';
import React, { FC } from 'react';
import { title } from 'process';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { PrismaClient } from '@prisma/client';

type noteStatus = 'exists' | 'doesNotExist' | 'error';
const prisma = new PrismaClient();

interface PlaylistItem {
  id: string;
  name: string;
  images: {
    url: string;
  }[];
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

interface TitleLayoutProps {
  name: string;
  images: {
    url: string;
  }[];
  description: string;
}

interface PlaylistResponse {
  items: PlaylistItem[];
}

interface SongResponse {
  items: SongItem[];
}

async function fetchData2(endpoint: string) {
  const spotifyClient = await getSpotifyClient();
  console.log('HI PLEASE WORK', spotifyClient);
  const resp = await spotifyClient.get(endpoint);
  console.log('HI PLEASE WORK', resp.data.items);
  return resp.data.items;
}

async function fetchData3(endpoint: string) {
  const spotifyClient = await getSpotifyClient();
  console.log('HI PLEASE WORK', spotifyClient);
  const resp = await spotifyClient.get(endpoint);
  console.log('HI PLEASE WORK', resp.data.items);
  return resp.data;
}

async function getPlaylists(): Promise<PlaylistItem[]> {
  // Endpoint reference: https://developer.spotify.com/documentation/web-api/reference/get-current-users-profile
  const response = await fetchData2('/me/playlists?limit=20&offset=0');
  return response;
}

async function getSongs(): Promise<SongItem[]> {
  // Endpoint reference: https://developer.spotify.com/documentation/web-api/reference/get-track
  const response = await fetchData2('/playlists/37i9dQZF1DX8Sz1gsYZdwj/tracks');
  return response;
}

async function getTitle(): Promise<TitleLayoutProps> {
  // Endpoint reference: https://developer.spotify.com/documentation/web-api/reference/get-playlist
  const response = await fetchData3('/playlists/37i9dQZF1DX8Sz1gsYZdwj');
  console.log('title', response);
  return response;
}

interface PageProps {
  listOfPlaylists: PlaylistResponse;
}

interface Note {
  userID: string;
  songID: string;
  playlistID: string;
}

interface NoteReturn {
  songID: string;
  note: string;
}

// const checkNoteExists = async (item: Note): Promise<{ NoteReturn: NoteReturn }> => {
//   "use server"
//   console.log('Note status:', item);
//   try{
//     // Check if the user has already pinned 5 or more artists
//     const count = await prisma.songNotes.count({
//       where: {
//         userID: item.userID,
//         songID: item.songID,
//         playlistID: item.playlistID
//       },
//     });

//     if (count >= 1) {
//       const noteInDB = await prisma.songNotes.findMany({
//         where: {
//           userID: item.userID,
//           songID: item.songID,
//           playlistID: item.playlistID
//         },
//       });
//       return { NoteReturn: { songID: noteInDB.songID, note: noteInDB.note } };
//     } else {
//         return { NoteReturn: { songID: item.songID, note: "" } };
//     }
//   } catch(error) {
//     console.error('An error occurred:', error);
//     return { NoteReturn: { songID: "", note: ""} };
//   }
// };

const Page: FC = async () => {
  const listOfPlaylists = await getPlaylists();
  const listOfSongs = await getSongs();
  const title = await getTitle();
  return (
    <div>
      <Component
        listOfPlaylists={listOfPlaylists}
        listOfSongs={listOfSongs}
        title={title}
      />
    </div>
  );
};

export default Page;
