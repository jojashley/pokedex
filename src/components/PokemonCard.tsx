// ============================================================
// COMPONENTE: PokemonCard
// ============================================================

import type { Pokemon } from "../types/pokemon";
import { formatPokemonId } from "../utils/pokemonUtils";

interface PokemonCardProps {
  pokemon: Pokemon;
  isSelected: boolean;
  onClick: () => void;
}

const PokemonCard = ({ pokemon, isSelected, onClick }: PokemonCardProps) => {
  const image =
    pokemon.sprites.other["official-artwork"].front_default ??
    pokemon.sprites.front_default;

  return (
    <button
      onClick={onClick}
      className={`pokemon-card ${isSelected ? "pokemon-card--selected" : ""}`}
      aria-label={`Ver detalles de ${pokemon.name}`}
      aria-pressed={isSelected}
    >
      {image && (
        <img
          src={image}
          alt={pokemon.name}
          className="pokemon-card__image"
          loading="lazy"
        />
      )}
      <span className="pokemon-card__name">{pokemon.name}</span>
      <span className="pokemon-card__id">{formatPokemonId(pokemon.id)}</span>
    </button>
  );
};

export default PokemonCard;