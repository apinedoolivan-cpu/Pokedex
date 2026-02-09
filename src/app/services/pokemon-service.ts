import { Injectable, signal, computed, effect, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pokemon } from '../models/pokemon.model';
import { GameService } from './game-service';

@Injectable({ providedIn: 'root' })
export class PokedexStore {

  private readonly http = inject(HttpClient);
  private readonly gameService = inject(GameService);

  private readonly _list = signal<Pokemon[]>([]);
  private readonly _loading = signal(false);
  private readonly _error = signal<string | null>(null);

  readonly all = computed(() => this._list());
  readonly loading = this._loading.asReadonly();
  readonly error = this._error.asReadonly();

  constructor() {
    effect(() => {
      const game = this.gameService.getActiveGame()();
      if (!game) {
        this._list.set([]);
        return;
      }

      this.loadPokedex(game.pokedexPath);
    });
  }

  private loadPokedex(path: string) {
    this._loading.set(true);
    this._error.set(null);

    this.http.get<Record<string, any>>(path).subscribe({
      next: raw => {
        const normalized = Object.values(raw).map(this.normalize);
        this._list.set(normalized);
        this._loading.set(false);
      },
      error: () => {
        this._error.set('No se pudo cargar la Pokédex');
        this._list.set([]);
        this._loading.set(false);
      }
    });
  }

  private normalize(raw: any): Pokemon {
    return {
      ...raw,
      generation: Number(raw.generation),
    };
  }
}
