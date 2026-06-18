// ============================================================
// HOOK: usePokemonDetail
// Trae todos los datos de un pokémon específico:
// su info básica, su especie y su cadena de evolución.
// ============================================================

import { useState, useEffect } from "react";
import {
  fetchPokemon,
  fetchPokemonSpecies,
  fetchEvolutionChain,
} from "../services/pokemonService";
import type { Pokemon, PokemonSpecies, EvolutionChain } from "../types/pokemon";

export const usePokemonDetail = (nameOrId: string | number) => {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [species, setSpecies] = useState<PokemonSpecies | null>(null);
  const [evolutionChain, setEvolutionChain] = useState<EvolutionChain | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadDetail = async () => {
      try {
        setLoading(true);
        setError(null);

        const pokemonData = await fetchPokemon(nameOrId);
        setPokemon(pokemonData);

        const speciesData = await fetchPokemonSpecies(pokemonData.species.name);
        setSpecies(speciesData);

        const evoData = await fetchEvolutionChain(
          speciesData.evolution_chain.url
        );
        setEvolutionChain(evoData);
      } catch (err) {
        setError("No se pudieron cargar los datos. Intentá de nuevo.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadDetail();
  }, [nameOrId]); 

  return { pokemon, species, evolutionChain, loading, error };
};