import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PokemonRoute } from '../models/info-game.model';
import { GameService } from './game-service';

@Injectable({
  providedIn: 'root',
})
export class GameRoutesService {
  private readonly gameService = inject(GameService);
  private readonly game = this.gameService.getActiveGame();
  private readonly routesUrl = `assets/${this.game()?.id}/encounters.json`;

  private readonly _routes = signal<PokemonRoute[]>([]);
  readonly routes = computed(() => this._routes());

  private readonly _pokemonToRoutes = computed(() => {
    const map = new Map<string, PokemonRoute[]>();
    for (const route of this._routes()) {
      for (const pokemonId of route.pokemons) {
        if (!map.has(pokemonId)) map.set(pokemonId, []);
        map.get(pokemonId)!.push(route);
      }
    }
    return map;
  });

  constructor(private http: HttpClient) {
    this.loadRoutes();
  }

  private loadRoutes(): void {
    this.http
      .get<PokemonRoute[]>(this.routesUrl)
      .subscribe((routes) => this._routes.set(routes));
  }

  getRoutesByPokemon(pokemonId: string) {
    return this._pokemonToRoutes().get(pokemonId) ?? [];
  }

  getRouteById(routeId: string) {
    return computed(() =>
      this._routes().find((route) => route.id === routeId) ?? null
    );
  }

  getPokemonsByRoute(routeId: string) {
    return computed(
      () => this._routes().find((route) => route.id === routeId)?.pokemons ?? []
    );
  }

  searchRoutes(query: string) {
    return computed(() => {
      const q = query.toLowerCase();
      return this._routes().filter((route) =>
        route.id.toLowerCase().includes(q)
      );
    });
  }
}