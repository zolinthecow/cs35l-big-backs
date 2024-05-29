"use client";

import React, { useState } from 'react';
import { NavBar } from '@/components/ui/navbar';
import { mockArtistData } from '@/components/mock_data/artist_data';
import { mockSongData } from '@/components/mock_data/song_data';
import Link from 'next/link';

const SpotifyStatsPage: React.FC = () => {
  const [currentView, setCurrentView] = useState<'tracks' | 'artists' | 'recent'>('tracks');
  const [timeRange, setTimeRange] = useState<'short_term' | 'medium_term' | 'long_term'>('short_term');

  const filteredSongs = mockSongData.slice(0, 10); 
  const filteredArtists = mockArtistData.slice(0, 5); 

  return (
    <div className="h-screen w-screen flex flex-col">
      <NavBar />
      <div className="flex flex-1 overflow-hidden">
        <div className="h-full flex-1 overflow-y-auto border-t border-gray-100 border-b rounded bg-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pl-10">
            <div className="flex items-center justify-center border-b-2 border-gray-100 py-6 md:justify-center md:space-x-10">
              <nav className="hidden md:flex space-x-10">
                <button
                  className={`text-base font-medium text-gray-500 hover:text-gray-900 ${currentView === 'tracks' ? 'text-black' : ''}`}
                  onClick={() => setCurrentView('tracks')}
                >
                  Top Tracks
                </button>
                <button>
                  <a className="text-base font-medium text-gray-500 hover:text-gray-900" href="/stats/topartists">
                    Top Artists
                  </a>
                </button>
                <button>
                  <a className="text-base font-medium text-gray-500 hover:text-gray-900" href="/stats/recentlyplayed">
                    Recently Played
                  </a>
                </button>
              </nav>
            </div>
          </div>
          <div className="py-10">
            <header className="text-center">
              <h1 className="text-4xl font-bold leading-tight text-gray-900">
                {currentView === 'tracks' && 'Top Tracks'}
              </h1>
            </header>
            <div className="flex justify-center space-x-4 my-4">
              <button
                className={`px-4 py-2 ${timeRange === 'short_term' ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-700'}`}
                onClick={() => setTimeRange('short_term')}
              >
                Last 4 weeks
              </button>
              <button
                className={`px-4 py-2 ${timeRange === 'medium_term' ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-700'}`}
                onClick={() => setTimeRange('medium_term')}
              >
                Last 6 months
              </button>
              <button
                className={`px-4 py-2 ${timeRange === 'long_term' ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-700'}`}
                onClick={() => setTimeRange('long_term')}
              >
                Last 12 months
              </button>
            </div>
            <div className="mt-12 grid grid-cols-1 gap-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pl-10">
              {currentView === 'tracks' && filteredSongs.map((song, index) => (
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

export default SpotifyStatsPage;
