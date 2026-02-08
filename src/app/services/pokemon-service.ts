import { Injectable, signal, computed } from '@angular/core';
import { Pokemon } from '../models/pokemon.model';
import pokedexData from '../../assets/pokemon.json';

type RawPokedex = Record<string, any>;

@Injectable({ providedIn: 'root' })
export class PokedexStore {

  private readonly _list = signal<Pokemon[]>(
    Object.values(pokedexData as RawPokedex).map(this.normalize)
  );

  private readonly _byId = computed(() =>
    Object.fromEntries(
      this._list().map(p => [p.id, p])
    )
  );

  readonly all = computed(() => this._list());

  getById(id: string) {
    return computed(() =>
      this._byId()[id.toUpperCase()]
    );
  }

  search = signal('');

  readonly filtered = computed(() => {
    const q = this.search().toLowerCase();
    if (!q) return this._list();
    return this._list().filter(p =>
      p.name.toLowerCase().includes(q)
    );
  });

  private normalize(raw: any): Pokemon {
    return {
      ...raw,
      generation: Number(raw.generation),
    };
  }
}
