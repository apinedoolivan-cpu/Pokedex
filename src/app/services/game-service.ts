import { Injectable, signal } from '@angular/core';
import { PokemonGame } from '../models/pokemon-game.model';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private activeGame = signal<PokemonGame | null>(null);

  setActiveGame(game: PokemonGame) {
    this.activeGame.set(game);
  }

  getActiveGame() {
    console.log(this.activeGame())
    return this.activeGame;
  }
}
