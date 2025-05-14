import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { getAlbum } from '../api/spotify';

function AlbumDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [album, setAlbum] = useState(null);
  const [favoriteSongs, setFavoriteSongs] = useState(
    JSON.parse(localStorage.getItem('favoriteSongs')) || []
  );

  useEffect(() => {
    const fetchAlbumDetails = async () => {
      try {
        const albumData = await getAlbum(id);
        setAlbum(albumData);
      } catch (error) {
        console.error('Error al cargar los detalles del álbum:', error);
      }
    };

    fetchAlbumDetails();
  }, [id]);

  const toggleFavorite = (track) => {
    const isFavorite = favoriteSongs.some((song) => song.id === track.id);

    let updatedFavorites;
    if (isFavorite) {
      updatedFavorites = favoriteSongs.filter((song) => song.id !== track.id);
    } else {
      const newFavorite = {
        id: track.id,
        name: track.name,
        artist: album.artists.map((artist) => artist.name).join(', '),
        album: album.name,
        albumId: album.id,
      };
      updatedFavorites = [...favoriteSongs, newFavorite];
    }

    setFavoriteSongs(updatedFavorites);
    localStorage.setItem('favoriteSongs', JSON.stringify(updatedFavorites));
  };

  return (
    <div style={{ padding: '1rem' }}>
      <Header />
      <button onClick={() => navigate(-1)} style={{ marginBottom: '1rem' }}>
        Volver
      </button>

      {album && (
        <div style={{ textAlign: 'center' }}>
          {album.images[0] && (
            <img
              src={album.images[0].url}
              alt={album.name}
              style={{
                width: '300px',
                height: '300px',
                objectFit: 'cover',
                borderRadius: '8px',
                marginBottom: '1rem',
              }}
            />
          )}
          <h2>{album.name}</h2>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {album.tracks.items.map((track, index) => (
              <li key={track.id} style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center' }}>
                {index + 1}. {track.name}
                <span
                  onClick={() => toggleFavorite(track)}
                  style={{
                    marginLeft: '1rem',
                    cursor: 'pointer',
                    color: favoriteSongs.some((song) => song.id === track.id)
                      ? 'gold'
                      : 'gray',
                  }}
                >
                  ★
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default AlbumDetail;
