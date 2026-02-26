import { Injectable } from '@angular/core';
import { Pokemon } from '../models/pokemon.model';

@Injectable({
  providedIn: 'root',
})
export class PokemonSpriteService {

  private readonly basePathSmallSprite = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon';
  private readonly basePathSprite = 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full';
  private readonly ubicationImage = 'https://guianil.pages.dev/images/location';
  private readonly itemImage = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items";

  getSmallSpritePath(pokemon: Pokemon | null ): string {
    if (!pokemon) {
      return `${this.basePathSmallSprite}/unknown.png`;
    }
    return `${this.basePathSmallSprite}/${pokemon.dexNumber}.png`;
  }

  getSpritePath(pokemon: Pokemon | null): string {
    if (!pokemon) {
      return `${this.basePathSprite}/unknown.png`;
    }

    const paddedDex = pokemon.dexNumber.toString().padStart(3, '0');

    if (pokemon.formType && pokemon.formSlug) {
      return `${this.basePathSprite}/${paddedDex}_${pokemon.formSlug}.png`;
    }

    return `${this.basePathSprite}/${paddedDex}.png`;
  }

  getUbicationImagePath(pokemon: Pokemon | null): string {
    if (!pokemon) {
      return `${this.ubicationImage}/unknown.png`;
    }
    return `${this.ubicationImage}/${pokemon.id}.webp`;
  }
  
  getItemImagePath(itemId: string): string {
    return `${this.itemImage}/${itemId}.png`;
  }
}