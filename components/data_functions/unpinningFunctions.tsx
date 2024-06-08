'use server';

import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import prisma from '@/prisma';

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
type UnpinStatus = 'success' | 'notFound' | 'error';

// Unpin artist function
export const handleUnpinClickArtist = async (
  userId: string,
  artistId: string,
): Promise<{ status: UnpinStatus }> => {
  'use server';
  console.log('Unpinned artist:', artistId);

  try {
    const deletedRecord = await prisma.artistPinned.deleteMany({
      where: {
        userId,
        artistID: artistId,
      },
    });

    if (deletedRecord.count === 0) {
      return { status: 'notFound' };
    }

    return { status: 'success' };
  } catch (error) {
    console.error('An error occurred:', error);
    return { status: 'error' };
  }
};

// Unpin track function
export const handleUnpinClickTrack = async (
  userId: string,
  trackId: string,
): Promise<{ status: UnpinStatus }> => {
  'use server';
  console.log('Unpinned track:', trackId);

  try {
    const deletedRecord = await prisma.songPinned.deleteMany({
      where: {
        userId,
        songID: trackId,
      },
    });

    if (deletedRecord.count === 0) {
      return { status: 'notFound' };
    }

    return { status: 'success' };
  } catch (error) {
    console.error('An error occurred:', error);
    return { status: 'error' };
  }
};

// Unpin playlist function
export const handleUnpinClickPlaylist = async (
  userId: string,
  playlistId: string,
): Promise<{ status: UnpinStatus }> => {
  'use server';
  console.log('Unpinned playlist:', playlistId);

  try {
    const deletedRecord = await prisma.playlistPinned.deleteMany({
      where: {
        userId,
        playlistID: playlistId,
      },
    });

    if (deletedRecord.count === 0) {
      return { status: 'notFound' };
    }

    return { status: 'success' };
  } catch (error) {
    console.error('An error occurred:', error);
    return { status: 'error' };
  }
};
