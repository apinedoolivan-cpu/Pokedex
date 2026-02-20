import { Component, inject, computed } from '@angular/core';

import { GameErrorComponent } from '../game-error/game-error';
import { PokemonShowcaseComponent } from '../pokemon-showcase/pokemon-showcase';
import { PokemonSearchComponent } from '../pokemon-search/pokemon-search';
import { PokemonInfoComponent } from '../pokemon-info/pokemon-info';
import { PokemonGameInfoComponent } from '../pokemon-game-info/pokemon-game-info';
import { PokemonEvolutionComponent } from '../pokemon-evolution/pokemon-evolution';
import { PokemonStatsComponent } from '../pokemon-stats/pokemon-stats';
import { TypeEffectivenessComponent } from '../pokemon-type-effectiveness/pokemon-type-effectiveness';

import { GameService } from '../../services/game-service';
import { PokemonDataService } from '../../services/pokemon-data-service';
import { getPokemonTypeById, PokemonType } from '../../models/types.model';

@Component({
  selector: 'app-pokemon',
  imports: [GameErrorComponent, PokemonSearchComponent, PokemonShowcaseComponent, PokemonInfoComponent, PokemonGameInfoComponent, 
    PokemonEvolutionComponent, PokemonStatsComponent, TypeEffectivenessComponent],
  templateUrl: './pokemon.html',
  styleUrl: './pokemon.scss',
})
export class PokemonComponent {
  private readonly gameService = inject(GameService);
  private readonly pokemonDataService = inject(PokemonDataService);
  
  public readonly pokemon = this.pokemonDataService.getSelectedPokemon();
  public readonly game = this.gameService.getActiveGame();

  public readonly pokemonTypes = computed<PokemonType[]>(() => {
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
