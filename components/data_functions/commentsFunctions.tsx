'use server';
import prisma from '@/prisma';

interface CommentReturn {
  userID: string;
  playlistID: string;
  username: string;
  comment: string;
  time: Date;
}

interface Note {
  userID: string;
  songID: string;
  playlistID: string;
}

// Put comments inside a database
export const putCommentIntoDb = async (
  userID: string,
  playlistID: string,
  newComment: string,
  p0: Date,
  userName: string,
): Promise<void> => {
  'use server';
  console.log('Putting comment into database...');
  try {
    // Put comment into database
    await prisma.comments.create({
      data: {
        userID: userID,
        userName: userName, // Assuming username is a string
        playlistID: playlistID,
        comment: newComment,
        time: p0,
      },
    });
  } catch (error) {
    console.error('An error occurred:', error);
    throw error; // Throw the error so it can be caught and handled by the calling code
  }
};

export const getCommentsFromDb = async (
  playlistID: string,
): Promise<CommentReturn[]> => {
  'use server';
  console.log('Fetching comments from database...');
  try {
    // Get comments from database
    const commentsFromDB = await prisma.comments.findMany({
      where: {
        playlistID: playlistID,
      },
    });

    console.log('Comments from db: ', commentsFromDB);
    return commentsFromDB.map((comment) => ({
      userID: comment.userID,
      playlistID: comment.playlistID,
      username: comment.userName,
      comment: comment.comment,
      time: comment.time, // Assuming time is a Date object
    }));
  } catch (error) {
    console.error('An error occurred:', error);
    return [];
  }
};
