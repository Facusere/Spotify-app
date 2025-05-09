const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = 3001;

app.use(cors());

let token = '';
let tokenExpiresAt = 0;

async function getToken() {
  const now = Date.now();
  if (token && now < tokenExpiresAt) return token;

  const response = await axios.post(
    'https://accounts.spotify.com/api/token',
    new URLSearchParams({ grant_type: 'client_credentials' }),
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization:
          'Basic ' +
          Buffer.from(
            process.env.CLIENT_ID + ':' + process.env.CLIENT_SECRET
          ).toString('base64'),
      },
    }
  );

  token = response.data.access_token;
  tokenExpiresAt = now + response.data.expires_in * 1000;

  console.log('Generated Token:', token);

  return token;
}

app.get('/api/search', async (req, res) => {
  const q = req.query.q;
  if (!q) return res.status(400).send('Missing search query');

  const accessToken = await getToken();
  const response = await axios.get(
    `https://api.spotify.com/v1/search?q=${encodeURIComponent(
      q
    )}&type=artist&limit=10`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  res.json(response.data.artists.items);
});

app.get('/api/albums/:artistId', async (req, res) => {
  const accessToken = await getToken();
  const response = await axios.get(
    `https://api.spotify.com/v1/artists/${req.params.artistId}/albums`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  res.json(response.data.items);
});

app.get('/api/artist/:id', async (req, res) => {
  const accessToken = await getToken();
  const response = await axios.get(
    `https://api.spotify.com/v1/artists/${req.params.id}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  res.json(response.data);
});

app.get('/api/album/:id', async (req, res) => {
  const accessToken = await getToken();
  console.log('Token utilizado:', accessToken); // Log the token being used
  console.log('ID del álbum solicitado:', req.params.id); // Log the album ID being requested
  try {
    const response = await axios.get(
      `https://api.spotify.com/v1/albums/${req.params.id}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error('Error al obtener detalles del álbum:', error);
    res.status(500).send('Error al obtener detalles del álbum');
  }
});

app.listen(PORT, () => {
  console.log(`Backend corriendo en http://localhost:${PORT}`);
});
