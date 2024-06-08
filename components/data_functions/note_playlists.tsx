'use server';
import prisma from '@/prisma';

interface Note {
  userID: string;
  songID: string;
  playlistID: string;
}

interface NoteReturn {
  songID: string;
  note: string;
}

interface submitNote {
  userID: string;
  songID: string;
  playlistID: string;
  note: string;
}

type noteStatus = 'success' | 'error';

export const checkNoteExists = async (item: Note): Promise<NoteReturn> => {
  'use server';
  console.log('Note status:', item);
  try {
    // Check if the user has a comment
    const count = await prisma.songNotes.count({
      where: {
        userID: item.userID,
        songID: item.songID,
        playlistID: item.playlistID,
      },
    });

    if (count >= 1) {
      const noteInDB = await prisma.songNotes.findMany({
        where: {
          userID: item.userID,
          songID: item.songID,
          playlistID: item.playlistID,
        },
      });
      return { songID: noteInDB[0].songID, note: noteInDB[0].note };
    } else {
      return { songID: item.songID, note: '' };
    }
  } catch (error) {
    console.error('An error occurred:', error);
    return { songID: '', note: '' };
  }
};

export const submitNote = async (
  item: submitNote,
): Promise<{ status: noteStatus }> => {
  'use server';
  try {
    const noteInDB = await prisma.songNotes.upsert({
      where: {
        userID_playlistID_songID: {
          userID: item.userID,
          songID: item.songID,
          playlistID: item.playlistID,
        },
      },
      update: {
        note: item.note,
      },
      create: {
        userID: item.userID,
        commName: 'test',
        playlistID: item.playlistID,
        songID: item.songID,
        note: item.note,
      },
    });
    return { status: 'success' };
  } catch (error) {
    console.error('An error occurred:', error);
    return { status: 'error' };
  }
};
