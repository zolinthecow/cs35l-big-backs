import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Rating } from "@/components/ui/rating";
import { FC } from "react";

const userData = {
  name: "Freakthan Dao",
  username: "@whatthefreakboi",
  profilePicture: "/ethan.JPG",
  bio: [
    "Ethan is a freaky frontend enthusiast who has a passion for music and mathematics. He loves to grind, to run around Bel Air and admire the beautiful mansions, and to debone chicken wings. When he has free time he also loves to show his friends his special sauce.",
    "Other hobbies include: pregaming din tai fung with shake shack, being nonCHALANT, and celebrating the month of May.",
  ],
  ratingValue: 5,
  songs: [
    { title: "Starlight", artist: "Muse" },
    { title: "Bohemian Rhapsody", artist: "Queen" },
    { title: "Smells Like Teen Spirit", artist: "Nirvana" },
  ],
  playlists: [
    { title: "Chill Vibes", songs: 30 },
    { title: "Workout Motivation", songs: 45 },
    { title: "Indie Gems", songs: 25 },
    { title: "Road Trip", songs: 60 },
  ],
  friends: [
    { name: "Jared Palmer", username: "@jaredpalmer" },
    { name: "Sarah Johnson", username: "@sarahjohnson" },
    { name: "Alex Smith", username: "@alexsmith" },
    { name: "Emily Parker", username: "@emilyparker" },
    { name: "Michael Johnson", username: "@michaeljohnson" },
    { name: "Jessica Lee", username: "@jessicalee" },
  ],
};


const Page: FC = () => {
  const { name, username, profilePicture, bio, ratingValue, songs, playlists, friends } = userData;

  return (
    <div className="flex flex-col items-center gap-6 px-4 py-8 md:px-6 md:py-12">
      <div className="flex flex-col items-center gap-4">
        <Avatar className="h-24 w-24 border-4 border-white dark:border-gray-900">
          <AvatarImage alt={username} src={profilePicture} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <Rating rating={ratingValue} />
        <div className="text-center">
          <h1 className="text-2xl font-bold">{name}</h1>
          <p className="text-gray-500 dark:text-gray-400">{username}</p>
        </div>
      </div>
      <div className="grid w-full max-w-3xl gap-6">
        <div className="grid gap-4">
          <h2 className="text-lg font-medium">Bio</h2>
          <div className="space-y-2">
            {bio.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>
        <div className="grid gap-4">
          <h2 className="text-lg font-medium">Pinned Songs</h2>
          <div className="grid gap-4">
            {songs.map((song, index) => (
              <SongItem key={index} title={song.title} artist={song.artist} />
            ))}
          </div>
        </div>
        <div className="grid gap-4">
          <h2 className="text-lg font-medium">Pinned Playlists</h2>
          <div className="grid grid-cols-2 gap-4">
            {playlists.map((playlist, index) => (
              <PlaylistItem key={index} title={playlist.title} songs={playlist.songs} />
            ))}
          </div>
        </div>
        <div className="grid gap-4">
          <h2 className="text-lg font-medium">Friends</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
            {friends.map((friend, index) => (
              <FriendItem key={index} name={friend.name} username={friend.username} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const SongItem: FC<{ title: string; artist: string }> = ({ title, artist }) => (
  <div className="flex items-center gap-4">
    <img
      alt="Album Cover"
      className="rounded-md"
      height={64}
      src="/album-cover.jpeg"
      style={{
        aspectRatio: "64/64",
        objectFit: "cover",
      }}
      width={64}
    />
    <div className="flex-1">
      <h3 className="font-medium">{title}</h3>
      <p className="text-sm text-gray-500 dark:text-gray-400">{artist}</p>
    </div>
    <Button size="icon" variant="ghost">
      <PlayIcon className="h-5 w-5" />
    </Button>
  </div>
);

const PlaylistItem: FC<{ title: string; songs: number }> = ({ title, songs }) => (
  <div className="flex flex-col gap-2">
    <img
      alt="Playlist Cover"
      className="rounded-md"
      height={200}
      src="/album-cover.jpeg"
      style={{
        aspectRatio: "200/200",
        objectFit: "cover",
      }}
      width={200}
    />
    <div className="text-center">
      <h3 className="font-medium">{title}</h3>
      <p className="text-sm text-gray-500 dark:text-gray-400">{songs} songs</p>
    </div>
  </div>
);

const FriendItem: FC<{ name: string; username: string }> = ({ name, username }) => (
  <div className="flex flex-col items-center gap-2">
    <Avatar className="h-16 w-16">
      <AvatarImage alt={username} src="/placeholder-user.jpg" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
    <div className="text-center">
      <h3 className="font-medium">{name}</h3>
      <p className="text-sm text-gray-500 dark:text-gray-400">{username}</p>
    </div>
  </div>
);

const PlayIcon: FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon points="6 3 20 12 6 21 6 3" />
  </svg>
);

const StarIcon: FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

export default Page;
