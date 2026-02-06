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
    pokedexPath: 'assets/games/anil/pokemons.json',
    coverImage: 'assets/games/anil/cover.png'
  }
];