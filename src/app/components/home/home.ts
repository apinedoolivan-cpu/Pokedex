import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { POKEMON_GAMES } from '../../models/pokemon-game.model';
import { GameService } from '../../services/game-service';
import { PokemonGame } from '../../models/pokemon-game.model';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  games = POKEMON_GAMES;

  public gameService = inject(GameService);

  selectGame(game: PokemonGame) {
    this.gameService.setActiveGame(game)
  }

  private router = inject(Router);

  goToPokedex() {
    this.router.navigate(['/pokedex']);
  }

}
