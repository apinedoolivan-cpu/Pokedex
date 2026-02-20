import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PokemonItem } from '../models/info-game.model';
import { GameService } from './game-service';

@Injectable({
  providedIn: 'root'
})
export class GameItemsService {

  private readonly gameSercice = inject(GameService);
  private readonly game = this.gameSercice.getActiveGame();

  private readonly itemsUrl = `assets/${this.game()?.id}/items.json`;

  private readonly _items = signal<PokemonItem[]>([]);

  readonly items = computed(() => this._items());

  constructor(private http: HttpClient) {
    this.loadItems();
  }

  private loadItems(): void {
    this.http.get<PokemonItem[]>(this.itemsUrl)
      .subscribe(items => {
        this._items.set(items);
      });
  }

  readonly itemsMap = computed(() => {
    return new Map(this._items().map(item => [item.id, item]));
  });

  getItemById(id: string): PokemonItem | undefined {
    return this.itemsMap().get(id);
  }
}