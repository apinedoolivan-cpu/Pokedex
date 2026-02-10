import { Injectable } from '@angular/core';
import { Pokemon } from '../models/pokemon.model';
@Injectable({
  providedIn: 'root',
})
export class PokemonSpriteService {

  private readonly basePath = '/assets/sprites/pokemon';

  getFallback(): string {
    return `${this.basePath}/unknown.png`;
  }
}