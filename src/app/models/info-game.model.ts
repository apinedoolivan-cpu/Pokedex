import { PokemonType } from "./types.model";

export interface PokemonItem {
  id: string;
  name: string;
  description: string;
}
export interface PokemonAbility {
  id: string;
  name: string;
  description: string;
}
export interface PokemonMove {
  id : string;
  name: string;
  type: string;
  category: "Físico" | "Especial" | "De estado";
  power: number;
  acuracy: number;
  pp: number;
  flags?: string[];
  description: string;
}

export interface LevelMove extends PokemonMove {
  level: number;
  pokemonType: PokemonType | undefined;
}

export interface MtMove extends PokemonMove {
  mtNumber: number;
  pokemonType: PokemonType | undefined;
}

export interface ResolvedMove extends PokemonMove {
  pokemonType: PokemonType | undefined;
}
export interface PokemonRoute {
  id: string;
  pokemons: string[];
}
export interface EvolutionNode {
  idPokemon: string;
  method?: string;
  value?: number | string;
  evolvesInto: EvolutionNode[];
}
