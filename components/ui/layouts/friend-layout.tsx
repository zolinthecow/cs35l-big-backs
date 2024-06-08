'use client';
import Link from 'next/link';
import Image from 'next/image';

type FriendItemProps = {
  name: string;
  username: string;
  cover_url: string | null;
  profile_link: string;
  className?: string;
};

export function FriendItem({
  name,
  username,
  cover_url,
  profile_link,
  className,
}: FriendItemProps) {
  const firstLetter = username ? username.charAt(0).toUpperCase() : '';

  return (
    <div
      className={`flex flex-col items-center gap-2 p-4 rounded-md transition-all duration-200 ease-in-out hover:bg-gray-100 hover:shadow-xl ${className}`}
    >
      {cover_url ? (
        <Image
          alt={`${name} cover`}
          className="rounded-full"
          width={80}
          height={80}
          src={cover_url}
          objectFit="cover"
        />
      ) : (
        <div className="rounded-full bg-gray-500 flex items-center justify-center w-20 h-20 text-white text-2xl">
          {firstLetter}
        </div>
      )}
      <div className="text-center w-40">
        <Link href={profile_link}>
          <h3 className="font-bold text-[15px] text-gray-900 dark:text-gray-200 truncate text-ellipsis">
            {name}
          </h3>
        </Link>
        <h3 className="font-light text-[13px] text-gray-900 dark:text-gray-400 truncate text-ellipsis">
          @{username}
        </h3>
      </div>
    </div>
  );
}
