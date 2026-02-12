import { Component, inject } from '@angular/core';

import { GameErrorComponent } from '../game-error/game-error';
import { GameService } from '../../services/game-service';
import { PokemonDataService } from '../../services/pokemon-data-service';
import { PokemonSpriteService } from '../../services/pokemon-sprite-service';

@Component({
  selector: 'app-pokemon-info',
  imports: [GameErrorComponent],
  templateUrl: './pokemon-info.html',
  styleUrl: './pokemon-info.scss',
})
export class PokemonInfoComponent {
  public gameService = inject(GameService);
  public pokemonData = inject(PokemonDataService);
  public spriteService = inject(PokemonSpriteService);

  public game = this.gameService.getActiveGame();
  public selectedPokemon = this.pokemonData.getSelectedPokemon();
  public spritePath = this.spriteService.getSpritePath(this.selectedPokemon);
}
