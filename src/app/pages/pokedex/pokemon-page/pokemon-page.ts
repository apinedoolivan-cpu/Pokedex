import { Component, inject } from '@angular/core';
import { GameService } from '../../../services/game-service';
import { PokemonDataService } from '../../../services/pokemon-data-service';

@Component({
  selector: 'app-pokemon-page',
  imports: [],
  templateUrl: './pokemon-page.html',
  styleUrl: './pokemon-page.scss',
})
export class PokemonPageComponent {
  public gameService = inject(GameService)
  public pokemonData = inject(PokemonDataService);

  public game = this.gameService.getActiveGame();
  public selectedPokemon = this.pokemonData.getSelectedPokemon();
}
