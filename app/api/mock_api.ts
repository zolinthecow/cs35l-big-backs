import fs from 'fs';
import path from 'path';

export function fetchAirbudsFromServer(): Promise<any> {
  return new Promise((resolve, reject) => {
    const filePath =
      '/Users/vivekgarg/Documents/CS35L/Project/cs35l-big-backs/components/mock_data/airbuds_data.json';
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        setTimeout(() => {
          resolve(JSON.parse(data));
        }, 3000);
      }
    });
  });
}

export function fetchArtistsFromServer(): Promise<any> {
  return new Promise((resolve, reject) => {
    const filePath =
      '/Users/vivekgarg/Documents/CS35L/Project/cs35l-big-backs/components/mock_data/artist_data.json';
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        setTimeout(() => {
          resolve(JSON.parse(data));
        }, 2000);
      }
    });
  });
}

export function fetchPlaylistsFromServer(): Promise<any> {
  return new Promise((resolve, reject) => {
    const filePath =
      '/Users/vivekgarg/Documents/CS35L/Project/cs35l-big-backs/components/mock_data/playlist_data.json';
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        setTimeout(() => {
          resolve(JSON.parse(data));
        }, 5000);
      }
    });
  });
}

export function fetchSongsFromServer(): Promise<any> {
  return new Promise((resolve, reject) => {
    const filePath =
      '/Users/vivekgarg/Documents/CS35L/Project/cs35l-big-backs/components/mock_data/song_data.json';
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(JSON.parse(data));
      }
    });
  });
}
