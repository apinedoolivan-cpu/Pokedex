import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { GameService } from '../../services/game-service';

@Component({
  selector: 'app-game-error',
  imports: [RouterLink],
  templateUrl: './game-error.html',
  styleUrl: './game-error.scss',
})
export class GameErrorComponent {
  private gameService = inject(GameService);

  public activeGame = this.gameService.getActiveGame();
}
