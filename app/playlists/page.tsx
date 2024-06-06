'use server';

import getSpotifyClient from '@/lib/spotify';
import { ListofPlaylistsLayout } from '@/components/ui/playlists/playlists-list-layout';
import Component from '@/components/playlists_ui/playlist_ui';
import React, { FC } from 'react';
import { title } from 'process';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { PrismaClient } from '@prisma/client';
import { CommentLayout } from '@/components/ui/playlists/comment-layout';
import { CommentSection } from '@/components/ui/playlists/comment-layout';
import { Odibee_Sans } from 'next/font/google';

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

type Comment = {
  userID: string;
  playlistID: string;
  username: string;
  time: string;
  comment: string;
};

interface CommentReturn {
  // For putting comment into database
  userID: string;
  username: string;
  playlistID: string;
  comment: string;
  time: string;
}

// Put comments inside a database
export const putCommentIntoDb = async (
  item: Comment,
): Promise<{ CommentReturn: CommentReturn }> => {
  'use server';
  console.log('Putting comment into database...');
  try {
    // Put comment into database
    const commentInDB = await prisma.comments.create({
      data: {
        userID: item.userID,
        username: item.username, // Replace with the actual username
        playlistID: item.playlistID,
        comment: item.comment,
        time: new Date().toLocaleString(),
      },
    });
    return {
      CommentReturn: {
        userID: commentInDB.userID,
        username: commentInDB.username,
        playlistID: commentInDB.playlistID,
        comment: commentInDB.comment,
        time: commentInDB.time,
      },
    };
  } catch (error) {
    console.error('An error occurred:', error);
    return {
      CommentReturn: {
        userID: '',
        username: '',
        playlistID: '',
        comment: '',
        time: '',
      },
    };
  }
};

export const getCommentsFromDb = async (
  playlistID: string,
): Promise<CommentReturn[]> => {
  'use server';
  console.log('Fetching comment from database...');
  try {
    // Get comment from database
    const commentsFromDB = await prisma.comments.findMany({
      where: {
        playlistID: playlistID,
      },
    });

    console.log('Comments from db: ', commentsFromDB);
    return commentsFromDB.map((comment) => ({
      userID: comment.userID,
      username: comment.username,
      playlistID: comment.playlistID,
      comment: comment.comment,
      time: comment.time.toLocaleString(), // Convert Date object to string
    }));
  } catch (error) {
    console.error('An error occurred: ', error);
    return [];
  }
};

const Page: FC = async () => {
  const listOfPlaylists = await getPlaylists();
  const listOfSongs = await getSongs();
  const title = await getTitle();
  const commentsFromDb = await getCommentsFromDb('37i9dQZF1EVHGWrwldPRtj');
  return (
    <div className="h-100vh overflow-y-hidden fixed">
      <div className="h-screen overflow-hidden">
        <Component
          listOfPlaylists={listOfPlaylists}
          listOfSongs={listOfSongs}
          title={title}
          commentsFromDb={commentsFromDb}
        />
      </div>
    </div>
  );
};

export default Page;
