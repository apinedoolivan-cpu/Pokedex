import { Component, inject } from '@angular/core';

import { GameErrorComponent } from '../game-error/game-error';
import { PokemonShowcaseComponent } from '../pokemon-showcase/pokemon-showcase';
import { PokemonSearchComponent } from '../pokemon-search/pokemon-search';
import { GameService } from '../../services/game-service';
import { PokemonDataService } from '../../services/pokemon-data-service';

@Component({
  selector: 'app-pokemon',
  imports: [GameErrorComponent, PokemonSearchComponent, PokemonShowcaseComponent],
  templateUrl: './pokemon.html',
  styleUrl: './pokemon.scss',
})
export class PokemonComponent {
  private gameService = inject(GameService);
  private pokemonDataService = inject(PokemonDataService);
  
  public pokemon = this.pokemonDataService.getSelectedPokemon();
  public game = this.gameService.getActiveGame();

  selectedTab = 'caracteristicas';
  
  tabs = [
    { id: 'caracteristicas', label: 'Características' },
    { id: 'ubicacion', label: 'Ubicación' },
    { id: 'evolucion', label: 'Evolución' },
    { id: 'estadisticas', label: 'Estadísticas' },
    { id: 'efectividad', label: 'Efectividad' },
    { id: 'movimientos', label: 'Movimientos' }
  ];
  
  selectTab(tabId: string) {
    this.selectedTab = tabId;
  }

}
