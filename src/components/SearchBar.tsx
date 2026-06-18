// ============================================================
// COMPONENTE: SearchBar
// ============================================================

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string; 
}

const SearchBar = ({
  value,
  onChange,
  placeholder = "Buscar pokémon...",
}: SearchBarProps) => {
  return (
    <div className="search-bar">
      <svg
        className="search-bar__icon"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        aria-hidden="true"
      >
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.35-4.35" />
      </svg>
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="search-bar__input"
        aria-label="Buscar pokémon por nombre o número"
      />
    </div>
  );
};

export default SearchBar;