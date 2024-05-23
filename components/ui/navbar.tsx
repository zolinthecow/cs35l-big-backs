import Image from 'next/image';
import { NotificationIcon } from '@/components/notification';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function NavBar() {
  return (
    <div className="flex justify-between items-center py-4 px-6 bg-white">
      <div className="flex items-center space-x-8">
        <Button variant="ghost" size="icon">
          <Menu size={30} />
        </Button>
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
      <div className="flex items-center space-x-8">
        <div className="relative flex-grow">
          <Input
            className="w-full bg-gray-100 border border-gray-300 focus:ring-2 focus:ring-gray-600 focus:outline-none px-4 py-2 rounded-md text-base"
            placeholder="Search news..."
            type="text"
          />
          <Button className="absolute right-2 top-1/2 transform -translate-y-1/2" size="icon" variant="ghost">
            <Image src="/searchicon.webp" alt="SearchIcon" width={20} height={20} />
          </Button>
        </div>
        <Button variant="ghost" size="sm">
          <a className="flex items-center space-x-2 transition-colors hover:text-blue-500" href="/notifications">
            <NotificationIcon count={98} />
          </a>
        </Button>
        <Button variant="ghost" className="text-base font-medium transition-colors hover:text-blue-500">
          Sign In
        </Button>
      </div>
    </div>
  );
}