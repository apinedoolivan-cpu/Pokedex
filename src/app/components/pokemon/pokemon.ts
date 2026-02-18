import { Component, inject, computed } from '@angular/core';

import { GameErrorComponent } from '../game-error/game-error';
import { PokemonShowcaseComponent } from '../pokemon-showcase/pokemon-showcase';
import { PokemonSearchComponent } from '../pokemon-search/pokemon-search';
import { PokemonInfoComponent } from '../pokemon-info/pokemon-info';
import { GameService } from '../../services/game-service';
import { PokemonDataService } from '../../services/pokemon-data-service';
import { getPokemonTypeById, PokemonType } from '../../models/types.model';

@Component({
  selector: 'app-pokemon',
  imports: [GameErrorComponent, PokemonSearchComponent, PokemonShowcaseComponent, PokemonInfoComponent],
  templateUrl: './pokemon.html',
  styleUrl: './pokemon.scss',
})
export class PokemonComponent {
  private gameService = inject(GameService);
  private pokemonDataService = inject(PokemonDataService);
  
  public pokemon = this.pokemonDataService.getSelectedPokemon();
  public game = this.gameService.getActiveGame();

  readonly pokemonTypes = computed<PokemonType[]>(() => {
    const p = this.pokemon();
    if (!p) return [];

    return p.types
      .map(typeId => getPokemonTypeById(typeId))
      .filter((t): t is PokemonType => !!t);
  });


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
