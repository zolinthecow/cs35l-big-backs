"use client";

import React from 'react';
import { NavBar } from '@/components/navbar';

interface LinkButtonProps {
  text: string;
  link: string;
}

const LinkButton: React.FC<LinkButtonProps> = ({ text, link }) => (
  <a href={link} className="w-64 h-16">
    <button className="w-full h-full bg-gray-600 text-white rounded-lg shadow-md hover:bg-gray-400 transition duration-300 ease-in-out">
      {text}
    </button>
  </a>
);

const LinkButtons: React.FC = () => {
  return (
    <div className="h-screen w-screen flex flex-col bg-gray-50">
      <NavBar />
      <div className="flex flex-1 justify-center items-center flex-col space-y-8">
        <div className="text-center">
          <h1 className="text-5xl font-extrabold text-gray-800">Spotify Stats</h1>
          <p className="text-xl text-gray-500 mt-2">Check out your top tracks, artists, and recently played songs :D</p>
        </div>
        <div className="flex flex-col items-center space-y-6 mt-10 w-full">
          <LinkButton text="Top Tracks" link="/stats/toptracks" />
          <LinkButton text="Top Artists" link="/stats/topartists" />
          <LinkButton text="Recently Played" link="/stats/recentlyplayed" />
        </div>
      </div>
    </div>
  );
}

export default LinkButtons;
