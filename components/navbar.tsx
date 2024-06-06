'use client';

import Image from 'next/image';
import { NotificationIcon } from '@/components/ui/notification';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import axios from 'axios';
import getSpotifyClient from '@/lib/spotify';
import { Pin } from 'lucide-react';

interface NavBarProps {
  className?: string;
}

interface SearchResult {
  artists: {
    items: { id: string; name: string; images: { url: string }[] }[];
  };
  tracks: {
    items: { id: string; name: string; artists: { name: string }[] }[];
  };
  playlists: {
    items: { id: string; name: string; images: { url: string }[] }[];
  };
}

export function NavBar({ className }: NavBarProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult | null>(null);
  const [activeTab, setActiveTab] = useState('tracks');
  const searchResultsRef = useRef<HTMLDivElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleSearch = async () => {
    if (searchQuery.trim() === '') return;

    try {
      const spotifyClient = await getSpotifyClient();
      const response = await spotifyClient.get('/search', {
        params: {
          q: searchQuery,
          type: 'artist,track,playlist',
          market: 'US',
          limit: 10,
          offset: 0,
        },
      });
      setSearchResults(response.data);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  useEffect(() => {
    if (searchQuery) {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
      typingTimeoutRef.current = setTimeout(() => {
        handleSearch();
      }, 300);
    } else {
      setSearchResults(null);
    }

    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, [searchQuery]);

  const handleClickOutside = (event: MouseEvent) => {
    if (searchResultsRef.current && !searchResultsRef.current.contains(event.target as Node)) {
      setIsFocused(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handlePinClick = (item: any) => {
    console.log('Pinned:', item);
  };

  const renderResults = () => {
    if (!searchResults) return null;

    const { tracks, artists, playlists } = searchResults;

    switch (activeTab) {
      case 'tracks':
        return (
          tracks.items.length > 0 && (
            <div className="px-4 py-2">
              {tracks.items.map((track) => (
                <div key={track.id} className="flex justify-between items-center p-2 border-b border-gray-200 hover:bg-gray-100 transition-colors">
                  <span>{track.name} by {track.artists.map((artist) => artist.name).join(', ')}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex items-center space-x-1"
                    onClick={() => handlePinClick(track)}
                  >
                    <Pin className="w-4 h-4" />
                    <span>Pin</span>
                  </Button>
                </div>
              ))}
            </div>
          )
        );
      case 'artists':
        return (
          artists.items.length > 0 && (
            <div className="px-4 py-2">
              {artists.items.map((artist) => (
                <div key={artist.id} className="flex justify-between items-center p-2 border-b border-gray-200 hover:bg-gray-100 transition-colors">
                  <span>{artist.name}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex items-center space-x-1"
                    onClick={() => handlePinClick(artist)}
                  >
                    <Pin className="w-4 h-4" />
                    <span>Pin</span>
                  </Button>
                </div>
              ))}
            </div>
          )
        );
      case 'playlists':
        return (
          playlists.items.length > 0 && (
            <div className="px-4 py-2">
              {playlists.items.map((playlist) => (
                <div key={playlist.id} className="flex justify-between items-center p-2 border-b border-gray-200 hover:bg-gray-100 transition-colors">
                  <span>{playlist.name}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex items-center space-x-1"
                    onClick={() => handlePinClick(playlist)}
                  >
                    <Pin className="w-4 h-4" />
                    <span>Pin</span>
                  </Button>
                </div>
              ))}
            </div>
          )
        );
      case 'friends':
        return (
          <div className="px-4 py-2">
            <div className="flex justify-between items-center p-2 border-b border-gray-200 hover:bg-gray-100 transition-colors">
              <span>John Doe</span>
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center space-x-1"
                onClick={() => handlePinClick({ id: 'john_doe', name: 'John Doe' })}
              >
                <Pin className="w-4 h-4" />
                <span>Pin</span>
              </Button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={`flex gap-7 justify-between items-center py-4 px-6 bg-white ${className}`}>
      <div className="flex gap-4 items-center space-x-8 flex-shrink-0">
        <a className="flex items-center space-x-2" href="/home">
          <Image src="/image.png" alt="Logo" width={36} height={36} />
        </a>
        <nav className="hidden md:flex space-x-8">
          <a className="text-base font-medium transition-colors hover:text-blue-500" href="/messages">
            Messages
          </a>
          <a className="text-base font-medium transition-colors hover:text-blue-500" href="/playlists">
            Playlists
          </a>
          <a className="text-base font-medium transition-colors hover:text-blue-500" href="/stats">
            Stats
          </a>
        </nav>
      </div>
      <div className="relative flex gap-4 justify-center space-x-8 flex-grow">
        <div className="relative w-full px-2 flex items-center">
          {!isFocused && (
            <Image src="/searchicon.webp" alt="SearchIcon" width={20} height={20} className="absolute left-4" />
          )}
          <Input
            className="w-full bg-gray-100 border border-gray-300 focus:ring-2 focus:ring-gray-600 focus:outline-none px-4 py-2 rounded-md text-base pl-10"
            placeholder="Search"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
          />
        </div>
        {isFocused && searchResults && (
          <div ref={searchResultsRef} className="absolute top-14 left-0 w-full bg-white shadow-lg mt-1 max-h-96 overflow-y-auto z-10 rounded-lg">
            <div className="flex space-x-4 border-b border-gray-200 p-2">
              <button
                className={`px-4 py-2 ${activeTab === 'tracks' ? 'text-gray-800 border-b-2 border-gray-800' : 'text-gray-500'}`}
                onClick={() => setActiveTab('tracks')}
              >
                Tracks
              </button>
              <button
                className={`px-4 py-2 ${activeTab === 'artists' ? 'text-gray-800 border-b-2 border-gray-800' : 'text-gray-500'}`}
                onClick={() => setActiveTab('artists')}
              >
                Artists
              </button>
              <button
                className={`px-4 py-2 ${activeTab === 'playlists' ? 'text-gray-800 border-b-2 border-gray-800' : 'text-gray-500'}`}
                onClick={() => setActiveTab('playlists')}
              >
                Playlists
              </button>
              <button
                className={`px-4 py-2 ${activeTab === 'friends' ? 'text-gray-800 border-b-2 border-gray-800' : 'text-gray-500'}`}
                onClick={() => setActiveTab('friends')}
              >
                Friends
              </button>
            </div>
            {renderResults()}
          </div>
        )}
      </div>
      <div className="flex justify-between space-x-3">
        <Button variant="ghost" size="sm" className="px-2 hidden sm:block">
          <a className="flex items-center space-x-2 transition-colors hover:text-blue-500" href="/notifications">
            <NotificationIcon count={98} />
          </a>
        </Button>
        <Link href="/profile">
          <Button variant="ghost" className="text-base font-medium transition-colors hover:text-blue-500 px-2">
            <Image src="https://avatar.iran.liara.run/public/39" alt="Profile" width={36} height={36} />
          </Button>
        </Link>
      </div>
    </div>
  );
}
