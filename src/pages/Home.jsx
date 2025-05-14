import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import ArtistList from '../components/ArtistList';
import { searchArtists } from '../api/spotify'; 
import '../styles/pages/Home.css';

function Home() {
  const [query, setQuery] = useState('');
  const [artists, setArtists] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [favoriteSongs, setFavoriteSongs] = useState([]);
  const [showFavorites, setShowFavorites] = useState(true);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites);

    const storedFavoriteSongs = JSON.parse(localStorage.getItem('favoriteSongs')) || [];
    setFavoriteSongs(storedFavoriteSongs);
  }, []);

  const handleSearch = async () => {
    if (query.trim() === '') return;
    try {
      const res = await searchArtists(query);
      setArtists(res);
      setShowFavorites(false);
    } catch (error) {
      console.error('Error al buscar artistas:', error);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };


  return (
    <div className="home-page">
      <Header />
      <div className="home-page__main-content">
        <div className="home-page__left">
          <div className="home-page__search-container">
            <SearchBar
              value={query}
              onChange={(value) => setQuery(value)}
              onKeyDown={handleKeyDown}
            />
            <button
              onClick={handleSearch}
              className="home-page__search-button"
            >
              Buscar
            </button>
          </div>
          <div className="home-page__artist-list">
            <ArtistList artists={artists} />
          </div>
        </div>
        {!artists.length && showFavorites && (
          <div className="home-page__favorites">
            <h2 className="home-page__favorites-title">Favoritos</h2>
            <div className="home-page__favorites-content">
              <div className="home-page__favorites-section">
                <h3 className="home-page__favorites-section-title">Artistas</h3>
                <ul className="home-page__favorites-list">
                  {favorites.map((fav) => (
                    <li key={fav.id} className="home-page__favorites-item">
                      <Link to={`/artist/${fav.id}`} className="home-page__favorites-link">
                        {fav.image && (
                          <img src={fav.image} alt={fav.name} className="home-page__favorites-img" />
                        )}
                        <span>{fav.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="home-page__favorites-section">
                <h3 className="home-page__favorites-section-title">Canciones</h3>
                <ul className="home-page__favorites-list">
                  {favoriteSongs.map((song) => (
                    <li key={song.id} className="home-page__favorites-item">
                      <Link to={`/album/${song.albumId}`} className="home-page__favorites-link">
                        <p className="home-page__favorites-song">
                          <strong>{song.name}</strong> - {song.artist} ({song.album})
                        </p>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;