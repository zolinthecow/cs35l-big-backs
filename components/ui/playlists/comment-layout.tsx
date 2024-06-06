import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useState } from 'react';

type CommentLayoutProps = {
  username: string;
  time: string;
  comment: string;
};

type Comment = {
  username: string;
  time: string;
  comment: string;
};

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

export function CommentSection() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');

  const handleAddComment = () => {
    const newCommentData: Comment = {
      username: 'Current User', // Replace with the actual username
      time: new Date().toLocaleString(),
      comment: newComment,
    };
    setComments([newCommentData, ...comments]);
    setNewComment('');
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <div className="border-t px-4 py-3 border-gray-300 flex-1">
          <div className="flex items-center gap-2">
            <Input
              className="flex-1"
              placeholder="Type your message..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <Button size="icon" variant="ghost" onClick={handleAddComment}>
              <span className="sr-only">Send message</span>
            </Button>
          </div>
        </div>
      </div>
      {comments.map((comment, index) => (
        <CommentLayout
          key={index}
          username={comment.username}
          time={comment.time}
          comment={comment.comment}
        />
      ))}
    </div>
  );
}

// setNewComment, handleAddComment
