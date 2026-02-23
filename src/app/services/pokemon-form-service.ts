import { Injectable, inject, signal, effect } from '@angular/core';
import { GameService } from './game-service';
import { Pokemon, PokemonForm } from '../models/pokemon.model';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
@Injectable({ providedIn: 'root' })
export class PokemonFormService {
  private readonly gameService = inject(GameService);

  private readonly _forms = signal<Record<string, PokemonForm[]>>({});
  get forms() {
    return this._forms;
  }

  constructor(private http: HttpClient) {
    effect(() => {
      const game = this.gameService.getActiveGame()();
      if (!game) return;

      const formsUrl = `assets/${game.id}/pokemon_forms.json`;

      this.http
        .get<PokemonForm[]>(formsUrl)
        .subscribe((list) => {
          const indexed = list.reduce((acc, form) => {
            if (!acc[form.pokemonId]) acc[form.pokemonId] = [];
            acc[form.pokemonId].push(form);
            return acc;
          }, {} as Record<string, PokemonForm[]>);

          this._forms.set(indexed);
        });
    });
  }

  getFormsFor(pokemonId: string): PokemonForm[] {
    return this._forms()[pokemonId] ?? [];
  }

  hasForms(pokemonId: string): boolean {
    return !!this._forms()[pokemonId]?.length;
  }

  mergeWithBase(base: Pokemon, form: PokemonForm): Pokemon {
    return {
      ...base,
      id: form.pokemonId ?? base.id,
      name: form.formName ?? base.name,
      types: form.types ?? base.types,
      baseStats: form.baseStats ?? base.baseStats,
      abilities: form.abilities ?? base.abilities,
      hiddenAbility: form.hiddenAbility ?? base.hiddenAbility,
      height: form.height ?? base.height,
      weight: form.weight ?? base.weight,
      color: form.color ?? base.color,
      pokedexEntry: form.pokedexEntry ?? base.pokedexEntry,
      evolutions: form.evolutions ?? base.evolutions,
      moves: form.moves ?? base.moves,
      mtMoves: form.mtMoves ?? base.mtMoves,
      eggMoves: form.eggMoves ?? base.eggMoves,
      generation: form.generation ?? base.generation,
      formSlug: form.formSlug,
      isForm: true
    };
  }
}