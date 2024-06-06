"use server";
import { PrismaClient } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

const prisma = new PrismaClient();
//functions to pin items
interface ArtistItem {
    id: string;
    name: string;
    images: { url: string }[];
    external_urls: { spotify: string };
  }
  
  interface TrackItem {
    id: string;
    name: string;
    external_urls: { spotify: string };
    artists: { name: string }[];
    album: { images: { url: string }[] };
  }
  
  interface PlaylistItem {
    id: string;
    images: { url: string }[];
    external_urls: { spotify: string };
    name: string;
    tracks: { total: number };
  }

type PinStatus = 'success' | 'duplicate' | 'limitReached' | 'error';

export const handlePinClickArtist = async (
  item: ArtistItem,
): Promise<{ status: PinStatus }> => {
  'use server';
  console.log('Pinned artist:', item);

  // Check if the user has already pinned 5 or more artists
  const count = await prisma.artistPinned.count({
    where: {
      userId: '23',
    },
  });

  if (count >= 5) {
    return { status: 'limitReached' };
  }

  try {
    const newRecord = await prisma.artistPinned.create({
      data: {
        userId: '23',
        artistID: item.id,
        artistName: item.name,
        artistImageLink: item.images[0].url,
        artistLink: item.external_urls.spotify,
      },
    });
    return { status: 'success' };
  } catch (error) {
    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === 'P2002'
    ) {
      return { status: 'duplicate' };
    } else {
      console.error('An error occurred:', error);
      return { status: 'error' };
    }
  }
};

export const handlePinClickTrack = async (
  item: TrackItem,
): Promise<{ status: PinStatus }> => {
  'use server';
  console.log('Pinned track:', item);

  // Check if the user has already pinned 5 or more tracks
  const count = await prisma.songPinned.count({
    where: {
      userId: '23',
    },
  });

  if (count >= 5) {
    return { status: 'limitReached' };
  }

  try {
    const newRecord = await prisma.songPinned.create({
      data: {
        userId: '23',
        songID: item.id,
        songName: item.name,
        artistName: item.artists[0].name,
        songImageLink: item.album.images[0].url,
        songLink: item.external_urls.spotify,
      },
    });
    return { status: 'success' };
  } catch (error) {
    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === 'P2002'
    ) {
      return { status: 'duplicate' };
    } else {
      console.error('An error occurred:', error);
      return { status: 'error' };
    }
  }
};

export const handlePinClickPlaylist = async (
  item: PlaylistItem,
): Promise<{ status: PinStatus }> => {
  'use server';
  console.log('Pinned playlist:', item);

  // Check if the user has already pinned 5 or more playlists
  const count = await prisma.playlistPinned.count({
    where: {
      userId: '23',
    },
  });

  if (count >= 3) {
    return { status: 'limitReached' };
  }

  try {
    const newRecord = await prisma.playlistPinned.create({
      data: {
        userId: '23',
        playlistID: item.id,
        playlistName: item.name,
        playlistImageLink: item.images[0].url,
        playlistLink: item.external_urls.spotify,
        numberOfTracks: item.tracks.total,
      },
    });
    return { status: 'success' };
  } catch (error) {
    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === 'P2002'
    ) {
      return { status: 'duplicate' };
    } else {
      console.error('An error occurred:', error);
      return { status: 'error' };
    }
  }
};