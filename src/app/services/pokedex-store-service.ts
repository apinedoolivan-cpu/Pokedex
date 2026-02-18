import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { switchMap, map, catchError, tap, of } from 'rxjs';
import { Pokemon } from '../models/pokemon.model';
import { GameService } from './game-service';

@Injectable({ providedIn: 'root' })
export class PokedexStoreService {

  private readonly http = inject(HttpClient);
  private readonly gameService = inject(GameService);

  private readonly _loading = signal(false);
  private readonly _error = signal<string | null>(null);

  readonly loading = this._loading.asReadonly();
  readonly error = this._error.asReadonly();

  private readonly activeGame = this.gameService.getActiveGame();

  private readonly pokedex$ = toObservable(this.activeGame).pipe(
    switchMap(game => {

      if (!game) {
        this._loading.set(false);
        this._error.set(null);
        return of([] as Pokemon[]);
      }

      this._loading.set(true);
      this._error.set(null);

      return this.http.get<Record<string, any>>(game.pokedexPath).pipe(
        map(raw =>
          Object.values(raw).map(this.normalize)
        ),
        tap(() => this._loading.set(false)),
        catchError(() => {
          this._error.set('No se pudo cargar la Pokédex');
          this._loading.set(false);
          return of([] as Pokemon[]);
        })
      );
    })
  );

  private readonly _list = toSignal(this.pokedex$, {
    initialValue: []
  });

  readonly all = computed(() => this._list());
  
  private normalize(raw: any): Pokemon {
    return {
      ...raw,
      generation: Number(raw.generation),
    };
  }
}
