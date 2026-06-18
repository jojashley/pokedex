// ============================================================
// COMPONENTE: EvolutionChain
// ============================================================

import { useState, useEffect } from "react";
import { fetchPokemon } from "../services/pokemonService";
import type { Pokemon } from "../types/pokemon";

interface EvolutionChainProps {
  evolutionNames: string[]; 
}

const EvolutionChain = ({ evolutionNames }: EvolutionChainProps) => {
  const [evolutions, setEvolutions] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadEvolutions = async () => {
      try {
        setLoading(true);
        const data = await Promise.all(
          evolutionNames.map((name) => fetchPokemon(name))
        );
        setEvolutions(data);
      } catch (err) {
        console.error("Error cargando evoluciones:", err);
      } finally {
        setLoading(false);
      }
    };

    if (evolutionNames.length > 0) {
      loadEvolutions();
    }
  }, [evolutionNames]);

  if (loading) {
    return <p className="evolution-chain__loading">Cargando evoluciones...</p>;
  }

  if (evolutions.length <= 1) {
    return (
      <p className="evolution-chain__empty">
        Este pokémon no tiene evoluciones.
      </p>
    );
  }

  return (
    <div className="evolution-chain">
      {evolutions.map((pokemon, index) => {
        const image =
          pokemon.sprites.other["official-artwork"].front_default ??
          pokemon.sprites.front_default;

        return (
          <div key={pokemon.id} className="evolution-chain__item-wrapper">
            {index > 0 && (
              <span className="evolution-chain__arrow" aria-hidden="true">
                →
              </span>
            )}
            <div className="evolution-chain__item">
              {image && (
                <img
                  src={image}
                  alt={pokemon.name}
                  className="evolution-chain__image"
                />
              )}
              <span className="evolution-chain__name">{pokemon.name}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default EvolutionChain;