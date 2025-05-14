import { Link } from 'react-router-dom';
import '../styles/components/AlbumCard.css';

function AlbumCard({ album }) {
  return (
    <div className="album-card">
      {album.images[0] && (
        <Link to={`/album/${album.id}`}>
          <img src={album.images[0].url} alt={album.name} />
        </Link>
      )}
      <h4>
        <Link to={`/album/${album.id}`}>
          {album.name}
        </Link>
      </h4>
      <p>{new Date(album.release_date).getFullYear()}</p>
    </div>
  );
}

export default AlbumCard;