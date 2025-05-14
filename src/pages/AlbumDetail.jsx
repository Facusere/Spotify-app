import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { getAlbum } from '../api/spotify';
import '../styles/pages/AlbumDetail.css';

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
    <div className="album-detail">
      <Header />
      <button
        onClick={() => navigate(-1)}
        className="album-detail__back-btn"
      >
        Volver
      </button>

      {album && (
        <div className="album-detail__content">
          {album.images[0] && (
            <img
              src={album.images[0].url}
              alt={album.name}
              className="album-detail__img"
            />
          )}
          <h2>{album.name}</h2>
          <ul className="album-detail__tracks">
            {album.tracks.items.map((track, index) => (
              <li key={track.id} className="album-detail__track">
                {index + 1}. {track.name}
                <span
                  onClick={() => toggleFavorite(track)}
                  className={
                    favoriteSongs.some((song) => song.id === track.id)
                      ? 'album-detail__star album-detail__star--active'
                      : 'album-detail__star'
                  }
                  title="Agregar/Quitar de favoritos"
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