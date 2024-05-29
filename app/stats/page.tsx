"use client";
import React, { useEffect, useState } from 'react';
import getSpotifyClient from '@/lib/spotify';
import { NavBar } from '@/components/ui/navbar';

interface Track {
  id: string;
  name: string;
  artists: { name: string }[];
  album: { images: { url: string }[] };
}

interface Artist {
  id: string;
  name: string;
  images: { url: string }[];
}

interface RecentlyPlayed {
  track: Track;
  played_at: string;
}

const Page: React.FC = () => {
  const [topTracks, setTopTracks] = useState<Track[]>([]);
  const [topArtists, setTopArtists] = useState<Artist[]>([]);
  const [recentlyPlayed, setRecentlyPlayed] = useState<RecentlyPlayed[]>([]);
  const [timeRange, setTimeRange] = useState<'short_term' | 'medium_term' | 'long_term'>('short_term');
  const [currentView, setCurrentView] = useState<'tracks' | 'artists' | 'recent'>('tracks');

  useEffect(() => {
    const fetchTopTracks = async () => {
      try {
        const { accessToken } = await getSpotifyClient();
        const response = await fetch(`https://api.spotify.com/v1/me/top/tracks?time_range=${timeRange}&limit=20`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const data = await response.json();
        setTopTracks(data.items);
      } catch (error) {
        console.error('Error fetching top tracks:', error);
      }
    };

    const fetchTopArtists = async () => {
      try {
        const { accessToken } = await getSpotifyClient();
        const response = await fetch(`https://api.spotify.com/v1/me/top/artists?time_range=${timeRange}&limit=20`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const data = await response.json();
        setTopArtists(data.items);
      } catch (error) {
        console.error('Error fetching top artists:', error);
      }
    };

    const fetchRecentlyPlayed = async () => {
      try {
        const { accessToken } = await getSpotifyClient();
        const response = await fetch(`https://api.spotify.com/v1/me/player/recently-played?limit=20`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const data = await response.json();
        setRecentlyPlayed(data.items);
      } catch (error) {
        console.error('Error fetching recently played tracks:', error);
      }
    };

    if (currentView === 'tracks') {
      fetchTopTracks();
    } else if (currentView === 'artists') {
      fetchTopArtists();
    } else if (currentView === 'recent') {
      fetchRecentlyPlayed();
    }
  }, [timeRange, currentView]);

  return (
    <div className="bg-white">
      <NavBar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
        {(currentView === 'tracks' || currentView === 'artists') && (
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
        )}
        <div className="mt-12 grid grid-cols-3 gap-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {currentView === 'tracks' && topTracks.map((track) => (
            <div key={track.id} className="flex items-center space-x-4">
              <img src={track.album.images[0].url} alt={track.name} width="50" height="50" />
              <div>
                <div className="font-medium text-lg">{track.name}</div>
                <div className="text-sm text-gray-500">{track.artists.map(artist => artist.name).join(', ')}</div>
              </div>
            </div>
          ))}
          {currentView === 'artists' && topArtists.map((artist) => (
            <div key={artist.id} className="flex items-center space-x-4">
              <img src={artist.images[0].url} alt={artist.name} width="50" height="50" />
              <div>
                <div className="font-medium text-lg">{artist.name}</div>
              </div>
            </div>
          ))}
          {currentView === 'recent' && recentlyPlayed.map((item) => (
            <div key={item.track.id} className="flex items-center space-x-4">
              <img src={item.track.album.images[0].url} alt={item.track.name} width="50" height="50" />
              <div>
                <div className="font-medium text-lg">{item.track.name}</div>
                <div className="text-sm text-gray-500">{item.track.artists.map(artist => artist.name).join(', ')}</div>
                <div className="text-sm text-gray-500">{new Date(item.played_at).toLocaleString()}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;