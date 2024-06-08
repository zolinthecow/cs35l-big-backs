'use server';
import prisma from '@/prisma';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { getSession } from '@auth0/nextjs-auth0';

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
  const session = await getSession();
  const userID = session?.user?.sub;

  // Check if the user has already pinned 5 or more artists
  const count = await prisma.artistPinned.count({
    where: {
      userId: userID,
    },
  });

  if (count >= 5) {
    return { status: 'limitReached' };
  }

  try {
    const newRecord = await prisma.artistPinned.create({
      data: {
        userId: userID,
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
  const session = await getSession();
  const userID = session?.user?.sub;
  console.log('Pinned track:', item);

  // Check if the user has already pinned 5 or more tracks
  const count = await prisma.songPinned.count({
    where: {
      userId: userID,
    },
  });

  if (count >= 5) {
    return { status: 'limitReached' };
  }

  try {
    const newRecord = await prisma.songPinned.create({
      data: {
        userId: userID,
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
  const session = await getSession();
  const userID = session?.user?.sub;

  // Check if the user has already pinned 5 or more playlists
  const count = await prisma.playlistPinned.count({
    where: {
      userId: userID,
    },
  });

  if (count >= 3) {
    return { status: 'limitReached' };
  }

  try {
    const newRecord = await prisma.playlistPinned.create({
      data: {
        userId: userID,
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

interface pinnedPlaylist {
  name: string;
  playlistImage: string;
  playlistURL: string;
  playlistID: string;
  numberOfSongs: number;
}

interface pinnedArtist {
  name: string;
  artistImage: string;
  artistURL: string;
}

interface pinnedSong {
  name: string;
  artistName: string;
  songImage: string;
  songURL: string;
}

export async function getPinnedPlaylists(
  UserID: string,
): Promise<pinnedPlaylist[]> {
  const pinnedPlaylists = await prisma.playlistPinned.findMany({
    where: { userId: UserID },
  });

  return pinnedPlaylists.map((playlist) => ({
    name: playlist.playlistName,
    playlistImage: playlist.playlistImageLink,
    playlistURL: playlist.playlistLink,
    numberOfSongs: playlist.numberOfTracks,
    playlistID: playlist.playlistID,
  }));
}

export async function getPinnedArtist(UserID: string): Promise<pinnedArtist[]> {
  const pinnedArtist = await prisma.artistPinned.findMany({
    where: { userId: UserID },
  });

  return pinnedArtist.map((artist) => ({
    name: artist.artistName,
    artistImage: artist.artistImageLink,
    artistURL: artist.artistLink,
  }));
}

export async function getPinnedSong(UserID: string): Promise<pinnedSong[]> {
  const pinnedSongs = await prisma.songPinned.findMany({
    where: { userId: UserID },
  });

  return pinnedSongs.map((song) => ({
    name: song.songName,
    artistName: song.artistName,
    songImage: song.songImageLink,
    songURL: song.songLink,
  }));
}
