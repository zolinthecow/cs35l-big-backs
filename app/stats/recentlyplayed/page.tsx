"use client";

import React, { useState, useEffect } from 'react';
import { NavBar } from '@/components/ui/navbar';

async function fetchWebApi(endpoint: string, method: string, body: any = null): Promise<any> {
  const token = "BQBYJZqcEYDY3GHrNTE9gtoOiiT-Z4MwvLkZjVx-3uag_QFKUx10gqsH8hkbth47Sv7uJKE2q9hWXO9IMeHf78uI5zewUGpCvOBCHM5P3aAQKIihs93OP0_FRHrBISTWoS1FZEICzN-wpgRbCdTIFI4qIbFnR5cGJ7mptR7OXjq_Sk1xDBSNuDIwKATSzzncsO6A2dD4YxmS9wkhAe6u8FcVTwBLOHhsu_T7r4tjCLik9cjjdYoF0r7ulTDd37rxnpAOsYI";
  const res = await fetch(`https://api.spotify.com/${endpoint}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method,
    body: body ? JSON.stringify(body) : null
  });
  return await res.json();
}

interface Artist {
  name: string;
}

interface Track {
  name: string;
  artists: Artist[];
  album: {
    images: { url: string }[];
  };
  external_urls: {
    spotify: string;
  };
}

interface RecentlyPlayed {
  track: Track;
}

async function getTopTracks(timeRange: string): Promise<Track[]> {
  const response = await fetchWebApi(
    `v1/me/top/tracks?time_range=${timeRange}&limit=5`, 'GET'
  );
  return response.items;
}

async function getTopArtists(timeRange: string): Promise<Artist[]> {
  const response = await fetchWebApi(
    `v1/me/top/artists?time_range=${timeRange}&limit=5`, 'GET'
  );
  return response.items;
}

async function getRecentlyPlayed(): Promise<RecentlyPlayed[]> {
  const response = await fetchWebApi(
    'v1/me/player/recently-played?limit=5', 'GET'
  );
  return response.items;
}

export default function Page() {
  const [topTracks, setTopTracks] = useState<Track[] | null>(null);
  const [topArtists, setTopArtists] = useState<Artist[] | null>(null);
  const [recentlyPlayed, setRecentlyPlayed] = useState<RecentlyPlayed[] | null>(null);
  const [currentView, setCurrentView] = useState<'tracks' | 'artists' | 'recent'>('recent');
  const [timeRange, setTimeRange] = useState<'short_term' | 'medium_term' | 'long_term'>('short_term');

  useEffect(() => {
    if (currentView === 'tracks') {
      getTopTracks(timeRange).then(setTopTracks);
    } else if (currentView === 'artists') {
      getTopArtists(timeRange).then(setTopArtists);
    } else if (currentView === 'recent') {
      getRecentlyPlayed().then(setRecentlyPlayed);
    }
  }, [currentView, timeRange]);

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
                <button
                  className={`text-base font-medium text-gray-500 hover:text-gray-900 ${currentView === 'artists' ? 'text-black' : ''}`}
                  onClick={() => setCurrentView('artists')}
                >
                  Top Artists
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
                {currentView === 'tracks' && 'Top Tracks'}
                {currentView === 'artists' && 'Top Artists'}
                {currentView === 'recent' && 'Recently Played'}
              </h1>
            </header>
            <div className="flex justify-center space-x-4 my-4">
              {currentView !== 'recent' && (
                <>
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
                </>
              )}
            </div>
            <div className="mt-12 grid grid-cols-1 gap-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pl-10">
              {currentView === 'tracks' && topTracks?.map(({ name, artists, album, external_urls }, index) =>
                <div key={index} className="flex items-center space-x-4">
                  <span className="text-lg font-medium">{index + 1}.</span>
                  <img src={album.images[0].url} alt={name} width="50" height="50" />
                  <div>
                    <div className="font-medium text-lg">{name}</div>
                    <div className="text-sm text-gray-500">{artists.map(artist => artist.name).join(', ')}</div>
                    <a className="text-blue-500" href={external_urls.spotify} target="_blank" rel="noopener noreferrer">Listen on Spotify</a>
                  </div>
                </div>
              )}
              {currentView === 'artists' && topArtists?.map(({ name, images, external_urls }, index) =>
                <div key={index} className="flex items-center space-x-4">
                  <span className="text-lg font-medium">{index + 1}.</span>
                  <img src={images[0].url} alt={name} width="50" height="50" />
                  <div>
                    <div className="font-medium text-lg">{name}</div>
                    <a className="text-blue-500" href={external_urls.spotify} target="_blank" rel="noopener noreferrer">View on Spotify</a>
                  </div>
                </div>
              )}
              {currentView === 'recent' && recentlyPlayed?.map(({ track }, index) =>
                <div key={index} className="flex items-center space-x-4">
                  <span className="text-lg font-medium">{index + 1}.</span>
                  <img src={track.album.images[0].url} alt={track.name} width="50" height="50" />
                  <div>
                    <div className="font-medium text-lg">{track.name}</div>
                    <div className="text-sm text-gray-500">{track.artists.map(artist => artist.name).join(', ')}</div>
                    <a className="text-blue-500" href={track.external_urls.spotify} target="_blank" rel="noopener noreferrer">Listen on Spotify</a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
