import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { SendIcon } from '../playlisticons';
import { useState, useEffect } from 'react';
import { putCommentIntoDb, getCommentsFromDb } from '@/app/playlists/page';

type CommentLayoutProps = {
  username: string;
  time: string;
  comment: string;
};

type Comment = {
  userID: string;
  playlistID: string;
  username: string;
  time: string;
  comment: string;
};

interface CommentReturn {
  userID: string;
  username: string;
  playlistID: string;
  comment: string;
  time: string;
}

interface CommentSectionProps {
  playlistID: string;
  commentsFromDb: CommentReturn[];
}

export function CommentLayout({ username, time, comment }: CommentLayoutProps) {
  return (
    <div className="flex gap-4">
      <Avatar className="h-10 w-10">
        <AvatarImage alt={username} src="/placeholder-avatar.jpg" />
        <AvatarFallback>{username[0]}</AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <div className="font-medium text-gray-900">{username}</div>
          <div className="text-sm text-gray-600">{time}</div>
        </div>
        <p className="text-gray-600">{comment}</p>
      </div>
    </div>
  );
}

export function CommentSection({
  playlistID,
  commentsFromDb,
}: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');

  // Get comments from database
  const handleAddComment = async () => {
    const newCommentData: Comment = {
      userID: 'Current User ID', // Replace with the actual user ID
      playlistID: playlistID,
      username: 'Current', // Replace with the actual username
      time: new Date().toLocaleString(),
      comment: newComment,
    };
    // Add comment to the database
    await putCommentIntoDb(newCommentData);
    // Add comment to local state
    setComments([newCommentData, ...comments]);
    setNewComment('');
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <div className="border-t px-4 py-3 border-gray-300 flex-1">
          <div className="flex items-center gap-4">
            <Input
              className="flex-1"
              placeholder="Type your message..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <Button size="icon" variant="ghost" onClick={handleAddComment}>
              <SendIcon className="h-5 w-5 text-gray-500" />
              <span className="sr-only">Send message</span>
            </Button>
          </div>
        </div>
      </div>
      {comments.map(
        (
          comment,
          index, // Fetch from database, pass in array of comments from database
        ) => (
          <CommentLayout
            key={index}
            username={comment.username}
            time={comment.time}
            comment={comment.comment}
          />
        ),
      )}
      {commentsFromDb.map(
        (
          comment,
          index, // Fetch from database, pass in array of comments from database
        ) => (
          <CommentLayout
            key={index}
            username={comment.username}
            time={comment.time}
            comment={comment.comment}
          />
        ),
      )}
    </div>
  );
}
