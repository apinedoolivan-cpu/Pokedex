import { Component, computed, inject, input } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { Pokemon } from '../../models/pokemon.model';
import { PokedexStoreService } from '../../services/pokedex-store-service';
import { PokemonEvolutionService } from '../../services/pokemon-evolution-service';
import { PokemonSpriteService } from '../../services/pokemon-sprite-service';
import { GameItemsService } from '../../services/game-items-service';

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
  public readonly spriteService = inject(PokemonSpriteService);
  public readonly itemService = inject(GameItemsService);

  readonly ITEM_METHODS = new Set(['Item', 'ItemFemale', 'ItemMale', 'DayHoldItem']);
  public readonly isItemEvolution = (method: string) =>this.ITEM_METHODS.has(method);

  private readonly pokemonId = computed(() => this.pokemon().id);
  readonly chain = this.evolutionService.getChainFor(this.pokemonId);

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
}