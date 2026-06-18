// ============================================================
// PÁGINA: HomePage
// ============================================================

import { useState, useMemo } from "react";
import { usePokemonList } from "../hooks/usePokemonList";
import PokemonCard from "../components/PokemonCard";
import PokemonDetail from "../components/PokemonDetail";
import SearchBar from "../components/SearchBar";

const HomePage = () => {
  const { pokemon, loading, error } = usePokemonList();
  const [selectedId, setSelectedId] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPokemon = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();

    if (!query) return pokemon;

    return pokemon.filter((p) => {
      const matchesName = p.name.toLowerCase().includes(query);
      const matchesId = String(p.id).includes(query);
      return matchesName || matchesId;
    });
  }, [pokemon, searchQuery]);

  if (loading) {
    return (
      <div className="home-page__loading" aria-live="polite">
        <p>Cargando Pokédex...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="home-page__error" aria-live="polite">
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>
          Reintentar
        </button>
      </div>
    );
  }

  return (
    <div className="home-page">
      <aside className="home-page__sidebar" aria-label="Lista de pokémon">
        <ul className="pokemon-list" role="list">
          {filteredPokemon.map((p) => (
            <li key={p.id}>
              <PokemonCard
                pokemon={p}
                isSelected={p.id === selectedId}
                onClick={() => setSelectedId(p.id)}
              />
            </li>
          ))}
          
          {filteredPokemon.length === 0 && (
            <li className="pokemon-list__empty">
              No se encontraron pokémon con "{searchQuery}"
            </li>
          )}
        </ul>
      </aside>

      {/* ── Panel derecho: detalle ── */}
      <main className="home-page__detail">
        <div className="home-page__search">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
          />
        </div>
        <PokemonDetail nameOrId={selectedId} />
      </main>
    </div>
  );
};

export default HomePage;