// ============================================================
// UTILIDADES DE POKÉMON
// ============================================================

import type { EvolutionChainLink } from "../types/pokemon";

export const formatPokemonId = (id: number): string => {
  return `#${String(id).padStart(3, "0")}`;
};

export const formatWeight = (weight: number): string => {
  return `${(weight * 0.220462).toFixed(1)} lbs.`;
};

export const formatHeight = (height: number): string => {
  const totalInches = height * 3.93701;
  const feet = Math.floor(totalInches / 12);
  const inches = Math.round(totalInches % 12);
  return `${feet}'${String(inches).padStart(2, "0")}"`;
};

export const flattenEvolutionChain = (chain: EvolutionChainLink): string[] => {
  const names: string[] = [chain.species.name];

  if (chain.evolves_to.length > 0) {
    const next = flattenEvolutionChain(chain.evolves_to[0]);
    names.push(...next);
  }

  return names;
};

export const getIdFromUrl = (url: string): number => {
  const parts = url.split("/").filter(Boolean);
  return Number(parts[parts.length - 1]);
};