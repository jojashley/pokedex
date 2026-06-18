// ============================================================
// TIPOS Y INTERFACES DE POKÉMON
// Definen la "forma" de los datos que devuelve la PokéAPI.
// ============================================================

// Un elemento simple de la lista: solo nombre y url
export interface PokemonListItem {
  name: string;
  url: string;
}

// La respuesta completa del endpoint de lista de la API
export interface PokemonListResponse {
  count: number;          
  next: string | null;    
  previous: string | null; 
  results: PokemonListItem[];
}

// Un tipo del pokémon 
export interface PokemonType {
  slot: number; 
  type: {
    name: string;
    url: string;
  };
}

// Una habilidad del pokémon
export interface PokemonAbility {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean; 
}

// Las imágenes del pokémon
export interface PokemonSprites {
  front_default: string | null;
  other: {
    "official-artwork": {
      front_default: string | null; 
    };
  };
}

// El pokémon completo con todos sus datos de detalle
export interface Pokemon {
  id: number;
  name: string;
  height: number;  
  weight: number;  
  types: PokemonType[];
  abilities: PokemonAbility[];
  sprites: PokemonSprites;
  species: {
    name: string;
    url: string; 
  };
}

// Datos de la especie
export interface PokemonSpecies {
  egg_groups: { name: string }[];
  genera: { genus: string; language: { name: string } }[]; 
  evolution_chain: { url: string }; 
}

// Un eslabón de la cadena de evolución 
export interface EvolutionChainLink {
  species: { name: string; url: string };
  evolves_to: EvolutionChainLink[]; 
}

// La cadena de evolución completa que devuelve la API
export interface EvolutionChain {
  chain: EvolutionChainLink; 
}