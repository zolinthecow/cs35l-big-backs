'use client';
import React, { ChangeEvent, KeyboardEvent, FC, useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { IconMute, IconAdd, IconSend } from '@/components/ui/icons';
import Link from 'next/link';
import sendSBMessage from '@/actions/sendSBMessage';

interface ReplyInputProps {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void;
}

const ReplyInput: FC<ReplyInputProps> = ({ value, onChange, onKeyDown }) => (
  <input
    type="text"
    value={value}
    onChange={onChange}
    onKeyDown={onKeyDown}
    placeholder="Write a reply..."
    className="flex-1 p-2 rounded-l-full rounded-r-full border border-gray-300 bg-white text-black placeholder-gray-400"
  />
);

interface SendButtonProps {
  onClick: () => void;
}

const SendButton: FC<SendButtonProps> = ({ onClick }) => (
  <Button
    variant="ghost"
    size="sm"
    className="p-2 bg-gray-100 text-black hover:bg-black hover:text-white"
    onClick={onClick}
  >
    <IconSend color="black" size={20} />
  </Button>
);

const Reply: FC<{ sendReply: (reply: string) => Promise<void> }> = ({
  sendReply,
}) => {
  const [reply, setReply] = useState('');

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevent form submission
      sendReply(reply);
    }
  };

  return (
    <div className="w-full flex items-center mt-4">
      <ReplyInput
        value={reply}
        onChange={(e) => setReply(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <SendButton onClick={() => sendReply(reply)} />
    </div>
  );
};

interface AirbudsInterfaceProps {
  profileUserId: string;
  profileImage: string;
  profileName: string;
  profileTime: string;
  albumImage: string;
  songTitle: string;
  songArtist: string;
  songLink: string;
}

const AirbudsInterface: FC<AirbudsInterfaceProps> = ({
  profileUserId,
  profileImage,
  profileName,
  profileTime,
  albumImage,
  songTitle,
  songArtist,
  songLink,
}) => {
  const sendReply = async (reply: string) => {
    await sendSBMessage(profileUserId, reply);
  };

  const EmojiButton: FC<{ emoji: string }> = ({ emoji }) => {
    return (
      <Button
        variant="ghost"
        size="sm"
        className="text-gray-400 hover:text-white"
        formAction={() => sendReply(emoji)}
      >
        <span style={{ fontSize: '24px' }}>{emoji}</span>
      </Button>
    );
  };

  const emojis = ['🔥', '❤️', '🙌', '😍'];

  return (
    <div className="flex flex-col items-center justify-between h-full w-full p-4 snap-center">
      <div className="flex flex-col items-center mt-4">
        <Image
          src={profileImage}
          alt="Profile"
          width={50}
          height={50}
          className="rounded-full"
        />
        <div className="mt-2 text-center">
          <h2 className="text-lg font-semibold">{profileName}</h2>
          <p className="text-sm text-gray-400">{profileTime}</p>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <Image
          src={albumImage}
          alt="Album Art"
          width={300} // Initial width
          height={300} // Initial height
          layout="intrinsic"
          className="rounded-lg"
        />
        <h3 className="text-xl font-bold mt-4 text-center">{songTitle}</h3>
        <p className="text-sm text-gray-400">{songArtist}</p>
      </div>
      <div className="flex items-center space-x-4 justify-center">
        <Link href={songLink}>
          <Button
            variant="default"
            size="sm"
            className="text-white bg-green-600 px-4 py-2 rounded-full flex items-center"
          >
            <Image
              src="https://static-00.iconduck.com/assets.00/spotify-icon-2048x2048-n3imyp8e.png"
              alt="Spotify"
              width={20}
              height={20}
            />
            <span className="ml-2">Play on Spotify</span>
          </Button>
        </Link>
      </div>
    </div>
  );
};

export interface AirbudsElement {
  profileUserId: string;
  profileImage: string;
  profileName: string;
  profileTime: string;
  albumImage: string;
  songTitle: string;
  songArtist: string;
  songLink: string;
}

const SnappingScrollContainer: React.FC<{ airbudsData: AirbudsElement[] }> = ({
  airbudsData,
}) => {
  return (
    <div className="h-full overflow-y-scroll snap-y snap-mandatory scrollbar-hide border border-gray-100 rounded-md">
      {airbudsData.map((airbudsData) => (
        <AirbudsInterface
          key={airbudsData.profileUserId}
          profileUserId={airbudsData.profileUserId}
          profileImage={airbudsData.profileImage}
          profileName={airbudsData.profileName}
          profileTime={airbudsData.profileTime}
          albumImage={airbudsData.albumImage}
          songTitle={airbudsData.songTitle}
          songArtist={airbudsData.songArtist}
          songLink={airbudsData.songLink}
        />
      ))}
    </div>
  );
};
export default SnappingScrollContainer;
