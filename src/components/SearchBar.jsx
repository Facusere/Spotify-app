import '../styles/components/SearchBar.css';

function SearchBar({ value, onChange, onKeyDown }) {
  return (
    <input
      type="text"
      placeholder="Buscar artista..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={onKeyDown}
      className="search-bar"
    />
  );
}

export default SearchBar;