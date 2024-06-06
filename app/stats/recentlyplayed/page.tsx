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
}

interface RecentlyPlayed {
  track: {
    name: string;
    artists: Artist[];
    album: {
      images: { url: string }[];
    };
    external_urls: {
      spotify: string;
    };
  };
  played_at: string;
}

async function getRecentlyPlayed(): Promise<RecentlyPlayed[]> {
  try {
    const oneMinuteAgo = new Date(Date.now() - 60 * 1000);
    const unixTimestamp = Math.floor(oneMinuteAgo.getTime() / 1000);
    const response = await fetchData(
      `/me/player/recently-played?after=${unixTimestamp}&limit=50`,
    );
    return response;
  } catch (error) {
    console.error('Error fetching recently played:', error);
    return [];
  }
}

export default function Page() {
  const [recentlyPlayed, setRecentlyPlayed] = useState<RecentlyPlayed[] | null>(
    null,
  );
  const [currentView, setCurrentView] = useState<
    'tracks' | 'artists' | 'recent'
  >('recent');

  useEffect(() => {
    getRecentlyPlayed().then(setRecentlyPlayed);
  }, []);

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
                <button>
                  <a
                    className="text-base font-medium text-gray-500 hover:text-gray-900"
                    href="/stats/topartists"
                  >
                    Top Artists
                  </a>
                </button>
                <button
                  className={`text-base font-medium ${currentView === 'recent' ? 'text-gray-900' : 'text-gray-500 hover:text-gray-900'}`}
                  onClick={() => setCurrentView('recent')}
                >
                  Recently Played
                </button>
              </nav>
            </div>
          </div>
          <div className="py-10">
            <header className="text-center">
              <h1 className="text-5xl font-extrabold leading-tight text-gray-900">
                {currentView === 'tracks' && 'Top Tracks'}
                {currentView === 'artists' && 'Top Artists'}
                {currentView === 'recent' && 'Recently Played'}
              </h1>
            </header>
            <div className="mt-12 grid grid-cols-1 gap-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {currentView === 'recent' &&
                recentlyPlayed?.map(({ track, played_at }, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between space-x-4 bg-white p-4 rounded-lg shadow-md"
                  >
                    <div className="flex items-center space-x-4">
                      <span className="text-lg font-medium">{index + 1}.</span>
                      {track.album.images[0] ? (
                        <img
                          src={track.album.images[0].url}
                          alt={track.name}
                          className="w-16 h-16 rounded-md object-cover"
                        />
                      ) : (
                        <div className="w-16 h-16 flex items-center justify-center rounded-md bg-gray-300 text-gray-600 text-xs text-center">
                          No Album Cover
                        </div>
                      )}
                      <div>
                        <div className="font-medium text-lg text-gray-900">
                          {track.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {track.artists
                            .map((artist) => artist.name)
                            .join(', ')}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end space-y-2">
                      <div className="text-sm text-gray-500">
                        Played at: {new Date(played_at).toLocaleString()}
                      </div>
                      <a
                        className="text-gray-700 hover:text-gray-900"
                        href={track.external_urls.spotify}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Listen on Spotify
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
