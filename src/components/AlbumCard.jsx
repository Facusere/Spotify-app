import { Link } from 'react-router-dom';

function AlbumCard({ album }) {
  return (
    <div style={{ border: '1px solid #ccc', padding: '1rem', borderRadius: '8px', textAlign: 'center' }}>
      {album.images[0] && (
        <Link to={`/album/${album.id}`}>
          <img src={album.images[0].url} alt={album.name} style={{ width: '100%', height: 150, objectFit: 'cover' }} />
        </Link>
      )}
      <h4>
        <Link to={`/album/${album.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          {album.name}
        </Link>
      </h4>
      <p>{new Date(album.release_date).getFullYear()}</p>
    </div>
  );
}

export default AlbumCard;