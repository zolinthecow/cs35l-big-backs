'use client';

import Image from 'next/image';
import { NotificationIcon } from '@/components/ui/notification';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import axios from 'axios';
import getSpotifyClient from '@/lib/spotify';
import { Pin, Check, X, UserPlus } from 'lucide-react';
import { PrismaClient } from '@prisma/client';
import { getSession, Session } from '@auth0/nextjs-auth0';
import {
  handlePinClickArtist,
  handlePinClickPlaylist,
  handlePinClickTrack,
} from './data_functions/pinningFunctions';
import searchUsersByName from './data_functions/searchFunction';
import { handleFriendAdd } from './data_functions/friendAddFunction';

const prisma = new PrismaClient();

type PinStatus = 'success' | 'duplicate' | 'limitReached' | 'error';

interface NavBarProps {
  className?: string;
}

interface SearchResult {
  artists: {
    items: {
      id: string;
      name: string;
      images: { url: string }[];
      external_urls: { spotify: string };
    }[];
  };
  tracks: {
    items: {
      id: string;
      name: string;
      external_urls: { spotify: string };
      artists: { name: string }[];
      album: { images: { url: string }[] };
    }[];
  };
  playlists: {
    items: {
      id: string;
      images: { url: string }[];
      external_urls: { spotify: string };
      name: string;
      tracks: { total: number };
    }[];
  };
}
interface UserResult {
  id: string;
  name: string;
}

export function NavBar({ className }: NavBarProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult | null>(null);
  const [searchResultsFriends, setSearchResultsFriends] = useState<
    UserResult[] | null
  >(null);
  const [activeTab, setActiveTab] = useState('tracks');
  const searchResultsRef = useRef<HTMLDivElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [TrackpinStatus, setTrackPinStatus] = useState<{
    status: PinStatus | null;
    trackId: string | null;
  }>({ status: null, trackId: null });
  const [artistPinStatus, setArtistPinStatus] = useState<{
    status: PinStatus | null;
    artistID: string | null;
  }>({ status: null, artistID: null });
  const [playlistPinStatus, setPlaylistStatus] = useState<{
    status: PinStatus | null;
    playlistID: string | null;
  }>({ status: null, playlistID: null });
  const [friendPinStatus, setFriendPinStatus] = useState<{
    status: PinStatus | null;
    friendID: string | null;
  }>({ status: null, friendID: null });

  const handleSearch = async () => {
    if (searchQuery.trim() === '') return;

    try {
      const spotifyClient = await getSpotifyClient();
      const response = await spotifyClient.get('/search', {
        params: {
          q: searchQuery,
          type: 'artist,track,playlist',
          market: 'US',
          limit: 5,
          offset: 0,
        },
      });
      setSearchResults(response.data);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };
  const handleSearchFriends = async () => {
    if (searchQuery.trim() === '') return;

    try {
      const results = await searchUsersByName(searchQuery);
      setSearchResultsFriends(results as UserResult[]);
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
        handleSearchFriends();
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
    if (
      searchResultsRef.current &&
      !searchResultsRef.current.contains(event.target as Node)
    ) {
      setIsFocused(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const renderTabContent = () => {
    if (!searchResults) return null;
    if (activeTab === 'tracks' && searchResults.tracks.items.length > 0) {
      return searchResults.tracks.items.map((track) => (
        <div
          key={track.id}
          className="flex justify-between items-center p-2 border-b border-gray-200 hover:bg-gray-100 transition-colors"
        >
          <span>
            {track.name} by{' '}
            {track.artists.map((artist) => artist.name).join(', ')}
          </span>
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center space-x-1"
            onClick={async () => {
              const { status } = await handlePinClickTrack(track);
              setTrackPinStatus({ status, trackId: track.id });
              if (status !== 'error') {
                setTimeout(
                  () =>
                    setTrackPinStatus({
                      status: null,
                      trackId: null,
                    }),
                  2000,
                );
              }
            }}
          >
            {TrackpinStatus.status === 'success' &&
              TrackpinStatus.trackId === track.id && (
                <div className="flex items-center space-x-1">
                  <Check className="w-4 h-4 text-green-500" />
                  <span>Pinned</span>
                </div>
              )}
            {TrackpinStatus.status === 'duplicate' &&
              TrackpinStatus.trackId === track.id && (
                <div className="flex items-center space-x-1">
                  <X className="w-4 h-4 text-yellow-500" />
                  <span>Duplicate Pin</span>
                </div>
              )}
            {TrackpinStatus.status === 'limitReached' &&
              TrackpinStatus.trackId === track.id && (
                <div className="flex items-center space-x-1">
                  <X className="w-4 h-4 text-orange-500" />
                  <span>Limit Exceeded</span>
                </div>
              )}
            {(TrackpinStatus.status === null ||
              TrackpinStatus.trackId !== track.id) && (
              <div className="flex items-center space-x-1">
                <Pin className="w-4 h-4" />
                <span>Pin</span>
              </div>
            )}
          </Button>
        </div>
      ));
    }
    if (activeTab === 'artists' && searchResults.artists.items.length > 0) {
      return searchResults.artists.items.map((artist) => (
        <div
          key={artist.id}
          className="flex justify-between items-center p-2 border-b border-gray-200 hover:bg-gray-100 transition-colors"
        >
          <span>{artist.name}</span>
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center space-x-1"
            onClick={async () => {
              const { status } = await handlePinClickArtist(artist);
              setArtistPinStatus({ status, artistID: artist.id });
              if (status !== 'error') {
                setTimeout(
                  () =>
                    setArtistPinStatus({
                      status: null,
                      artistID: null,
                    }),
                  2000,
                );
              }
            }}
          >
            {artistPinStatus.status === 'success' &&
              artistPinStatus.artistID === artist.id && (
                <div className="flex items-center space-x-1">
                  <Check className="w-4 h-4 text-green-500" />
                  <span>Pinned</span>
                </div>
              )}
            {artistPinStatus.status === 'duplicate' &&
              artistPinStatus.artistID === artist.id && (
                <div className="flex items-center space-x-1">
                  <X className="w-4 h-4 text-yellow-500" />
                  <span>Duplicate Pin</span>
                </div>
              )}
            {artistPinStatus.status === 'limitReached' &&
              artistPinStatus.artistID === artist.id && (
                <div className="flex items-center space-x-1">
                  <X className="w-4 h-4 text-orange-500" />
                  <span>Limit Exceeded</span>
                </div>
              )}
            {(artistPinStatus.status === null ||
              artistPinStatus.artistID !== artist.id) && (
              <div className="flex items-center space-x-1">
                <Pin className="w-4 h-4" />
                <span>Pin</span>
              </div>
            )}
          </Button>
        </div>
      ));
    }
    if (activeTab === 'playlists' && searchResults.playlists.items.length > 0) {
      return searchResults.playlists.items.map((playlist) => (
        <div
          key={playlist.id}
          className="flex justify-between items-center p-2 border-b border-gray-200 hover:bg-gray-100 transition-colors"
        >
          <span>{playlist.name}</span>
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center space-x-1"
            onClick={async () => {
              const { status } = await handlePinClickPlaylist(playlist);
              setPlaylistStatus({ status, playlistID: playlist.id });
              if (status !== 'error') {
                setTimeout(
                  () =>
                    setPlaylistStatus({
                      status: null,
                      playlistID: null,
                    }),
                  2000,
                );
              }
            }}
          >
            {playlistPinStatus.status === 'success' &&
              playlistPinStatus.playlistID === playlist.id && (
                <div className="flex items-center space-x-1">
                  <Check className="w-4 h-4 text-green-500" />
                  <span>Pinned</span>
                </div>
              )}
            {playlistPinStatus.status === 'duplicate' &&
              playlistPinStatus.playlistID === playlist.id && (
                <div className="flex items-center space-x-1">
                  <X className="w-4 h-4 text-yellow-500" />
                  <span>Duplicate Pin</span>
                </div>
              )}
            {playlistPinStatus.status === 'limitReached' &&
              playlistPinStatus.playlistID === playlist.id && (
                <div className="flex items-center space-x-1">
                  <X className="w-4 h-4 text-orange-500" />
                  <span>Limit Exceeded</span>
                </div>
              )}
            {(playlistPinStatus.status === null ||
              playlistPinStatus.playlistID !== playlist.id) && (
              <div className="flex items-center space-x-1">
                <Pin className="w-4 h-4" />
                <span>Pin</span>
              </div>
            )}
          </Button>
        </div>
      ));
    }
    if (activeTab === 'friends' && searchResultsFriends) {
      return searchResultsFriends.map((friend) => (
        <div
          key={friend.id}
          className="flex justify-between items-center p-2 border-b border-gray-200 hover:bg-gray-100 transition-colors"
        >
          <span>{friend.name}</span>
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center space-x-1"
            onClick={async () => {
              const { status } = await handleFriendAdd(friend);
              setFriendPinStatus({ status, friendID: friend.id });
              if (status !== 'error') {
                setTimeout(
                  () =>
                    setFriendPinStatus({
                      status: null,
                      friendID: null,
                    }),
                  2000,
                );
              }
            }}
          >
            {friendPinStatus.status === 'success' &&
              friendPinStatus.friendID === friend.id && (
                <div className="flex items-center space-x-1">
                  <Check className="w-4 h-4 text-green-500" />
                  <span>Added</span>
                </div>
              )}
            {friendPinStatus.status === 'duplicate' &&
              friendPinStatus.friendID === friend.id && (
                <div className="flex items-center space-x-1">
                  <X className="w-4 h-4 text-yellow-500" />
                  <span>Already Added</span>
                </div>
              )}
            {friendPinStatus.status === 'limitReached' &&
              friendPinStatus.friendID === friend.id && (
                <div className="flex items-center space-x-1">
                  <X className="w-4 h-4 text-orange-500" />
                  <span>Limit Exceeded</span>
                </div>
              )}
            {(friendPinStatus.status === null ||
              friendPinStatus.friendID !== friend.id) && (
              <div className="flex items-center space-x-1">
                <UserPlus className="w-4 h-4" />
                <span>Add</span>
              </div>
            )}
          </Button>
        </div>
      ));
    }
  };

  return (
    <div
      className={`flex gap-7 justify-between items-center py-4 px-6 bg-white ${className}`}
    >
      <div className="flex gap-4 items-center space-x-8 flex-shrink-0">
        <a className="flex items-center space-x-2" href="/home">
          <Image src="/image.png" alt="Logo" width={36} height={36} />
        </a>
        <nav className="hidden md:flex space-x-8">
          <a
            className="text-base font-medium transition-colors hover:text-blue-500"
            href="/messages"
          >
            Messages
          </a>
          <a
            className="text-base font-medium transition-colors hover:text-blue-500"
            href="/playlists"
          >
            Playlists
          </a>
          <a
            className="text-base font-medium transition-colors hover:text-blue-500"
            href="/stats"
          >
            Stats
          </a>
        </nav>
      </div>
      <div className="relative flex gap-4 justify-center space-x-8 flex-grow">
        <div className="relative w-full px-2 flex items-center">
          {!isFocused && (
            <Image
              src="/searchicon.webp"
              alt="SearchIcon"
              width={20}
              height={20}
              className="absolute left-4"
            />
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
          <div
            ref={searchResultsRef}
            className="absolute top-14 left-0 w-full bg-white shadow-lg mt-1 max-h-96 overflow-y-auto z-10 rounded-lg"
          >
            <div className="flex justify-around border-b border-gray-300">
              <button
                className={`py-2 px-4 ${
                  activeTab === 'tracks' ? 'border-b-2 border-blue-500' : ''
                }`}
                onClick={() => setActiveTab('tracks')}
              >
                Tracks
              </button>
              <button
                className={`py-2 px-4 ${
                  activeTab === 'artists' ? 'border-b-2 border-blue-500' : ''
                }`}
                onClick={() => setActiveTab('artists')}
              >
                Artists
              </button>
              <button
                className={`py-2 px-4 ${
                  activeTab === 'playlists' ? 'border-b-2 border-blue-500' : ''
                }`}
                onClick={() => setActiveTab('playlists')}
              >
                Playlists
              </button>
              <button
                className={`py-2 px-4 ${
                  activeTab === 'friends' ? 'border-b-2 border-blue-500' : ''
                }`}
                onClick={() => setActiveTab('friends')}
              >
                Users
              </button>
            </div>
            <div className="px-4 py-2">{renderTabContent()}</div>
          </div>
        )}
      </div>
      <div className="flex justify-between space-x-3">
        <Button variant="ghost" size="sm" className="px-2 hidden sm:block">
          <a
            className="flex items-center space-x-2 transition-colors hover:text-blue-500"
            href="/notifications"
          >
            <NotificationIcon count={98} />
          </a>
        </Button>
        <Link href="/profile">
          <Button
            variant="ghost"
            className="text-base font-medium transition-colors hover:text-blue-500 px-2"
          >
            <Image
              src="https://avatar.iran.liara.run/public/39"
              alt="Profile"
              width={36}
              height={36}
            />
          </Button>
        </Link>
      </div>
    </div>
  );
}
