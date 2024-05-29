'use client';
type ArtistLayoutProps = {
  artist: string;
  artist_url: string;
  className?: string;
};

export function ArtistLayout({
  artist,
  artist_url,
  className,
}: ArtistLayoutProps) {
  return (
    <div
      className={`relative flex items-center space-x-4 p-4 bg-white rounded-lg shadow-lg ${className}`}
    >
      <img
        alt="Album Cover"
        className="w-20 h-20 rounded-lg object-cover"
        src={artist_url}
      />
      <div className="flex flex-col justify-center flex-1 min-w-0">
        <h1 className="font-bold text-[18px] text-gray-900 truncate">
          {artist}
        </h1>
      </div>
    </div>
  );
}
