'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { AvatarImage, AvatarFallback, Avatar } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { SVGProps } from 'react';

// import {
//  DropdownMenuTrigger,
//  DropdownMenuItem,
//  DropdownMenuSeparator,
//  DropdownMenuContent,
//  DropdownMenu
// } from "@/components/ui/dropdown-menu";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ClapperboardIcon,
  DownloadIcon,
  FrownIcon,
  HomeIcon,
  ImageIcon,
  MusicIcon,
  NotebookIcon,
  PaperclipIcon,
  PodcastIcon,
  PlayIcon,
  SearchIcon,
  SendIcon,
  ShuffleIcon,
  SmileIcon,
  StarIcon,
  ThumbsDownIcon,
  ThumbsUpIcon,
  IconWithCounter,
  StarRating,
} from '@/components/ui/playlisticons';

export default function Component() {
  return (
    <div className="grid grid-cols-[240px_1fr] h-screen w-full">
      <div className="bg-gray-900 text-gray-400 p-6 overflow-y-auto">
        <div className="flex items-center gap-2 mb-6">
          <PodcastIcon className="w-8 h-8 text-green-500" />
          <span className="text-xl font-bold">Spotify</span>
        </div>
        <nav className="space-y-4">
          <div className="space-y-1">
            <h3 className="text-sm font-medium text-gray-300">Playlists</h3>
            <div className="grid gap-2">
              <Link
                className="flex items-center gap-2 hover:text-white"
                href="http://localhost:3000/playlists"
              >
                <div className="w-10 h-10 bg-gray-800 rounded-md flex items-center justify-center">
                  <MusicIcon className="w-6 h-6" />
                </div>
                <div>
                  <div className="font-medium">Chill Vibes</div>
                  <div className="text-xs text-gray-500">
                    4.8, replace w avg rating for playlist ★
                  </div>
                </div>
              </Link>
              <Link
                className="flex items-center gap-2 hover:text-white"
                href="https://open.spotify.com/playlist/6OmmwAD3oOKeKA1t3eR4Vb?si=164d690b0b10427d"
              >
                <div className="w-10 h-10 bg-gray-800 rounded-md flex items-center justify-center">
                  <MusicIcon className="w-6 h-6" />
                </div>
                <div>
                  <div className="font-medium">Workout Playlist</div>
                  <div className="text-xs text-gray-500">4.6 ★</div>
                </div>
              </Link>
              <Link
                className="flex items-center gap-2 hover:text-white"
                href="https://open.spotify.com/playlist/37i9dQZEVXcQX0u7kG9Ao5?si=22ce2e6af2eb4470" /* Replace with API call? */
              >
                <div className="w-10 h-10 bg-gray-800 rounded-md flex items-center justify-center">
                  <MusicIcon className="w-6 h-6" />
                </div>
                <div>
                  <div className="font-medium">Discover Weekly</div>
                  <div className="text-xs text-gray-500">4.9 ★</div>
                </div>
              </Link>
              <Link
                className="flex items-center gap-2 hover:text-white"
                href="https://youtube.com"
              >
                <div className="w-10 h-10 bg-gray-800 rounded-md flex items-center justify-center">
                  <MusicIcon className="w-6 h-6" />
                </div>
                <div>
                  <div className="font-medium">Liked Songs</div>
                  <div className="text-xs text-gray-500">4.7 ★</div>
                </div>
              </Link>
            </div>
          </div>
        </nav>
      </div>
      <div className="bg-gray-950 text-gray-400 overflow-y-auto">
        <header className="bg-gray-900 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button size="icon" variant="ghost">
              <ChevronLeftIcon className="w-6 h-6" />
            </Button>
            <Button size="icon" variant="ghost">
              <ChevronRightIcon className="w-6 h-6" />
            </Button>
            <Link href="#">
              <HomeIcon className="w-6 h-6" />
            </Link>
          </div>
          {/* <DropdownMenu>
           <DropdownMenuTrigger asChild>
             <Button size="icon" variant="ghost">
               <Avatar className="h-8 w-8">
                 <AvatarImage alt="@shadcn" src="/placeholder-avatar.jpg" />
                 <AvatarFallback>JP</AvatarFallback>
               </Avatar>
             </Button>
           </DropdownMenuTrigger>
           <DropdownMenuContent>
             <DropdownMenuItem>My Account</DropdownMenuItem>
             <DropdownMenuItem>Settings</DropdownMenuItem>
             <DropdownMenuSeparator />
             <DropdownMenuItem>Logout</DropdownMenuItem>
           </DropdownMenuContent>
         </DropdownMenu> */}
        </header>
        <div className="p-6">
          <div className="flex gap-6">
            <img
              alt="Playlist Cover"
              className="rounded-md"
              height={200}
              src="/playlisttestimg.webp"
              style={{
                aspectRatio: '200/200',
                objectFit: 'cover',
              }}
              width={200}
            />
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-2.5">
                <h1 className="text-2xl font-bold text-white">Chill Vibes</h1>
                <div className="flex items-center gap-1 text-yellow-500">
                  <StarRating />
                </div>
              </div>
              <p className="text-gray-400">
                A carefully curated playlist of soothing and relaxing music to
                help you unwind and de-stress.
              </p>
              <div className="flex items-center gap-4">
                <Button size="icon" variant="ghost">
                  <PlayIcon className="w-6 h-6" />
                  <span className="sr-only">Play</span>
                </Button>
                <Button size="icon" variant="ghost">
                  <ShuffleIcon className="w-6 h-6" />
                  <span className="sr-only">Shuffle</span>
                </Button>
                <Button size="icon" variant="ghost">
                  <DownloadIcon className="w-6 h-6" />
                  <span className="sr-only">Download</span>
                </Button>
                <Button size="icon" variant="ghost">
                  <SearchIcon className="w-6 h-6" />
                  <span className="sr-only">Search</span>
                </Button>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <IconWithCounter icon={ThumbsUpIcon} initialCount={0} />{' '}
                    {/* Replace initialCount with initial count value from server */}
                    <IconWithCounter icon={ThumbsDownIcon} initialCount={0} />
                    <IconWithCounter icon={ClapperboardIcon} initialCount={0} />
                    <IconWithCounter icon={SmileIcon} initialCount={0} />
                    <IconWithCounter icon={FrownIcon} initialCount={0} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8 space-y-4">
            <div className="grid grid-cols-[48px_1fr_48px_48px] items-center gap-4">
              <div className="w-12 h-12 bg-gray-800 rounded-md flex items-center justify-center">
                <MusicIcon className="w-6 h-6" />
              </div>
              <div>
                <div className="font-medium text-white">Daydreaming</div>
                <div className="text-sm text-gray-400">Radiohead</div>
              </div>
              <div className="text-sm text-gray-400">OK Computer</div>
              <div className="flex items-center gap-2">
                <Button size="icon" variant="ghost">
                  <NotebookIcon className="w-5 h-5" />
                  <span className="sr-only">Add note</span>
                </Button>
                <Button size="icon" variant="ghost">
                  <ImageIcon className="w-5 h-5" />
                  <span className="sr-only">Add image</span>
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-[48px_1fr_48px_48px] items-center gap-4">
              <div className="w-12 h-12 bg-gray-800 rounded-md flex items-center justify-center">
                <MusicIcon className="w-6 h-6" />
              </div>
              <div>
                <div className="font-medium text-white">Creep</div>
                <div className="text-sm text-gray-400">Radiohead</div>
              </div>
              <div className="text-sm text-gray-400">The Bends</div>
              <div className="flex items-center gap-2">
                <Button size="icon" variant="ghost">
                  <NotebookIcon className="w-5 h-5" />
                  <span className="sr-only">Add note</span>
                </Button>
                <Button size="icon" variant="ghost">
                  <ImageIcon className="w-5 h-5" />
                  <span className="sr-only">Add image</span>
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-[48px_1fr_48px_48px] items-center gap-4">
              <div className="w-12 h-12 bg-gray-800 rounded-md flex items-center justify-center">
                <MusicIcon className="w-6 h-6" />
              </div>
              <div>
                <div className="font-medium text-white">High and Dry</div>
                <div className="text-sm text-gray-400">Radiohead</div>
              </div>
              <div className="text-sm text-gray-400">The Bends</div>
              <div className="flex items-center gap-2">
                <Button size="icon" variant="ghost">
                  <NotebookIcon className="w-5 h-5" />
                  <span className="sr-only">Add note</span>
                </Button>
                <Button size="icon" variant="ghost">
                  <ImageIcon className="w-5 h-5" />
                  <span className="sr-only">Add image</span>
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-[48px_1fr_48px_48px] items-center gap-4">
              <div className="w-12 h-12 bg-gray-800 rounded-md flex items-center justify-center">
                <MusicIcon className="w-6 h-6" />
              </div>
              <div>
                <div className="font-medium text-white">Karma Police</div>
                <div className="text-sm text-gray-400">Radiohead</div>
              </div>
              <div className="text-sm text-gray-400">OK Computer</div>
              <div className="flex items-center gap-2">
                <Button size="icon" variant="ghost">
                  <NotebookIcon className="w-5 h-5" />
                  <span className="sr-only">Add note</span>
                </Button>
                <Button size="icon" variant="ghost">
                  <ImageIcon className="w-5 h-5" />
                  <span className="sr-only">Add image</span>
                </Button>
              </div>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-800 pt-6">
            <h2 className="text-lg font-bold text-white mb-4">Comments</h2>
            <div className="space-y-4">
              {/* Comment input section */}
              <div className="flex gap-4">
                <div className="border-t px-4 py-3 dark:border-gray-800 flex-1">
                  <div className="flex items-center gap-2">
                    <Input
                      className="flex-1"
                      placeholder="Type your message..."
                    />
                    <Button size="icon" variant="ghost">
                      <PaperclipIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                      <span className="sr-only">Attach file</span>
                    </Button>
                    <Button size="icon" variant="ghost">
                      <SmileIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                      <span className="sr-only">Add emoji</span>
                    </Button>
                    <Button size="icon" variant="ghost">
                      <SendIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                      <span className="sr-only">Send message</span>
                    </Button>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <Avatar className="h-10 w-10">
                  <AvatarImage alt="@shadcn" src="/placeholder-avatar.jpg" />
                  <AvatarFallback>JP</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div className="font-medium text-white">John Doe</div>
                    <div className="text-sm text-gray-400">2 days ago</div>
                  </div>
                  <p className="text-gray-400">
                    This playlist is perfect for my morning commute. The chill
                    vibes really help me start the day on the right note.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <Avatar className="h-10 w-10">
                  <AvatarImage alt="@shadcn" src="/placeholder-avatar.jpg" />
                  <AvatarFallback>JP</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div className="font-medium text-white">Jane Smith</div>
                    <div className="text-sm text-gray-400">1 week ago</div>
                  </div>
                  <p className="text-gray-400">
                    Ive been listening to this playlist on repeat all week. Its
                    the perfect background music for when Im working or
                    studying.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
