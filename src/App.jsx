import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ArtistDetail from './pages/ArtistDetail';
import AlbumDetail from './pages/AlbumDetail';
import FavoriteSongs from './pages/FavoriteSongs';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/artist/:id" element={<ArtistDetail />} />
      <Route path="/album/:id" element={<AlbumDetail />} />
      <Route path="/favorites" element={<FavoriteSongs />} />
    </Routes>
  );
}

export default App;

