"use client";
import React, { ChangeEvent, KeyboardEvent, FC, useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { IconMute, IconAdd, IconArrowDown, IconSend } from '@/components/ui/icons';


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
    className="flex-1 p-2 rounded-l-full rounded-r-full border border-gray-300 bg-black text-white placeholder-gray-400"
  />
);

interface SendButtonProps {
  onClick: () => void;
}

const SendButton: FC<SendButtonProps> = ({ onClick }) => (
    <Button
      variant="ghost"
      size='sm'
      className="p-2 bg-black text-white hover:bg-black hover:text-white"
      onClick={onClick}
    >
      <IconSend color='white' size={20} />
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
        <ReplyInput value={reply} onChange={(e) => setReply(e.target.value)} onKeyDown={handleKeyDown} />
        <SendButton onClick={sendReply} />
      </div>
    );
};

interface AirbudsInterfaceProps {
    profileImage: string;
    profileName: string;
    profileTime: string;
    albumImage: string;
    albumTitle: string;
    albumArtist: string;
  }

  
  const AirbudsInterface: FC<AirbudsInterfaceProps> = ({
    profileImage,
    profileName,
    profileTime,
    albumImage,
    albumTitle,
    albumArtist,
  }) => {
    return (
      <div className="h-full bg-black text-white flex flex-col items-center overflow-hidden">
        <div className="h-full w-full max-w-md flex flex-col justify-between overflow-hidden">
          <div className="flex flex-col items-center justify-center w-full px-4 py-2">
            <Image src={profileImage} alt="Profile" width={40} height={40} className="rounded-full" />
            <div className="mt-2 text-center">
              <h2 className="text-lg font-semibold">{profileName}</h2>
              <p className="text-sm text-gray-400">{profileTime}</p>
            </div>
          </div>
          <div className="flex flex-col items-center mt-6 flex-grow">
            <Image src={albumImage} alt="Album Art" width={500} height={500} className="rounded-lg" />
            <h3 className="text-xl font-bold mt-4">{albumTitle}</h3>
            <p className="text-sm text-gray-400">{albumArtist}</p>
          </div>
          <div className="flex items-center space-x-4 mt-6 justify-center">
            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
              <IconMute color="white" size={24} />
            </Button>
            <Button variant="default" size="sm" className="text-white bg-green-600 px-4 py-2 rounded-full">
              <Image src="/spotify-icon.png" alt="Spotify" width={20} height={20} />
              <span className="ml-2">Play on Spotify</span>
            </Button>
            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
              <IconAdd color='white' size={24} />
            </Button>
          </div>
          <div className="flex justify-around w-full mt-6 px-8">
            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
              <span style={{ fontSize: '24px' }}>🔥</span>
            </Button>
            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
              <span style={{ fontSize: '24px' }}>❤️</span>
            </Button>
            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
              <span style={{ fontSize: '24px' }}>🙌</span>
            </Button>
            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
              <span style={{ fontSize: '24px' }}>😍</span>
            </Button>
          </div>
        <Reply />
        <div className="flex items-center justify-center mt-6">
          <p className="text-gray-400">SCROLL DOWN</p>
          <IconArrowDown color='white' size={15} />
        </div>
      </div>
    </div>
  );
};

export default AirbudsInterface;
