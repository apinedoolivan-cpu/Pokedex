import { Injectable } from '@angular/core';
import { Pokemon } from '../models/pokemon.model';

@Injectable({
  providedIn: 'root',
})
export class PokemonSpriteService {

  private readonly basePathSmallSprite = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon';
  private readonly basePathSprite = 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full';
  private readonly ubicationImage = 'https://guianil.pages.dev/images/location/';

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
    return `${this.basePathSprite}/${pokemon.dexNumber.toString()?.padStart(3, '0')}.png`;
  }

  getUbicationImagePath(pokemon: Pokemon | null): string {
    if (!pokemon) {
      return `${this.ubicationImage}unknown.png`;
    }
    return `${this.ubicationImage}${pokemon.id}.webp`;
  }
}