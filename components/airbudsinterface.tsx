"use client";
import { useState } from 'react';
import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { IconMute, IconAdd, IconArrowDown, IconSend } from '@/components/ui/icons';


const Reply = () => {
    const [reply, setReply] = useState('');
  
    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
        console.log(reply);
        setReply('');
        event.preventDefault(); // Prevent form submission
      }
    };
  
    return (
      <div className="w-full h-full">
        <input
          type="text"
          value={reply}
          onChange={(e) => setReply(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Write a reply..."
          className="w-full h-full p-2 rounded-r-full rounded-l-full border border-gray-300 bg-black text-white placeholder-gray-400"
        />
      </div>
    );
  };
const AirbudsInterface = () => {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center">
        <div className="flex flex-col items-center justify-center w-full px-4 py-2">
            <Image src="/profile-page.webp" alt="Profile" width={40} height={40} className="rounded-full" />
            <div className="mt-2 text-center">
                <h2 className="text-lg font-semibold">Caroline Xin</h2>
                <p className="text-sm text-gray-400">39 minutes ago</p>
            </div>
        </div>
      <div className="flex flex-col items-center mt-6">
        <Image src="/album.jpeg" alt="Album Art" width={300} height={300} className="rounded-lg" />
        <h3 className="text-xl font-bold mt-4">m. A. A. d City </h3>
        <p className="text-sm text-gray-400">Kendrick Lamar</p>
      </div>
      <div className="flex items-center space-x-4 mt-6">
        <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
          <IconMute color="white" size={24} />
        </Button>
        <Button variant="default" size="sm" className="text-white bg-green-600 px-4 py-2 rounded-full">
          <Image src="/spotify-icon.png" alt="Spotify" width={20} height={20} />
          <span className="ml-2">Play on Spotify</span>
        </Button>
        <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
          <IconAdd color='white' size={24}/>
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
      <div className='flex items-center justify-center mt-6'>
        <Reply />
        <div className="flex-shrink-0">
            <IconSend color='white' size={15}/>
        </div>
      </div>
      <div className="flex items-center justify-center mt-6">
        <p className="text-gray-400">SCROLL DOWN </p>
        <IconArrowDown color='white' size={15}/>
      </div>
    </div>
  );
};

export default AirbudsInterface;