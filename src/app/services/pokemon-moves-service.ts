import { Injectable, inject, signal, effect } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PokemonMove } from '../models/info-game.model';
import { GameService } from './game-service';
import { PokemonEvolutionService } from './pokemon-evolution-service';
import { getPokemonTypeById } from '../models/types.model';
import { LevelMove, MtMove, ResolvedMove } from '../models/info-game.model';
import { Pokemon } from '../models/pokemon.model';
import { PokedexStoreService } from './pokedex-store-service';


@Injectable({ providedIn: 'root' })
export class PokemonMovesService {
  private readonly gameService = inject(GameService);
  private readonly evolutionService = inject(PokemonEvolutionService);
  private readonly store = inject(PokedexStoreService);
  private readonly game = this.gameService.getActiveGame();
  private readonly movesUrl = `assets/${this.game()?.id}/moves.json`;

  private readonly _moves = signal<Record<string, PokemonMove>>({});

  get moves() {
    return this._moves;
  }

  constructor(private http: HttpClient) {
    effect(() => {
      const game = this.gameService.getActiveGame()();
      if (!game) return;

      this.http
        .get<PokemonMove[]>(this.movesUrl)
        .subscribe((list) => {
          const indexed = list.reduce((acc, m) => {
            acc[m.id] = m;
            return acc;
          }, {} as Record<string, PokemonMove>);
          this._moves.set(indexed);
        });
    });
  }

  resolveLevelMoves(entries: { level: number; move: string }[]): LevelMove[] {
    const map = this._moves();
    return entries
      .map((entry) => {
        const move = map[entry.move];
        if (!move) return null;
        return { ...move, level: entry.level, pokemonType: getPokemonTypeById(move.type) };
      })
      .filter((m): m is LevelMove => m !== null)
      .sort((a, b) => a.level - b.level);
  }

  resolveMtMoves(entries: { mtNumber: number; move: string }[]): MtMove[] {
    const map = this._moves();
    return entries
      .map((entry) => {
        const move = map[entry.move];
        if (!move) return null;
        return { ...move, mtNumber: entry.mtNumber, pokemonType: getPokemonTypeById(move.type) };
      })
      .filter((m): m is MtMove => m !== null)
      .sort((a, b) => a.mtNumber - b.mtNumber);
  }

  resolveIds(ids: string[]): ResolvedMove[] {
    const map = this._moves();
    return ids
      .map((id) => map[id] ?? null)
      .filter((m): m is PokemonMove => m !== null)
      .map((m) => ({ ...m, pokemonType: getPokemonTypeById(m.type) }));
  }

  resolveEggMoves(pokemon: Pokemon): ResolvedMove[] {
    const all = this.store.all();
    const byId = new Map<string, Pokemon>(all.map(p => [p.id, p]));
    const root = this.evolutionService.findRoot(pokemon.id, byId);
    return this.resolveIds(root?.eggMoves ?? []);
  }
}