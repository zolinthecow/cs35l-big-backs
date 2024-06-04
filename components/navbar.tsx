'use client';

import Image from 'next/image';
import { NotificationIcon } from '@/components/ui/notification';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import getSpotifyClient from '@/lib/spotify';

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
}

export function NavBar({ className }: NavBarProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult | null>(null);
  const searchResultsRef = useRef<HTMLDivElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleSearch = async () => {
    if (searchQuery.trim() === '') return;

    try {
      const spotifyClient = await getSpotifyClient();
      const response = await spotifyClient.get('/search', {
        params: {
          q: searchQuery,
          type: 'artist,track',
          market: 'US', // or other market code
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
            {searchResults.tracks.items.length > 0 && (
              <div className="px-4 py-2">
                <h3 className="text-gray-500 font-semibold border-b-2 border-gray-300 pb-1 mb-2">Tracks</h3>
                {searchResults.tracks.items.map((track) => (
                  <div key={track.id} className="p-2 border-b border-gray-200 hover:bg-gray-100 transition-colors">
                    {track.name} by {track.artists.map((artist) => artist.name).join(', ')}
                  </div>
                ))}
              </div>
            )}
            {searchResults.artists.items.length > 0 && (
              <div className="px-4 py-2">
                <h3 className="text-gray-500 font-semibold border-b-2 border-gray-300 pb-1 mb-2">Artists</h3>
                {searchResults.artists.items.map((artist) => (
                  <div key={artist.id} className="p-2 border-b border-gray-200 hover:bg-gray-100 transition-colors">
                    {artist.name}
                  </div>
                ))}
              </div>
            )}
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
