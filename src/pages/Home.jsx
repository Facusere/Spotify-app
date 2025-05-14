import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import ArtistList from '../components/ArtistList';
import { searchArtists } from '../api/spotify'; 

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
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '1rem', fontFamily: 'Arial, sans-serif' }}>
      <Header />
      <div style={{ width: '100%', maxWidth: '800px', marginBottom: '2rem' }}>
        <SearchBar 
          value={query} 
          onChange={(value) => setQuery(value)} 
          onKeyDown={handleKeyDown} 
        />
        <button 
          onClick={handleSearch} 
          style={{
            marginTop: '1rem',
            padding: '0.5rem 1rem',
            backgroundColor: '#007BFF',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Buscar
        </button>
      </div>

      <div style={{ width: '100%', maxWidth: '800px', marginBottom: '2rem' }}>
        <ArtistList artists={artists} />
      </div>

      {!artists.length && showFavorites && (
        <div style={{ width: '100%', maxWidth: '800px' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '1rem', color: '#fff' }}>Favoritos</h2>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem' }}>
            <div style={{ flex: 1 }}>
              <h3 style={{ textAlign: 'center', color: '#fff' }}>Artistas</h3>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {favorites.map((fav) => (
                  <li key={fav.id} style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center' }}>
                    <Link to={`/artist/${fav.id}`} style={{ textDecoration: 'none', color: '#fff', display: 'flex', alignItems: 'center' }}>
                      {fav.image && (
                        <img src={fav.image} alt={fav.name} style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '50%', marginRight: '1rem' }} />
                      )}
                      <span style={{ fontSize: '1rem', color: '#fff' }}>{fav.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div style={{ flex: 1 }}>
              <h3 style={{ textAlign: 'center', color: '#fff' }}>Canciones</h3>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {favoriteSongs.map((song) => (
                  <li key={song.id} style={{ marginBottom: '1rem' }}>
                    <Link to={`/album/${song.albumId}`} style={{ textDecoration: 'none', color: '#fff' }}>
                      <p style={{ fontSize: '0.9rem', color: '#fff' }}>
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
  );
}

export default Home;
