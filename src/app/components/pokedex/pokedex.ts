import { Component, inject, computed } from '@angular/core';
import { RouterModule } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { Subject, debounceTime } from 'rxjs';

import { GameErrorComponent } from '../game-error/game-error';
import { GameService } from '../../services/game-service';
import { PokedexStoreService } from '../../services/pokedex-store-service';
import { PokemonDataService } from '../../services/pokemon-data-service';
import { Pokemon } from '../../models/pokemon.model';
import { PokemonSpriteService } from '../../services/pokemon-sprite-service';

@Component({
  selector: 'app-pokedex',
  standalone: true,
  imports: [RouterModule, GameErrorComponent],
  templateUrl: './pokedex.html',
  styleUrl: './pokedex.scss',
})
export class PokedexComponent {

  private gameService = inject(GameService);
  private store = inject(PokedexStoreService);
  private pokemonData = inject(PokemonDataService);
  public spriteService = inject(PokemonSpriteService);

  readonly activeGame = this.gameService.getActiveGame();
  readonly pokemons = this.store.all;

  private readonly search$ = new Subject<string>();


  readonly search = toSignal(
    this.search$.pipe(debounceTime(100)),
    { initialValue: '' }
  );

  readonly filtered = computed<Pokemon[]>(() => {
    const q = this.search().toLowerCase().trim();
    const list = this.pokemons();

    if (!q) return list;

    return list.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.slug.includes(q)
    );
  });

  onSearch(value: string) {
    this.search$.next(value);
  }

  pokemonSelected(pokemon: Pokemon) {
    this.pokemonData.selectedPokemon(pokemon);
  }
  spriteSelected(pokemon: Pokemon) {
     return this.spriteService.getSmallSpritePath(pokemon)
  }
}
