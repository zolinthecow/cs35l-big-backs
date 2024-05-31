'use client';
import { useEffect, useState } from 'react';

async function fetchWebApi(
  endpoint: string,
  method: string,
  body: any = null,
): Promise<any> {
  const token =
    'BQBYJZqcEYDY3GHrNTE9gtoOiiT-Z4MwvLkZjVx-3uag_QFKUx10gqsH8hkbth47Sv7uJKE2q9hWXO9IMeHf78uI5zewUGpCvOBCHM5P3aAQKIihs93OP0_FRHrBISTWoS1FZEICzN-wpgRbCdTIFI4qIbFnR5cGJ7mptR7OXjq_Sk1xDBSNuDIwKATSzzncsO6A2dD4YxmS9wkhAe6u8FcVTwBLOHhsu_T7r4tjCLik9cjjdYoF0r7ulTDd37rxnpAOsYI';
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
