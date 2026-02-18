import { Injectable, signal, effect } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PokemonAbility } from '../models/info-game.model';
import { Pokemon } from '../models/pokemon.model';
import { GameService } from './game-service';

@Injectable({ providedIn: 'root' })
export class PokemonAbilityService {
  private readonly _abilities = signal<Record<string, PokemonAbility>>({});

  get abilities() {
    return this._abilities;
  }

  constructor(private http: HttpClient, private gameService: GameService) {
    effect(() => {
      const game = this.gameService.getActiveGame()();
      if (!game) return;

      this.http
        .get<PokemonAbility[]>(`/assets/${game.id}/abilities.json`)
        .subscribe(list => {
          const indexed = list.reduce((acc, a) => {
            acc[a.id] = a;
            return acc;
          }, {} as Record<string, PokemonAbility>);
          this._abilities.set(indexed);
        });
    });
  }

  getAbilitiesForPokemon(pokemon: Pokemon): PokemonAbility[] {
    const abilityMap = this._abilities();
    return pokemon.abilities.map(id => abilityMap[id]).filter((a): a is PokemonAbility => !!a);
  }
}

