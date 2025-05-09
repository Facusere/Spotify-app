import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

function FavoriteSongs() {
  const navigate = useNavigate();
  const favoriteSongs = JSON.parse(localStorage.getItem('favoriteSongs')) || [];
  const favoriteArtists = JSON.parse(localStorage.getItem('favorites')) || [];

  return (
    <div style={{ padding: '1rem' }}>
      <Header />
      <h2>Favoritos</h2>

      <h3>Artistas Favoritos</h3>
      {favoriteArtists.length === 0 ? (
        <p>No tienes artistas marcados como favoritos.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {favoriteArtists.map((artist) => (
            <li key={artist.id} style={{ marginBottom: '1rem' }}>
              <div>
                <strong>{artist.name}</strong>
                {artist.image && (
                  <img
                    src={artist.image}
                    alt={artist.name}
                    style={{ height: '50px', marginLeft: '1rem', borderRadius: '50%' }}
                  />
                )}
              </div>
              <button onClick={() => navigate(`/artist/${artist.id}`)}>
                Ver detalle del artista
              </button>
            </li>
          ))}
        </ul>
      )}

      <h3>Canciones Favoritas</h3>
      {favoriteSongs.length === 0 ? (
        <p>No tienes canciones marcadas como favoritas.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {favoriteSongs.map((song) => (
            <li key={song.id} style={{ marginBottom: '1rem' }}>
              <div>
                <strong>{song.name}</strong> - {song.artist} ({song.album})
              </div>
              <button onClick={() => navigate(`/album/${song.albumId}`)}>
                Ver detalle del álbum
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default FavoriteSongs;
