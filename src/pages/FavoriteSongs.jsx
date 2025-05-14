import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

function FavoriteSongs() {
  const navigate = useNavigate();
  const favoriteSongs = JSON.parse(localStorage.getItem('favoriteSongs')) || [];
  const favoriteArtists = JSON.parse(localStorage.getItem('favorites')) || [];

  return (
    <div style={{ padding: '1rem' }}>
      <Header />
      <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Favoritos</h2>

      {/* Artistas favoritos */}
      <section style={{ marginBottom: '2rem' }}>
        <h3>Artistas Favoritos</h3>
        {favoriteArtists.length === 0 ? (
          <p>No tienes artistas marcados como favoritos.</p>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {favoriteArtists.map((artist) => (
              <li key={artist.id} style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center' }}>
                {artist.image && (
                  <img
                    src={artist.image}
                    alt={artist.name}
                    style={{
                      width: '50px',
                      height: '50px',
                      objectFit: 'cover',
                      borderRadius: '50%',
                      marginRight: '1rem',
                    }}
                  />
                )}
                <div style={{ flexGrow: 1 }}>
                  <strong>{artist.name}</strong>
                </div>
                <button onClick={() => navigate(`/artist/${artist.id}`)}>
                  Ver detalle del artista
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Canciones favoritas */}
      <section>
        <h3>Canciones Favoritas</h3>
        {favoriteSongs.length === 0 ? (
          <p>No tienes canciones marcadas como favoritas.</p>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {favoriteSongs.map((song) => (
              <li key={song.id} style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
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
      </section>
    </div>
  );
}

export default FavoriteSongs;
