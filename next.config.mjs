/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'upload.wikimedia.org',
      'i.scdn.co',
      'cdns-images.dzcdn.net',
      's3.amazonaws.com',
      'static.wikia.nocookie.net',
      'media.them.us',
      'avatar.iran.liara.run',
      'nationaltoday.com',
      'static.standard.co.uk',
      'variety.com',
      'imageio.forbes.com',
      'encrypted-tbn2.gstatic.com',
      'static-00.iconduck.com',
      'img.freepik.com',
      'image-cdn-ak.spotifycdn.com',
      'blend-playlist-covers.spotifycdn.com',
      'mosaic.scdn.co',
      'daily-mix.scdn.co',
      'image-cdn-ak.spotifycdn.com',
      'image-cdn-fa.spotifycdn.com',
      'seed-mix-image.spotifycdn.com',
      'i2o.scdn.co',
      'open.spotify.com',
      'blend-playlist-covers.spotifycdn.com',
    ],
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/home',
      },
    ];
  },
};

export default nextConfig;
