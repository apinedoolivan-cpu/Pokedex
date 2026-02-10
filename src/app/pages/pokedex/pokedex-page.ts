import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GameService } from '../../services/game-service';
import { PokedexStoreService } from '../../services/pokedex-store-service';
import { PokemonDataService } from '../../services/pokemon-data-service';
import { Pokemon } from '../../models/pokemon.model';

@Component({
  selector: 'app-pokedex-page',
  imports: [RouterModule],
  templateUrl: './pokedex-page.html',
  styleUrl: './pokedex-page.scss',
})
export class PokedexPageComponent {
  private gameService = inject(GameService);
  private store = inject(PokedexStoreService);
  private pokemonData = inject(PokemonDataService);

  readonly activeGame = this.gameService.getActiveGame();
  readonly pokemons = this.store.all;

  pokemonSelected(pokemon: Pokemon){
    this.pokemonData.selectedPokemon(pokemon);
  }
}
