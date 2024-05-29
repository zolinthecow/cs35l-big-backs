"use client";

import React, { useState } from 'react';
import { NavBar } from '@/components/ui/navbar';
import { mockSongData } from '@/components/mock_data/song_data';

const RecentlyPlayedPage: React.FC = () => {
  const [currentView, setCurrentView] = useState<'tracks' | 'artists' | 'recent'>('recent');
  const [timeRange, setTimeRange] = useState<'short_term' | 'medium_term' | 'long_term'>('short_term');

  const filteredSongs = mockSongData.slice(0, 10); 

  return (
    <div className="h-screen w-screen flex flex-col">
      <NavBar />
      <div className="flex flex-1 overflow-hidden">
        <div className="h-full flex-1 overflow-y-auto border-t border-gray-100 border-b rounded bg-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center border-b-2 border-gray-100 py-6 md:justify-center md:space-x-10">
              <nav className="hidden md:flex space-x-10">
                <button>
                  <a className="text-base font-medium text-gray-500 hover:text-gray-900" href="/stats/toptracks">
                    Top Tracks
                  </a>
                </button>
                <button>
                  <a className="text-base font-medium text-gray-500 hover:text-gray-900" href="/stats/topartists">
                    Top Artists
                  </a>
                </button>
                <button
                  className={`text-base font-medium text-gray-500 hover:text-gray-900 ${currentView === 'recent' ? 'text-black' : ''}`}
                  onClick={() => setCurrentView('recent')}
                >
                  Recently Played
                </button>
              </nav>
            </div>
          </div>
          <div className="py-10">
            <header className="text-center">
              <h1 className="text-4xl font-bold leading-tight text-gray-900">
                {currentView === 'recent' && 'Recently Played'}
              </h1>
            </header>
            <div className="mt-12 grid grid-cols-1 gap-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {currentView === 'recent' && filteredSongs.map((song, index) => (
                <div key={song.id} className="flex items-center space-x-4">
                  <span className="text-lg font-medium">{index + 1}.</span>
                  <img src={song.album_url} alt={song.title} width="50" height="50" />
                  <div>
                    <div className="font-medium text-lg">{song.title}</div>
                    <div className="text-sm text-gray-500">{song.artist}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecentlyPlayedPage;
