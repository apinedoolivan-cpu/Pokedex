import { Injectable } from '@angular/core';
import { POKEMON_TYPES, PokemonType, TypeEffectiveness } from '../models/types.model';

@Injectable({
  providedIn: 'root',
})
export class TypesEffectivenessService {

  calculate(pokemonTypes: string[]): TypeEffectiveness {
    const multipliers = new Map<string, number>();

    for (const type of POKEMON_TYPES) {
      multipliers.set(type.id, 1);
    }

    for (const pokemonTypeId of pokemonTypes) {
      const pokemonType = POKEMON_TYPES.find(t => t.id === pokemonTypeId);
      if (!pokemonType) continue;

      for (const weakness of pokemonType.weaknesses) {
        multipliers.set(weakness, (multipliers.get(weakness) ?? 1) * 2);
      }

      for (const resistance of pokemonType.resistances) {
        multipliers.set(resistance, (multipliers.get(resistance) ?? 1) * 0.5);
      }
    }

    const immunities = this.getImmunities(pokemonTypes);
    for (const immune of immunities) {
      multipliers.set(immune, 0);
    }

    const quadWeak: PokemonType[]      = [];
    const doubleWeak: PokemonType[]    = [];
    const neutral: PokemonType[]       = [];
    const resistant: PokemonType[]     = [];
    const quadResistant: PokemonType[] = [];
    const immune: PokemonType[]        = [];

    for (const [typeId, multiplier] of multipliers) {
      const type = POKEMON_TYPES.find(t => t.id === typeId);
      if (!type) continue;

      if (multiplier === 0)       immune.push(type);
      else if (multiplier >= 4)   quadWeak.push(type);
      else if (multiplier >= 2)   doubleWeak.push(type);
      else if (multiplier <= 0.25) quadResistant.push(type);
      else if (multiplier < 1)    resistant.push(type);
      else                        neutral.push(type);
    }

    return { quadWeak, doubleWeak, neutral, resistant, quadResistant, immune };
  }

  private getImmunities(pokemonTypes: string[]): string[] {
    const immunityMap: Record<string, string[]> = {
      NORMAL:  ['GHOST'],
      GHOST:   ['NORMAL', 'FIGHTING'],
      FLYING:  ['GROUND'],
      GROUND:  ['ELECTRIC'],
      STEEL:   ['POISON'],
      DARK:    ['PSYCHIC'],
      FAIRY:   ['DRAGON'],
    };

    const immunities = new Set<string>();
    for (const typeId of pokemonTypes) {
      for (const immune of immunityMap[typeId] ?? []) {
        immunities.add(immune);
      }
    }
    return [...immunities];
  }
}