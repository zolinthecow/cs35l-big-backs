// // pages/playlists/[id].tsx
// import { GetServerSideProps } from 'next';
// import { useRouter } from 'next/router';
// import { TitleLayout } from '@/components/ui/playlists/title-layout';
// import { ListofSongsLayout } from '@/components/ui/playlists/song-list-layout';
// import { NavBar } from '@/components/navbar';
// import getSpotifyClient from '@/lib/spotify';

// interface PlaylistItem {
//   id: string;
//   name: string;
//   images: {
//     url: string;
//   }[];
// }

// interface SongItem {
//   track: {
//     id: string;
//     name: string;
//     artists: Artist[];
//     duration_ms: string;
//     album: {
//       name: string;
//       images: {
//         url: string;
//       }[];
//     };
//     external_urls: {
//       spotify: string;
//     };
//   };
// }

// interface Artist {
//   name: string;
// }

// interface PlaylistPageProps {
//   playlist: PlaylistItem;
//   songs: SongItem[];
// }

// const PlaylistPage: React.FC<PlaylistPageProps> = ({ playlist, songs }) => {
//   return (
//     <div className="grid grid-rows-[auto_1fr] h-screen w-full">
//       <NavBar />
//       <div className="grid grid-cols-[240px_1fr]">
//         <div className="custom-bg-cream text-gray-700 p-6 overflow-y-auto max-h-screen">
//           {/* Sidebar content goes here */}
//         </div>
//         <div className="flex flex-col p-6 overflow-y-auto max-h-screen">
//           {/* <TitleLayout name={playlist.name} images={playlist.images[0]} /> */}
//           <div className="mt-8 space-y-4 overflow-y-auto">
//             <ListofSongsLayout songs={songs} />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const { id } = context.params as { id: string };

//   // Fetch playlist data
//   const playlistResponse = await fetchData2(`https://api.spotify.com/v1/playlists/${id}`);
//   if (!playlistResponse.ok) {
//     return { notFound: true };
//   }

//   const playlistData = await playlistResponse.json();

//   const playlist = {
//     id: playlistData.id,
//     name: playlistData.name,
//     images: playlistData.images,
//   };

//   const songs = playlistData.tracks.items.map((item: any) => ({
//     track: {
//       id: item.track.id,
//       name: item.track.name,
//       artists: item.track.artists,
//       duration_ms: item.track.duration_ms,
//       album: item.track.album,
//       external_urls: item.track.external_urls,
//     },
//   }));

//   return {
//     props: {
//       playlist,
//       songs,
//     },
//   };
// };

// async function fetchData2(endpoint: string) {
//     const spotifyClient = await getSpotifyClient();
//     console.log('HI PLEASE WORK', spotifyClient);
//     const resp = await spotifyClient.get(endpoint);
//     console.log('HI PLEASE WORK', resp.data.items);
//     return resp.data.items;
// }

// export default PlaylistPage;
