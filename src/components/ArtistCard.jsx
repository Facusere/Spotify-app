import { Link } from 'react-router-dom';

function ArtistCard({ artist }) {
  return (
    <div style={{ border: '1px solid #ddd', padding: '1rem', borderRadius: '8px', textAlign: 'center' }}>
      {artist.images[0] && (
        <Link to={`/artist/${artist.id}`}>
          <img src={artist.images[0].url} alt={artist.name} style={{ width: '100%', height: 150, objectFit: 'cover' }} />
        </Link>
      )}
      <h3>
        <Link to={`/artist/${artist.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          {artist.name}
        </Link>
      </h3>
    </div>
  );
}

export default ArtistCard;