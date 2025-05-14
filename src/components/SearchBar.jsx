function SearchBar({ value, onChange, onKeyDown }) {
  return (
    <input
      type="text"
      placeholder="Buscar artista..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={onKeyDown}
      style={{ padding: '0.5rem', width: '100%', marginBottom: '1rem' }}
    />
  );
}

export default SearchBar;