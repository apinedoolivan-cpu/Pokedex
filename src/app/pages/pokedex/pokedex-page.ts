import { Component, inject } from '@angular/core';
import { GameService } from '../../services/game-service';

@Component({
  selector: 'app-pokedex-page',
  imports: [],
  templateUrl: './pokedex-page.html',
  styleUrl: './pokedex-page.scss',
})
export class PokedexPageComponent {
  public gameService = inject(GameService);

  activeGame = this.gameService.getActiveGame();
}
