"use client";

import React, { useState, useEffect } from 'react';
//import { useRouter } from 'next/router';
import { NavBar } from '@/components/ui/navbar';
import { getSpotifyAccessToken, refreshSpotifyToken } from '@/lib/spotify/actions';


/*
async function fetchWebApi(endpoint: string, method: string, body: any = null): Promise<any> {
  //const token = "BQDLxB8M0wqUNy6ue2oLuxBXG3NUB9ASdLMzdrv_C15xX1ySwzDjV4_nDyOzcGx2pdqjnZEaWD_AGbIcOCLu2kqJUF-pMSlvIByCVKUKeaZe5LdFTomqEns69LCDku2Vhc4vkCUeLyMwdO2CbckQd_foQRm0dQIuRzhjLYPVRrY7WVwIDU2n-ACCaU81-z23cTB4lefWObtwEa15n7SD3JrzMY-OfxVz89dvfkqfNiJ6g4HFtE7bfHlGuYaDIhLcdtIyelg";
  const token = 'BQDtUKkfEwuvDZtpBTk-nnzdimauW5aHaO-aqc3voRE4jRwwXdNFJ_kdHnnpULugIYcJiD-_jqlO3TMDfcU5HAnEwcyukesqlFr3s1CuJb200qUmsKCFRCfJvMrsHpxqXErdaF_nHKI-IIA279SkEc1beljCQn9B-RuxtyOvek3ecTkBTmcQEzz7vfi3x05qQjIMEQebYTHqV7vuKgMFz5UMvUM3heJdYCzWtVDFTaJL4wTMsNGLB53eCw6OE3EUERccoA';

  const res = await fetch(`https://api.spotify.com/${endpoint}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method,
    body: body ? JSON.stringify(body) : null
  });
  return await res.json();
}
*/

async function fetchWebApi(endpoint: string, method: string, body: any = null): Promise<any> {
  let token = await getSpotifyAccessToken();
  console.log("TEST1: " + token);
  const res = await fetch(`https://api.spotify.com/${endpoint}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method,
    body: body ? JSON.stringify(body) : null
  });

  if (res.status === 401) {
    // Token expired, refresh it
    token = await refreshSpotifyToken();
    const resRetry = await fetch(`https://api.spotify.com/${endpoint}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method,
      body: body ? JSON.stringify(body) : null
    });
    return await resRetry.json();
  }

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

/*
async function getTopTracks(timeRange: string): Promise<Track[]> {
  const response = await fetchWebApi(
    `v1/me/top/tracks?time_range=${timeRange}&limit=5`, 'GET'
  );
  return response.items;
}
*/

/*
async function getTopTracks(timeRange: string): Promise<Track[]> {
  try {
    const response = await fetchWebApi(
      `v1/me/top/tracks?time_range=${timeRange}&limit=20`, 'GET'
    );
    console.log('Top Tracks Response:', response); // Log the response
    return response.items;
  } catch (error) {
    console.error('Error fetching top tracks:', error);
    return [];
  }
}
*/

async function getTopTracks(timeRange: string): Promise<Track[]> {
  try {
    const response = await fetchWebApi(
      `v1/me/top/tracks?time_range=${timeRange}&limit=20`, 'GET'
    );
    console.log('Top Tracks Response:', response); // Log the response
    return response.items;
  } catch (error) {
    console.error('Error fetching top tracks:', error);
    return [];
  }
}


/*
export default function Page() {
  const [topTracks, setTopTracks] = useState<Track[] | null>(null);
  const [currentView, setCurrentView] = useState<'tracks' | 'artists' | 'recent'>('tracks');
  const [timeRange, setTimeRange] = useState<'short_term' | 'medium_term' | 'long_term'>('short_term');

  useEffect(() => {
    getTopTracks(timeRange).then(setTopTracks);
  }, [timeRange]);
  
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
*/

export default function Page() {
  const [topTracks, setTopTracks] = useState<Track[] | null>(null);
  const [currentView, setCurrentView] = useState<'tracks' | 'artists' | 'recent'>('tracks');
  const [timeRange, setTimeRange] = useState<'short_term' | 'medium_term' | 'long_term'>('short_term');
  useEffect(() => {
    getTopTracks(timeRange).then(setTopTracks);
  }, [timeRange]);

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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


