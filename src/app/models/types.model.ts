export interface PokemonType {
  id: string;
  name: string;
  color: string;
  mtType: string;
  weaknesses: string[];
  resistances: string[];
}
export const POKEMON_TYPES: PokemonType[] = [
  {
    id: 'NORMAL',
    name: 'Normal',
    color: '#A8A878',
    mtType: 'NORMAL',
    weaknesses: ['FIGHTING'],
    resistances: []
  },
  {
    id: 'FIGHTING',
    name: 'Lucha',
    color: '#C03028',
    mtType: 'FIGHTING',
    weaknesses: ['FLYING', 'PSYCHIC', 'FAIRY'],
    resistances: ['ROCK', 'BUG', 'DARK']
  },
  {
    id: 'FLYING',
    name: 'Volador',
    color: '#A890F0',
    mtType: 'FLYING',
    weaknesses: ['ROCK', 'ELECTRIC', 'ICE'],
    resistances: ['FIGHTING', 'BUG', 'GRASS']
  },
  {
    id: 'POISON',
    name: 'Veneno',
    color: '#A040A0',
    mtType: 'POISON',
    weaknesses: ['GROUND', 'PSYCHIC'],
    resistances: ['FIGHTING', 'POISON', 'BUG', 'GRASS', 'FAIRY']
  },
  {
    id: 'GROUND',
    name: 'Tierra',
    color: '#E0C068',
    mtType: 'GROUND',
    weaknesses: ['WATER', 'GRASS', 'ICE'],
    resistances: ['POISON', 'ROCK']
  },
  {
    id: 'ROCK',
    name: 'Roca',
    color: '#B8A038',
    mtType: 'ROCK',
    weaknesses: ['FIGHTING', 'GROUND', 'STEEL', 'WATER', 'GRASS'],
    resistances: ['NORMAL', 'FLYING', 'POISON', 'FIRE']
  },
  {
    id: 'BUG',
    name: 'Bicho',
    color: '#A8B820',
    mtType: 'BUG',
    weaknesses: ['FLYING', 'ROCK', 'FIRE'],
    resistances: ['FIGHTING', 'GROUND', 'GRASS']
  },
  {
    id: 'GHOST',
    name: 'Fantasma',
    color: '#705898',
    mtType: 'GHOST',
    weaknesses: ['GHOST', 'DARK'],
    resistances: ['POISON', 'BUG']
  },
  {
    id: 'STEEL',
    name: 'Acero',
    color: '#B8B8D0',
    mtType: 'STEEL',
    weaknesses: ['FIGHTING', 'GROUND', 'FIRE'],
    resistances: ['NORMAL', 'FLYING', 'ROCK', 'BUG', 'STEEL', 'GRASS', 'PSYCHIC', 'ICE', 'DRAGON', 'FAIRY']
  },
  {
    id: 'FIRE',
    name: 'Fuego',
    color: '#F08030',
    mtType: 'FIRE',
    weaknesses: ['GROUND', 'ROCK', 'WATER'],
    resistances: ['BUG', 'STEEL', 'FIRE', 'GRASS', 'ICE', 'FAIRY']
  },
  {
    id: 'WATER',
    name: 'Agua',
    color: '#6890F0',
    mtType: 'WATER',
    weaknesses: ['GRASS', 'ELECTRIC'],
    resistances: ['STEEL', 'FIRE', 'WATER', 'ICE']
  },
  {
    id: 'GRASS',
    name: 'Planta',
    color: '#78C850',
    mtType: 'GRASS',
    weaknesses: ['FLYING', 'POISON', 'BUG', 'FIRE', 'ICE'],
    resistances: ['GROUND', 'WATER', 'GRASS', 'ELECTRIC']
  },
  {
    id: 'ELECTRIC',
    name: 'Eléctrico',
    color: '#F8D030',
    mtType: 'ELECTRIC',
    weaknesses: ['GROUND'],
    resistances: ['FLYING', 'STEEL', 'ELECTRIC']
  },
  {
    id: 'PSYCHIC',
    name: 'Psíquico',
    color: '#F85888',
    mtType: 'PSYCHIC',
    weaknesses: ['BUG', 'GHOST', 'DARK'],
    resistances: ['FIGHTING', 'PSYCHIC']
  },
  {
    id: 'ICE',
    name: 'Hielo',
    color: '#98D8D8',
    mtType: 'ICE',
    weaknesses: ['FIGHTING', 'ROCK', 'STEEL', 'FIRE'],
    resistances: ['ICE']
  },
  {
    id: 'DRAGON',
    name: 'Dragón',
    color: '#7038F8',
    mtType: 'DRAGON',
    weaknesses: ['ICE', 'DRAGON', 'FAIRY'],
    resistances: ['FIRE', 'WATER', 'GRASS', 'ELECTRIC']
  },
  {
    id: 'DARK',
    name: 'Siniestro',
    color: '#705848',
    mtType: 'DARK',
    weaknesses: ['FIGHTING', 'BUG', 'FAIRY'],
    resistances: ['GHOST', 'DARK']
  },
  {
    id: 'FAIRY',
    name: 'Hada',
    color: '#EE99AC',
    mtType: 'FAIRY',
    weaknesses: ['POISON', 'STEEL'],
    resistances: ['FIGHTING', 'BUG', 'DARK']
  }
];

export interface TypeEffectiveness {
  quadWeak: PokemonType[];    
  doubleWeak: PokemonType[];   
  neutral: PokemonType[];   
  resistant: PokemonType[];    
  quadResistant: PokemonType[]; 
  immune: PokemonType[];       
}

export function getPokemonTypeById(id: string): PokemonType | undefined {
  return POKEMON_TYPES.find(type => type.id === id);
}

export function getPokemonTypeByName(name: string): PokemonType | undefined {
  return POKEMON_TYPES.find(type => type.name.toLowerCase() === name.toLowerCase());
}