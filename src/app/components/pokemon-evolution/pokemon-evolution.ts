import { Component, computed, inject, input } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { Pokemon } from '../../models/pokemon.model';
import { PokedexStoreService } from '../../services/pokedex-store-service';
import { PokemonEvolutionService } from '../../services/pokemon-evolution-service';
import { PokemonSpriteService } from '../../services/pokemon-sprite-service';

const METHOD_LABELS: Record<string, string> = {
  level: 'Nivel',
  item: 'Objeto',
  trade: 'Intercambio',
  friendship: 'Amistad',
  stone: 'Piedra',
  held_item: 'Objeto equipado',
  location: 'Lugar',
  time: 'Hora del día',
  move: 'Movimiento',
  gender: 'Género',
  other: 'Especial',
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

  private readonly pokemonId = computed(() => this.pokemon().id);
  readonly chain = this.evolutionService.getChainFor(this.pokemonId);

  getMethodLabel(method: string | undefined): string {
    if (!method) return '';
    return METHOD_LABELS[method.toLowerCase()] ?? method;
  }
}