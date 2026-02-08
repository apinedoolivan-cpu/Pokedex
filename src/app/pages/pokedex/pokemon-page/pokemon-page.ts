import { Component, inject } from '@angular/core';
import { GameService } from '../../../services/game-service';

@Component({
  selector: 'app-pokemon-page',
  imports: [],
  templateUrl: './pokemon-page.html',
  styleUrl: './pokemon-page.scss',
})
export class PokemonPageComponent {
  public gameService = inject(GameService)

  public game = this.gameService.getActiveGame();

  dameJuego(){
    console.log(this.game());
  }
}
