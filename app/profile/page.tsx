import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Rating } from "@/components/ui/rating";
import { FC } from "react";
import { NavBar } from "@/components/ui/navbar";

const userData = {
  name: "Joe Bryant",
  username: "@joe_bryant",
  profilePicture: "/profile.jpg",
  bio: [
    "Ethan is a freaky frontend enthusiast who has a passion for music and mathematics. He loves to grind, to run around Bel Air and admire the beautiful mansions, and to debone chicken wings. When he has free time he also loves to show his friends his special sauce.",
    "Other hobbies include: pregaming din tai fung with shake shack, being nonCHALANT, and celebrating the month of May.",
  ],
  ratingValue: 5,
  songs: [
    { title: "Too Sweet", artist: "Hozier", cover: "/too-sweet.jpg" },
    { title: "Too Sweet", artist: "Hozier", cover: "/too-sweet.jpg" },
    { title: "Too Sweet", artist: "Hozier", cover: "/too-sweet.jpg" },
  ],
  playlists: [
    { title: "Money", songs: 32, cover: "/money.jpg" },
    { title: "Rated R", songs: 64, cover: "/rated-r.jpg" },
    { title: "Sweat", songs: 25, cover: "/sweat.jpg" },
  ],
  artists: [
    { name: "Kendrick Lamar", cover: "/kendrick-lamar.jpg" },
    { name: "Billie Eilish", cover: "/billie-eilish.jpg" },
    { name: "Arctic Monkeys", cover: "/arctic-monkeys.jpg" },
  ],
  friendsCount: 107,
};
const Page: FC = () => {
  const { name, username, profilePicture, bio, ratingValue, songs, playlists, artists, friendsCount } = userData;

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900">
      <NavBar />
      <div className="flex flex-col md:flex-row gap-6 px-4 py-4 md:px-6 md:py-12">
        <div className="flex flex-col h-full items-center md:items-center gap-6 md:w-1/3 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md space-x-4 space-y-2">
          <div className="w-full text-left">
            <h1 className="text-2xl font-bold">Profile Page</h1>
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
          <div className="w-full text-left mb-0">
            <text className="text-xl font-bold mb-0">Bio</text>
          </div>
          <div className="text-gray-700 dark:text-gray-300">
            {bio.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-6 md:w-2/3">
          <Section title="Pinned Songs" scrollable>
            {songs.map((song, index) => (
              <SongItem key={index} title={song.title} artist={song.artist} cover={song.cover} />
            ))}
          </Section>
          <Section title="Pinned Playlists" scrollable>
            {playlists.map((playlist, index) => (
              <PlaylistItem key={index} title={playlist.title} songs={playlist.songs} cover={playlist.cover} />
            ))}
          </Section>
          <Section title="Pinned Artists" scrollable>
            {artists.map((artist, index) => (
              <ArtistItem key={index} name={artist.name} cover={artist.cover} />
            ))}
          </Section>
        </div>
      </div>
    </div>
  );
};

const Section: FC<{ title: string; scrollable?: boolean; children: React.ReactNode }> = ({ title, scrollable, children }) => (
  <div className="flex flex-col gap-4 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
    <h2 className="text-lg font-medium">{title}</h2>
    <div className={`flex gap-4 ${scrollable ? 'overflow-x-auto' : ''}`}>
      {children}
    </div>
  </div>
);

const SongItem: FC<{ title: string; artist: string; cover: string }> = ({ title, artist, cover }) => (
  <div className="flex flex-col items-center gap-2 p-4 bg-gray-50 dark:bg-gray-700 rounded-md hover:shadow-lg transition-shadow duration-300 min-w-[150px]">
    <img
      alt={`${title} cover`}
      className="rounded-md"
      height={150}
      src={cover}
      style={{ aspectRatio: "1/1", objectFit: "cover" }}
      width={150}
    />
    <div className="text-center">
      <h3 className="font-medium text-gray-900 dark:text-gray-100">{title}</h3>
      <p className="text-sm text-gray-500 dark:text-gray-400">{artist}</p>
    </div>
  </div>
);

const PlaylistItem: FC<{ title: string; songs: number; cover: string }> = ({ title, songs, cover }) => (
  <div className="flex flex-col items-center gap-2 p-4 bg-gray-50 dark:bg-gray-700 rounded-md hover:shadow-lg transition-shadow duration-300 min-w-[150px]">
    <img
      alt={`${title} cover`}
      className="rounded-md"
      height={150}
      src={cover}
      style={{ aspectRatio: "1/1", objectFit: "cover" }}
      width={150}
    />
    <div className="text-center">
      <h3 className="font-medium text-gray-900 dark:text-gray-100">{title}</h3>
      <p className="text-sm text-gray-500 dark:text-gray-400">{songs} songs</p>
    </div>
  </div>
);

const ArtistItem: FC<{ name: string; cover: string }> = ({ name, cover }) => (
  <div className="flex flex-col items-center gap-2 p-4 bg-gray-50 dark:bg-gray-700 rounded-md hover:shadow-lg transition-shadow duration-300 min-w-[150px]">
    <img
      alt={`${name} cover`}
      className="rounded-md"
      height={150}
      src={cover}
      style={{ aspectRatio: "1/1", objectFit: "cover" }}
      width={150}
    />
    <div className="text-center">
      <h3 className="font-medium text-gray-900 dark:text-gray-100">{name}</h3>
    </div>
  </div>
);

export default Page;