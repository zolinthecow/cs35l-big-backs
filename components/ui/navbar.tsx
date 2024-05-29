'use client';

import Image from 'next/image';
import { NotificationIcon } from '@/components/ui/notification';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import Link from 'next/link';

const handleSearchSubmit = (event: React.FormEvent) => {
  event.preventDefault();
  // Handle search submission
};

interface NavBarProps {
  className?: string;
}

export function NavBar({ className }: NavBarProps) {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <div
      className={`flex gap-7 justify-between items-center py-4 px-6 bg-white ${className}`}
    >
      <div className="flex gap-4 items-center space-x-8 flex-shrink-0">
        <a className="flex items-center space-x-2" href="/">
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
      <form
        className="flex gap-4 justify-center space-x-8 flex-grow"
        onSubmit={handleSearchSubmit}
      >
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
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
        </div>
      </form>
      <div className="flex  justify-between space-x-3">
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
            <img
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
