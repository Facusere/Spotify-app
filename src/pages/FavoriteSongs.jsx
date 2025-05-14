import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

function FavoriteSongs() {
  const navigate = useNavigate();
  const favoriteSongs = JSON.parse(localStorage.getItem('favoriteSongs')) || [];
  const favoriteArtists = JSON.parse(localStorage.getItem('favorites')) || [];

  return (
    <div className="favorite-songs">
      <Header />
      <h2 className="favorite-songs__title">Favoritos</h2>
      <div className="favorite-songs__content">
        {/* Artistas favoritos */}
        <section className="favorite-songs__section">
          <h3>Artistas Favoritos</h3>
          {favoriteArtists.length === 0 ? (
            <p>No tienes artistas marcados como favoritos.</p>
          ) : (
            <ul className="favorite-songs__list">
              {favoriteArtists.map((artist) => (
                <li key={artist.id} className="favorite-songs__item">
                  {artist.image && (
                    <img
                      src={artist.image}
                      alt={artist.name}
                      className="favorite-songs__img"
                    />
                  )}
                  <div className="favorite-songs__artist-name">
                    <strong>{artist.name}</strong>
                  </div>
                  <button
                    className="favorite-songs__button"
                    onClick={() => navigate(`/artist/${artist.id}`)}
                  >
                    Ver detalle del artista
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* Canciones favoritas */}
        <section className="favorite-songs__section">
          <h3>Canciones Favoritas</h3>
          {favoriteSongs.length === 0 ? (
            <p>No tienes canciones marcadas como favoritas.</p>
          ) : (
            <ul className="favorite-songs__song-list">
              {favoriteSongs.map((song) => (
                <li key={song.id} className="favorite-songs__song-item">
                  <div>
                    <strong>{song.name}</strong> - {song.artist} ({song.album})
                  </div>
                  <button
                    className="favorite-songs__button"
                    onClick={() => navigate(`/album/${song.albumId}`)}
                  >
                    Ver detalle del álbum
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}

export default FavoriteSongs;