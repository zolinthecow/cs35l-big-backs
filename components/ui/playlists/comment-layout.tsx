import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { SendIcon } from '../playlisticons';
import { useState, useEffect } from 'react';
import { putCommentIntoDb, getCommentsFromDb } from '@/app/playlists/page';
import { getUserName } from '@/components/data_functions/getUserDetails';

type CommentLayoutProps = {
  username: string;
  time: string;
  comment: string;
};

type Comment = {
  userID: string;
  playlistID: string;
  username: string;
  time: Date;
  comment: string;
};

interface CommentSectionProps {
  playlistID: string;
  commentsFromDb: Comment[];
  userID: string;
}

export function CommentLayout({ username, time, comment }: CommentLayoutProps) {
  return (
    <div className="flex gap-4 p-4 bg-white rounded-lg shadow-sm border border-gray-200">
      <Avatar className="h-10 w-10">
        <AvatarFallback>{username.charAt(0)}</AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <div className="font-semibold text-gray-900">{username}</div>
          <div className="text-sm text-gray-500">{time}</div>
        </div>
        <p className="mt-1 text-gray-700">{comment}</p>
      </div>
    </div>
  );
}

export function CommentSection({
  playlistID,
  commentsFromDb,
  userID,
}: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>(commentsFromDb);
  const [newComment, setNewComment] = useState('');
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const fetchUserName = async () => {
      const name = await getUserName({ userId: userID });
      setUserName(name);
    };

    fetchUserName();
  }, [userID]);

  useEffect(() => {
    const fetchComments = async () => {
      const commentsFromDb = await getCommentsFromDb(playlistID);
      setComments(commentsFromDb);
    };

    fetchComments();
  }, [newComment]);

  const handleAddComment = async (event: React.FormEvent) => {
    event.preventDefault(); // Prevent the form from refreshing the page

    const newCommentData: Comment = {
      userID: userID,
      playlistID: playlistID,
      username: userName,
      time: new Date(),
      comment: newComment,
    };

    await putCommentIntoDb(
      userID,
      playlistID,
      newComment,
      new Date(),
      userName,
    );
    setComments([newCommentData, ...comments]);
    setNewComment('');
  };

  return (
    <div className="space-y-4">
      <form
        onSubmit={handleAddComment}
        className="flex gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200"
      >
        <Input
          className="flex-1 p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
          placeholder="Type your message..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <Button
          size="icon"
          variant="ghost"
          onClick={handleAddComment}
          className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"
        >
          <SendIcon className="h-5 w-5" />
          <span className="sr-only">Send message</span>
        </Button>
      </form>
      {comments.map((comment, index) => (
        <CommentLayout
          key={index}
          username={comment.username}
          time={comment.time.toDateString()}
          comment={comment.comment}
        />
      ))}
    </div>
  );
}
