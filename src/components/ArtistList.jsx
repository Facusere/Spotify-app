import ArtistCard from './ArtistCard';
import '../styles/components/ArtistList.css';

function ArtistList({ artists }) {
  return (
    <div className="artist-list">
      {artists.map((artist) => (
        <ArtistCard key={artist.id} artist={artist} />
      ))}
    </div>
  );
}

export default ArtistList;