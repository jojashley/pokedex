// ============================================================
// TESTS: pokemonUtils
// ============================================================

import { describe, it, expect } from "vitest";
import {
  formatPokemonId,
  formatWeight,
  formatHeight,
  flattenEvolutionChain,
  getIdFromUrl,
} from "../utils/pokemonUtils";
import type { EvolutionChainLink } from "../types/pokemon";

describe("formatPokemonId", () => {
  it("agrega # y rellena con ceros hasta 3 dígitos", () => {
    expect(formatPokemonId(1)).toBe("#001");
    expect(formatPokemonId(25)).toBe("#025");
    expect(formatPokemonId(150)).toBe("#150");
  });
});

describe("formatWeight", () => {
  it("convierte hectogramos a libras correctamente", () => {
    // Bulbasaur pesa 69 hectogramos = 15.2 lbs
    expect(formatWeight(69)).toBe("15.2 lbs.");
  });
});

describe("formatHeight", () => {
  it("convierte decímetros a pies y pulgadas correctamente", () => {
    // Bulbasaur mide 7 decímetros = 2'04"
    expect(formatHeight(7)).toBe("2'04\"");
  });
});

describe("getIdFromUrl", () => {
  it("extrae el id numérico de una url de la API", () => {
    expect(getIdFromUrl("https://pokeapi.co/api/v2/pokemon/25/")).toBe(25);
    expect(getIdFromUrl("https://pokeapi.co/api/v2/pokemon-species/1/")).toBe(1);
  });
});

describe("flattenEvolutionChain", () => {
  it("aplana una cadena de 3 evoluciones", () => {
    const chain: EvolutionChainLink = {
      species: { name: "bulbasaur", url: "" },
      evolves_to: [
        {
          species: { name: "ivysaur", url: "" },
          evolves_to: [
            {
              species: { name: "venusaur", url: "" },
              evolves_to: [],
            },
          ],
        },
      ],
    };

    expect(flattenEvolutionChain(chain)).toEqual([
      "bulbasaur",
      "ivysaur",
      "venusaur",
    ]);
  });

  it("devuelve solo el nombre base si no tiene evoluciones", () => {
    const chain: EvolutionChainLink = {
      species: { name: "ditto", url: "" },
      evolves_to: [],
    };

    expect(flattenEvolutionChain(chain)).toEqual(["ditto"]);
  });
});