"use client";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Rating } from "@/components/ui/rating";
import { FC } from "react";
import { NavBar } from "@/components/ui/navbar";
import { SongLayout } from "@/components/ui/song-layout";
import { mockSongData } from "@/components/mock_data/song_data";
import { PlaylistLayout } from "@/components/ui/playlist-layout";
import { mockPlaylistData } from "@/components/mock_data/playlist_data";
import { mockArtistData } from "@/components/mock_data/artist_data";
import { mockAirbudsData } from "@/components/mock_data/airbuds_data";
import Link from 'next/link';

const userData = {
  name: "Joe Bryant",
  username: "@joe_bryant",
  profilePicture: "/profile.jpg",
  bio: [
    "Ethan is a freaky frontend enthusiast who has a passion for music and mathematics. He loves to grind, to run around Bel Air and admire the beautiful mansions, and to debone chicken wings. When he has free time he also loves to show his friends his special sauce.",
    "Other hobbies include: pregaming din tai fung with shake shack, being nonCHALANT, and celebrating the month of May.",
  ],
  ratingValue: 4.5,
  friendsCount: 107,
};
const Page: FC = () => {
  const { name, username, profilePicture, bio, ratingValue, friendsCount } = userData;

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900">
      <NavBar className="sticky top-0 z-20"/>
      <div className="flex flex-col md:flex-row gap-6 px-4 pt-16 py-4 md:px-6 md:py-4">
        <div className="flex flex-col h-99/100 items-center md:items-center gap-6 md:w-1/3 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md space-x-4 space-y-2 fixed top-30">
          <div className="w-full text-left mb-0">
            <h1 className="text-2xl font-bold mb-0">Profile Page</h1>
          </div>
          <div className="flex flex-col items-center space-y-4">
            <Avatar className="h-60 w-60 border-4 border-white dark:border-gray-900">
              <AvatarImage alt={username} src={profilePicture} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Rating rating={ratingValue} />
            <div className="text-center space-y-2">
              <h1 className="text-2xl font-bold">{name}</h1>
              <div className="flex items-center space-x-2">
                <p className="text-gray-500 dark:text-gray-400">{username}</p>
                <span className="text-xl">·</span>
                <p className="text-gray-500 dark:text-gray-400">{friendsCount} friends</p>
              </div>
            </div>
          </div>
          <div className="w-full text-left mb-1">
            <text className="text-xl font-bold mb-0">Bio</text>
            <div className="text-gray-700 dark:text-gray-300">
              {bio.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col h-full gap-6 md:w-2/3 overflow-y-auto ml-auto pl-10">
          <div className="flex flex-col bg-white p-6 rounded-lg shadow-md space-y-4">
            <h2 className="text-2xl font-bold text-gray-800">Pinned Songs</h2>
            {mockSongData.map((song) => (
              <SongLayout key={song.id} {...song} className="transition-all duration-200 ease-in-out hover:bg-gray-100 hover:shadow-xl"/>
            ))}
          </div>
          <div className="flex flex-col bg-white p-6 rounded-lg shadow-md space-y-4">
            <h2 className="text-2xl font-bold text-gray-800">Pinned Playlists</h2>
            {mockPlaylistData.map((song) => (
              <PlaylistLayout key={song.id} {...song} className="transition-all duration-200 ease-in-out hover:bg-gray-100 hover:shadow-xl"/>
            ))}
          </div>
          <Section title="Pinned Artists" scrollable>
            {mockArtistData.map((artist) => (
              <ArtistItem key={artist.id} name={artist.artist} cover={artist.artist_url} />
            ))}
          </Section>
          <Section title="Friends" scrollable>
            {mockAirbudsData.map((data) => (
              <FriendItem key={data.key} name={data.profileName} username={data.songArtist} cover_url={data.profileImage} profile_link={data.songLink}/>
            ))}
          </Section>
        </div>
      </div>
    </div>
  );
};  

const Section: FC<{ title: string; scrollable?: boolean; children: React.ReactNode }> = ({ title, scrollable, children }) => (
  <div className="flex flex-col gap-4 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
    <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
    <div className={`flex gap-4 ${scrollable ? 'overflow-x-auto' : ''}`}>
      {children}
    </div>
  </div>
);

const ArtistItem: FC<{ name: string; cover: string }> = ({ name, cover }) => (
  <div className="flex flex-col items-center gap-2 p-4 bg-gray-50 dark:bg-gray-700 rounded-md transition-all duration-200 ease-in-out hover:bg-gray-100 hover:shadow-xl h-50 w-50">
    <img
      alt={`${name} cover`}
      className="rounded-md"
      height={150}
      src={cover}
      style={{ aspectRatio: "1/1", objectFit: "cover" }}
      width={150}
    />
    <div className="text-center w-35">
      <h3 className="font-bold text-[15px] text-gray-900 truncate">{name}</h3>
    </div>
  </div>
);

const FriendItem: FC<{ name: string; username: string; cover_url: string; profile_link: string}> = ({name, username, cover_url, profile_link}) => (
  <div className="flex flex-col items-center gap-2 p-4 rounded-md transition-all duration-200 ease-in-out hover:bg-gray-100 hover:shadow-xl">
    <img
      alt={`${name} cover`}
      className="rounded-full h-20 w-20"
      height={150}
      width={150}
      src={cover_url}
    />
    <div className="text-center w-40">
      <Link href={profile_link}>
        <h3 className="font-bold text-[15px] text-gray-900 truncate text-ellipsis">{name}</h3>
      </Link>
      <h3 className="font-light text-[13px] text-gray-900 truncate text-ellipsis">@{username}</h3>
    </div>
  </div>
)

export default Page;