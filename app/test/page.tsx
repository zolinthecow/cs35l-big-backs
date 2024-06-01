'use client';
import { useEffect, useState } from 'react';

async function fetchWebApi(
  endpoint: string,
  method: string,
  body: any = null,
): Promise<any> {
  const token =
    'BQAXTPaaVg1bdan8TPqvOqICOqkDb2GkOvLdlnXTutK3L0jnhJwcz0_Wj0OAad-i7hLL9r50wc2_ztVrVor0E36bc8p03G8KAi0XsQWbiPOVFSVkXUVIzAk84HemJ0i-i5yWGXG3hGfndkUURGe8oZPYHBXqsWvxiXb7qk2Gczx6lTwxbTmu5z7o6p_AgCIP1rhq';
  const res = await fetch(`https://api.spotify.com/${endpoint}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method,
    body: body ? JSON.stringify(body) : null,
  });
  return await res.json();
}

interface Artist {
  name: string;
}

interface Track {
  name: string;
  artists: Artist[];
  album: {
    images: { url: string }[];
  };
  external_urls: {
    spotify: string;
  };
}

async function getTopTracks(): Promise<Track[]> {
  // Endpoint reference : https://developer.spotify.com/documentation/web-api/reference/get-users-top-artists-and-tracks
  const response = await fetchWebApi(
    'v1/me/top/tracks?time_range=long_term&limit=5',
    'GET',
  );
  return response.items;
}

export default function Page() {
  const [topTracks, setTopTracks] = useState<Track[] | null>(null);

  useEffect(() => {
    getTopTracks().then(setTopTracks);
  }, []);

  return (
    <div>
      {topTracks?.map(({ name, artists, album, external_urls }, index) => (
        <div key={index} className="track">
          <img
            src={album.images[0].url}
            alt={`${name} album cover`}
            width="50"
            height="50"
          />
          <a
            href={external_urls.spotify}
            target="_blank"
            rel="noopener noreferrer"
          >
            {`${name} by ${artists.map((artist) => artist.name).join(', ')}`}
          </a>
        </div>
      ))}
    </div>
  );
}
