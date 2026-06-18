// ============================================================
// HOOK: usePokemonList
// Se encarga de traer la lista completa de pokémon y manejar
// los estados de carga y error.
// ============================================================

import { useState, useEffect } from "react";
import { fetchPokemonList, fetchPokemon } from "../services/pokemonService";
import type { Pokemon } from "../types/pokemon";

export const usePokemonList = () => {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPokemon = async () => {
      try {
        setLoading(true);
        setError(null);

        const listResponse = await fetchPokemonList(151);

        const pokemonDetails = await Promise.all(
          listResponse.results.map((p) => fetchPokemon(p.name))
        );

        setPokemon(pokemonDetails);
      } catch (err) {
        setError("No se pudieron cargar los pokémon. Intentá de nuevo.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadPokemon();
  }, []); 

  return { pokemon, loading, error };
};