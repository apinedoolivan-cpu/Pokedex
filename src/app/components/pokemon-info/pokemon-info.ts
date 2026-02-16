import { Component, inject } from '@angular/core';

import { GameErrorComponent } from '../game-error/game-error';
import { PokemonShowcaseComponent } from '../pokemon-showcase/pokemon-showcase';
import { PokemonSearchComponent } from '../pokemon-search/pokemon-search';
import { GameService } from '../../services/game-service';

@Component({
  selector: 'app-pokemon-info',
  imports: [GameErrorComponent, PokemonSearchComponent, PokemonShowcaseComponent],
  templateUrl: './pokemon-info.html',
  styleUrl: './pokemon-info.scss',
})
export class PokemonInfoComponent {
  public gameService = inject(GameService);
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
