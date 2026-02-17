import { Injectable, signal } from '@angular/core';
import { Pokemon } from '../models/pokemon.model';

@Injectable({
  providedIn: 'root',
})
export class PokemonDataService {
  private  _pokemonSelected = signal<Pokemon | null>(null);

  selectedPokemon(pokemon: Pokemon) {
    this._pokemonSelected.set(pokemon);
  }
  getSelectedPokemon(){
    return this._pokemonSelected;
  }
}
