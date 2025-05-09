import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AlbumList from '../components/AlbumList';
import Header from '../components/Header';

function ArtistDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [artist, setArtist] = useState(null);
  const [albums, setAlbums] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchArtistAndAlbums = async () => {
      try {
        const [artistRes, albumsRes] = await Promise.all([
          axios.get(`/api/artist/${id}`),
          axios.get(`/api/albums/${id}`),
        ]);
        setArtist(artistRes.data);
        setAlbums(albumsRes.data);

        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        setIsFavorite(favorites.some((fav) => fav.id === id));
      } catch (error) {
        console.error('Error al cargar artista y álbumes:', error.response?.status, error.response?.data);
      }
    };

    fetchArtistAndAlbums();
  }, [id]);

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    if (isFavorite) {
      const updatedFavorites = favorites.filter((fav) => fav.id !== id);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    } else {
      const newFavorite = { id, name: artist.name, image: artist.images[0]?.url };
      favorites.push(newFavorite);
      localStorage.setItem('favorites', JSON.stringify(favorites));
    }
    setIsFavorite(!isFavorite);
  };

  return (
    <div style={{ padding: '1rem' }}>
      <Header />
      <button onClick={() => navigate(-1)} style={{ marginBottom: '1rem' }}>
        Volver
      </button>

      {artist && (
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          {artist.images[0] && (
            <img src={artist.images[0].url} alt={artist.name} style={{ height: 200, borderRadius: '8px' }} />
          )}
          <h2 style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {artist.name}
            <span
              onClick={toggleFavorite}
              style={{
                marginLeft: '1rem',
                cursor: 'pointer',
                color: isFavorite ? 'gold' : 'gray',
              }}
            >
              ★
            </span>
          </h2>
        </div>
      )}

      <AlbumList albums={albums} />
    </div>
  );
}

export default ArtistDetail;