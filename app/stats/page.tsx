"use client";

import React from 'react';
import { NavBar } from '@/components/ui/navbar';

interface LinkButtonProps {
  text: string;
  link: string;
}

const LinkButton: React.FC<LinkButtonProps> = ({ text, link }) => (
  <a href={link} className="w-64 h-16">
    <button className="w-full h-full bg-gray-500 text-white rounded hover:bg-gray-400">
      {text}
    </button>
  </a>
);

const LinkButtons: React.FC = () => {
  return (
    <div className="h-screen w-screen flex flex-col">
      <NavBar />
      <div className="flex flex-1 justify-center items-center flex-col space-y-6">
        <div className="text-center">
          <h1 className="text-4xl font-bold">Spotify Stats</h1>
          <p className="text-lg text-gray-600 mt-2">Check out your top tracks, artists, and recently played songs</p>
        </div>
        <div className="flex flex-col items-center space-y-4 mt-8 w-full">
          <LinkButton text="Top Tracks" link="/stats/toptracks" />
          <LinkButton text="Top Artists" link="/stats/topartists" />
          <LinkButton text="Recently Played" link="/stats/recentlyplayed" />
        </div>
      </div>
    </div>
  );
}

export default LinkButtons;

