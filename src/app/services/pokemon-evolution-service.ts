import { Injectable, inject, computed, Signal } from '@angular/core';
import { Pokemon } from '../models/pokemon.model';
import { PokedexStoreService } from './pokedex-store-service';

export interface EvolutionNode {
  idPokemon: string;
  method?: string;
  value?: number | string;
  evolvesInto: EvolutionNode[];
}

@Injectable({ providedIn: 'root' })
export class PokemonEvolutionService {
  private readonly store = inject(PokedexStoreService);

  getChainFor(pokemonId: Signal<string>): Signal<EvolutionNode | null> {
    return computed(() => {
      const all = this.store.all();
      const id = pokemonId();
      if (!all.length || !id) return null;

      const byId = new Map<string, Pokemon>(all.map(p => [p.id, p]));
      const root = this.findRoot(id, byId);
      if (!root) return null;

      const tree = this.buildTree(root, byId);

      if (tree.evolvesInto.length === 0 && tree.idPokemon === id) return null;

      return tree;
    });
  }

  private findRoot(id: string, byId: Map<string, Pokemon>): Pokemon | null {
    const pokemon = byId.get(id);
    if (!pokemon) return null;

    const prevo = [...byId.values()].find(p =>
      p.evolutions?.some(e => e.to === id)
    );

    return prevo ? this.findRoot(prevo.id, byId) : pokemon;
  }

  private buildTree(
    pokemon: Pokemon,
    byId: Map<string, Pokemon>,
    method?: string,
    value?: number | string
  ): EvolutionNode {
    const evolvesInto: EvolutionNode[] = (pokemon.evolutions ?? [])
      .map(evo => {
        const next = byId.get(evo.to);
        if (!next) return null;
        return this.buildTree(next, byId, evo.method, evo.value);
      })
      .filter((n): n is EvolutionNode => n !== null);

    return { idPokemon: pokemon.id, method, value, evolvesInto };
  }
}