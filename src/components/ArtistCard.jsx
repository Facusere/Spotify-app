import { Link } from 'react-router-dom';
import '../styles/components/ArtistCard.css';

function ArtistCard({ artist }) {
  return (
    <div className="artist-card">
      {artist.images[0] && (
        <Link to={`/artist/${artist.id}`}>
          <img src={artist.images[0].url} alt={artist.name}/>
        </Link>
      )}
      <h3>
        <Link to={`/artist/${artist.id}`}>
          {artist.name}
        </Link>
      </h3>
    </div>
  );
}

export default ArtistCard;