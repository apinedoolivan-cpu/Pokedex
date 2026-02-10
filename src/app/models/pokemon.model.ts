export interface Pokemon {
  id: string;
  name: string;
  slug: string;
  types: string[];

  baseStats: {
    hp: number;
    attack: number;
    defense: number;
    speed: number;
    specialAttack: number;
    specialDefense: number;
  };

  abilities: string[];
  hiddenAbilities?: string[];

  moves: {
    level: number;
    move: string;
  }[];

  tutorMoves?: string[];
  eggMoves?: string[];
  eggGroups?: string[];

  evs?: {
    stat: string;
    value: number;
  }[];

  evolutions?: {
    to: string;
    method: string;
    value: number | string;
  }[];

  heldItems?: {
    common?: string;
    uncommon?: string;
    rare?: string;
  };

  height?: number;
  weight?: number;
  color?: string;
  shape?: string;
  habitat?: string;
  category?: string;
  pokedexEntry?: string;
  generation: string;
}

export type PokedexMap = Record<string, Pokemon>;