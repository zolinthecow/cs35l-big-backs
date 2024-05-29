import fs from 'fs';
import path from 'path';

const mockDataFolderPath = path.join(__dirname, 'components/mock_data');

export function fetchAirbudsFromServer(): Promise<any> {
  return new Promise((resolve, reject) => {
    const filePath = path.join(mockDataFolderPath, 'airbuds_data.json');
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(JSON.parse(data));
      }
    });
  });
}

export function fetchArtistsFromServer(): Promise<any> {
  return new Promise((resolve, reject) => {
    const filePath = path.join(mockDataFolderPath, 'artist_data.json');
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(JSON.parse(data));
      }
    });
  });
}

export function fetchPlaylistsFromServer(): Promise<any> {
  return new Promise((resolve, reject) => {
    const filePath = path.join(mockDataFolderPath, 'playlist_data.json');
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(JSON.parse(data));
      }
    });
  });
}

export function fetchSongsFromServer(): Promise<any> {
  return new Promise((resolve, reject) => {
    const filePath = path.join(mockDataFolderPath, 'song_data.json');
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(JSON.parse(data));
      }
    });
  });
}
