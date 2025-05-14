import axios from 'axios';

let token = null;
let expiresAt = 0;

async function getToken() {
  const now = Date.now();

  if (token && now < expiresAt) return token;

  const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
  const clientSecret = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;

  const response = await axios.post(
    'https://accounts.spotify.com/api/token',
    new URLSearchParams({ grant_type: 'client_credentials' }),
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: 'Basic ' + btoa(`${clientId}:${clientSecret}`),
      },
    }
  );

  token = response.data.access_token;
  expiresAt = now + response.data.expires_in * 1000;
  return token;
}

export async function searchArtists(query) {
  const accessToken = await getToken();
  const response = await axios.get('https://api.spotify.com/v1/search', {
    headers: { Authorization: `Bearer ${accessToken}` },
    params: {
      q: query,
      type: 'artist',
      limit: 10,
    },
  });
  return response.data.artists.items;
}

export async function getArtist(id) {
  const accessToken = await getToken();
  const response = await axios.get(`https://api.spotify.com/v1/artists/${id}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return response.data;
}

export async function getAlbums(artistId) {
  const accessToken = await getToken();
  const response = await axios.get(`https://api.spotify.com/v1/artists/${artistId}/albums`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return response.data.items;
}

export async function getAlbum(id) {
  const accessToken = await getToken();
  const response = await axios.get(`https://api.spotify.com/v1/albums/${id}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return response.data;
}
