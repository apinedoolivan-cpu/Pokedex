import { Component, inject } from '@angular/core';

import { GameService } from '../../services/game-service';

import { POKEMON_GAMES } from '../../models/pokemon-game.model';
import { PokemonGame } from '../../models/pokemon-game.model';

@Component({
  selector: 'app-home-page',
  standalone: true,
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
})
export class HomePage {
  games = POKEMON_GAMES;

  public gameService = inject(GameService);

  selectGame(game: PokemonGame) {
    this.gameService.setActiveGame(game)
  }
}
