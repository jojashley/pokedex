// ============================================================
// SERVICIO DE POKÉAPI
// ============================================================

import axios from "axios";
import type {
  PokemonListResponse,
  Pokemon,
  PokemonSpecies,
  EvolutionChain,
} from "../types/pokemon";

const BASE_URL = "https://pokeapi.co/api/v2";

const api = axios.create({
  baseURL: BASE_URL,
});

export const fetchPokemonList = async (
  limit = 151,
  offset = 0
): Promise<PokemonListResponse> => {
  const response = await api.get<PokemonListResponse>(
    `/pokemon?limit=${limit}&offset=${offset}`
  );
  return response.data;
};

export const fetchPokemon = async (
  nameOrId: string | number
): Promise<Pokemon> => {
  const response = await api.get<Pokemon>(`/pokemon/${nameOrId}`);
  return response.data;
};

export const fetchPokemonSpecies = async (
  nameOrId: string | number
): Promise<PokemonSpecies> => {
  const response = await api.get<PokemonSpecies>(
    `/pokemon-species/${nameOrId}`
  );
  return response.data;
};

export const fetchEvolutionChain = async (
  url: string
): Promise<EvolutionChain> => {
  const response = await axios.get<EvolutionChain>(url);
  return response.data;
};