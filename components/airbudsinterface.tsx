'use client';
import React, { ChangeEvent, KeyboardEvent, FC, useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { IconMute, IconAdd, IconSend } from '@/components/ui/icons';
import Link from 'next/link';

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

const Reply = () => {
  const [reply, setReply] = useState('');

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      sendReply();
      event.preventDefault(); // Prevent form submission
    }
  };

  const sendReply = () => {
    console.log(reply);
    setReply('');
  };

  return (
    <div className="w-full flex items-center mt-4">
      <ReplyInput
        value={reply}
        onChange={(e) => setReply(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <SendButton onClick={sendReply} />
    </div>
  );
};

interface AirbudsInterfaceProps {
  profileImage: string;
  profileName: string;
  profileTime: string;
  albumImage: string;
  songTitle: string;
  songArtist: string;
  songLink: string;
}

const AirbudsInterface: FC<AirbudsInterfaceProps> = ({
  profileImage,
  profileName,
  profileTime,
  albumImage,
  songTitle,
  songArtist,
  songLink,
}) => {
  return (
    <div className="flex flex-col items-center justify-between h-full w-full p-4 snap-center">
      <div className="flex flex-col items-center mt-4">
        <img
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
        <img
          src={albumImage}
          alt="Album Art"
          className="w-full max-w-xs rounded-lg"
        />
        <h3 className="text-xl font-bold mt-4 text-center">{songTitle}</h3>
        <p className="text-sm text-gray-400">{songArtist}</p>
      </div>
      <div className="flex items-center space-x-4 justify-center">
        <Button
          variant="ghost"
          size="sm"
          className="text-gray-400 hover:text-white"
        >
          <IconMute color="black" size={24} />
        </Button>
        <Link href={songLink}>
          <Button
            variant="default"
            size="sm"
            className="text-white bg-green-600 px-4 py-2 rounded-full flex items-center"
          >
            <Image
              src="/spotify-icon.png"
              alt="Spotify"
              width={20}
              height={20}
            />
            <span className="ml-2">Play on Spotify</span>
          </Button>
        </Link>
        <Button
          variant="ghost"
          size="sm"
          className="text-gray-400 hover:text-white"
        >
          <IconAdd color="black" size={24} />
        </Button>
      </div>
      <div className="flex justify-around w-full mt-6 px-8">
        <Button
          variant="ghost"
          size="sm"
          className="text-gray-400 hover:text-white"
        >
          <span style={{ fontSize: '24px' }}>🔥</span>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="text-gray-400 hover:text-white"
        >
          <span style={{ fontSize: '24px' }}>❤️</span>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="text-gray-400 hover:text-white"
        >
          <span style={{ fontSize: '24px' }}>🙌</span>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="text-gray-400 hover:text-white"
        >
          <span style={{ fontSize: '24px' }}>😍</span>
        </Button>
      </div>
      <Reply />
    </div>
  );
};

interface DataProps {
  key: string;
  profileImage: string;
  profileName: string;
  profileTime: string;
  albumImage: string;
  songTitle: string;
  songArtist: string;
  songLink: string;
}

interface SnappingScrollContainerProps {
  items: DataProps[];
}

const SnappingScrollContainer: React.FC<SnappingScrollContainerProps> = ({
  items,
}) => {
  return (
    <div className="h-full overflow-y-scroll snap-y snap-mandatory scrollbar-hide border border-gray-100 rounded-md">
      {items.map((item) => (
        <AirbudsInterface
          key={item.key}
          profileImage={item.profileImage}
          profileName={item.profileName}
          profileTime={item.profileTime}
          albumImage={item.albumImage}
          songTitle={item.songTitle}
          songArtist={item.songArtist}
          songLink={item.songLink}
        />
      ))}
    </div>
  );
};
export default SnappingScrollContainer;
