import { Component, inject } from '@angular/core';
import { POKEMON_GAMES } from '../../models/pokemon-game.model';
import { PokemonGame } from '../../models/pokemon-game.model';
import { GameService } from '../../services/game-service';

@Component({
  selector: 'app-home-page',
  imports: [],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
})
export class HomePageComponent {
  games = POKEMON_GAMES;

  public gameService = inject(GameService);

  selectGame(game: PokemonGame) {
    this.gameService.setActiveGame(game)
  }
}
