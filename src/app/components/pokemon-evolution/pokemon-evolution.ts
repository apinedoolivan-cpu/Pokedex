import { Component, computed, inject, input } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { Pokemon } from '../../models/pokemon.model';
import { PokedexStoreService } from '../../services/pokedex-store-service';
import { PokemonEvolutionService } from '../../services/pokemon-evolution-service';
import { PokemonSpriteService } from '../../services/pokemon-sprite-service';
import { GameItemsService } from '../../services/game-items-service';
import { PokemonFormService } from '../../services/pokemon-form-service';
import { Router } from '@angular/router';

const METHOD_LABELS: Record<string, string> = {
  Level: 'Nivel',
  LevelMale: 'Nivel siendo macho',
  LevelFemale: 'Nivel siendo hembra',

  Item: 'Usar objeto',
  ItemFemale: 'Siendo hembra, usar objeto',
  ItemMale: 'Siendo macho, usar objeto',
  DayHoldItem: 'Durante el día, objeto',

  Happiness: 'Amistad',
  HappinessDay: 'Amistad durante el día',
  HappinessNight: 'Amistad durante la noche',

  AttackGreater: 'Ataque > Defensa',
  DefenseGreater: 'Defensa > Ataque',
  AtkDefEqual: 'Ataque = Defensa',

  Shedinja: 'Evoluciona a Ninjask y deja un hueco vacío',
  Personalidad: 'Evoluciona según la personalidad a nivel'
};

@Component({
  selector: 'app-pokemon-evolution',
  standalone: true,
  imports: [NgTemplateOutlet],
  templateUrl: './pokemon-evolution.html',
  styleUrl: './pokemon-evolution.scss',
})
export class PokemonEvolutionComponent {
  public readonly pokemon = input.required<Pokemon>();

  public readonly store = inject(PokedexStoreService);
  private readonly evolutionService = inject(PokemonEvolutionService);
  private readonly formService = inject(PokemonFormService);
  public readonly spriteService = inject(PokemonSpriteService);
  public readonly itemService = inject(GameItemsService);
  private readonly router = inject(Router);

  readonly ITEM_METHODS = new Set(['Item', 'ItemFemale', 'ItemMale', 'DayHoldItem']);
  public readonly isItemEvolution = (method: string) => this.ITEM_METHODS.has(method);

  private readonly pokemonId = computed(() => this.pokemon().id);
  readonly chain = this.evolutionService.getChainFor(this.pokemonId);

  getPokemon(idPokemon: string): Pokemon | undefined {
    return this.store.getById(idPokemon)
      ?? Object.values(this.formService.forms()).flat().find(f => f.id === idPokemon);
  }

  getMethodLabel(method: string | undefined): string {
    if (!method) return '';
    return METHOD_LABELS[method] ?? method;
  }

  getMethodValue(child: any): string {
    if (this.isItemEvolution(child.method)) {
      const item = this.itemService.getItemById(child.value);
      return item ? item.name : child.value;
    } else {
      return child.value;
    }
  }

  navigateToPokemon(idPokemon: string): void {
    // Primero intenta encontrarlo en el store normal
    const poke = this.store.getById(idPokemon);
    if (poke) {
      this.router.navigate(['/pokedex', poke.slug]);
      return;
    }

    // Si es una forma, extrae el id base y navega al pokemon normal
    const baseId = idPokemon.substring(0, idPokemon.lastIndexOf('_'));
    const basePoke = this.store.getById(baseId);
    if (basePoke) {
      this.router.navigate(['/pokedex', basePoke.slug]);
    }
  }
}