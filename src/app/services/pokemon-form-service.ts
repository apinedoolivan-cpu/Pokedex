import { Injectable, inject, signal, effect } from '@angular/core';
import { GameService } from './game-service';
import { Pokemon } from '../models/pokemon.model';
import { HttpClient } from '@angular/common/http';


@Injectable({ providedIn: 'root' })
export class PokemonFormService {
  private readonly gameService = inject(GameService);
  private readonly http = inject(HttpClient);

  private readonly _forms = signal<Record<string, Pokemon[]>>({});

  get forms() {
    return this._forms;
  }

  constructor() {
    effect(() => {
      const game = this.gameService.getActiveGame()();
      if (!game) return;

      this.http.get<Pokemon[]>(`assets/${game.id}/pokemon_forms.json`).subscribe(list => {
        const indexed = list.reduce((acc, form) => {
          const baseId = form.id.substring(0, form.id.lastIndexOf('_'));
          if (!acc[baseId]) acc[baseId] = [];
          acc[baseId].push(form);
          return acc;
        }, {} as Record<string, Pokemon[]>);

        this._forms.set(indexed);
      });
    });
  }

  getFormsFor(pokemonId: string): Pokemon[] {
    return this._forms()[pokemonId] ?? [];
  }

  hasForms(pokemonId: string): boolean {
    return !!this._forms()[pokemonId]?.length;
  }
}