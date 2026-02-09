export interface PokemonGame {
  id: string;
  name: string;
  description: string;
  pokedexPath: string;
  coverImage?: string;
}
export const POKEMON_GAMES: PokemonGame[] = [
  {
    id: 'anil',
    name: 'Pokémon Añil',
    description: 'Fangame de Eric Loste ambientado en la región Kanto.',
    pokedexPath: '/assets/anil/pokemon.json',
    coverImage: '/assets/anil/cover.png'
  }
];