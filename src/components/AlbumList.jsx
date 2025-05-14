import AlbumCard from './AlbumCard';
import '../styles/components/AlbumList.css';

function AlbumList({ albums }) {
  return (
    <div className="album-list">
      {albums.map((album) => (
        <AlbumCard key={album.id} album={album} />
      ))}
    </div>
  );
}

export default AlbumList;