'use client';

import React, { useState, useEffect } from 'react';
import { NavBar } from '@/components/navbar';
import getSpotifyClient from '@/lib/spotify';

async function fetchData(endpoint: string) {
  const spotifyClient = await getSpotifyClient();
  const resp = await spotifyClient.get(endpoint);
  return resp.data.items;
}

interface Artist {
  name: string;
  images: { url: string }[];
  external_urls: {
    spotify: string;
  };
}

async function getTopArtists(timeRange: string): Promise<Artist[]> {
  try {
    const response = await fetchData(
      `/me/top/artists?time_range=${timeRange}&limit=50`,
    );
    return response;
  } catch (error) {
    console.error('Error fetching top artists:', error);
    return [];
  }
}

export default function Page() {
  const [topArtists, setTopArtists] = useState<Artist[] | null>(null);
  const [currentView, setCurrentView] = useState<
    'tracks' | 'artists' | 'recent'
  >('artists');
  const [timeRange, setTimeRange] = useState<
    'short_term' | 'medium_term' | 'long_term'
  >('short_term');

  useEffect(() => {
    getTopArtists(timeRange).then(setTopArtists);
  }, [timeRange]);

  return (
    <div className="h-screen w-screen flex flex-col bg-gray-50">
      <NavBar />
      <div className="flex flex-1 overflow-hidden">
        <div className="h-full flex-1 overflow-y-auto border-t border-gray-200 rounded bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pl-10">
            <div className="flex items-center justify-center border-b-2 border-gray-200 py-6 md:justify-center md:space-x-10">
              <nav className="hidden md:flex space-x-10">
                <button>
                  <a
                    className="text-base font-medium text-gray-500 hover:text-gray-900"
                    href="/stats/toptracks"
                  >
                    Top Tracks
                  </a>
                </button>
                <button
                  className={`text-base font-medium ${currentView === 'artists' ? 'text-gray-900' : 'text-gray-500 hover:text-gray-900'}`}
                  onClick={() => setCurrentView('artists')}
                >
                  Top Artists
                </button>
                <button>
                  <a
                    className="text-base font-medium text-gray-500 hover:text-gray-900"
                    href="/stats/recentlyplayed"
                  >
                    Recently Played
                  </a>
                </button>
              </nav>
            </div>
          </div>
          <div className="py-10">
            <header className="text-center">
              <h1 className="text-5xl font-extrabold leading-tight text-gray-900">
                {currentView === 'artists' && 'Top Artists'}
              </h1>
            </header>
            <div className="flex justify-center space-x-4 my-8">
              <button
                className={`px-6 py-3 rounded-full shadow-lg ${timeRange === 'short_term' ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-700'} hover:bg-gray-300 transition duration-300`}
                onClick={() => setTimeRange('short_term')}
              >
                Last 4 weeks
              </button>
              <button
                className={`px-6 py-3 rounded-full shadow-lg ${timeRange === 'medium_term' ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-700'} hover:bg-gray-300 transition duration-300`}
                onClick={() => setTimeRange('medium_term')}
              >
                Last 6 months
              </button>
              <button
                className={`px-6 py-3 rounded-full shadow-lg ${timeRange === 'long_term' ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-700'} hover:bg-gray-300 transition duration-300`}
                onClick={() => setTimeRange('long_term')}
              >
                Last 12 months
              </button>
            </div>
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {currentView === 'artists' &&
                topArtists?.map(({ name, images, external_urls }, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center space-y-4 bg-white p-4 rounded-lg shadow-md"
                  >
                    <img
                      src={images[0]?.url || '/default-artist.png'}
                      alt={name}
                      className="w-48 h-48 rounded-md object-cover"
                    />
                    <div className="text-center">
                      <div className="font-medium text-lg text-gray-900">
                        {name}
                      </div>
                      <a
                        className="text-gray-700 hover:text-gray-900"
                        href={external_urls.spotify}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View on Spotify
                      </a>
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
