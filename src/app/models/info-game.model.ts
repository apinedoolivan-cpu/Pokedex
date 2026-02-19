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
  type: PokemonType;
  category: "Físico" | "Especial" | "De estado";
  power: number;
  acuracy: number;
  pp: number;
  description: string;
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
