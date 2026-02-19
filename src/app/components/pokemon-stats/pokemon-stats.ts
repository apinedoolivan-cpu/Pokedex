import { Component, input, computed } from '@angular/core';
import { Pokemon } from '../../models/pokemon.model';

interface StatRow {
  label: string;
  value: number;
  color: string;
}

const MAX_STAT = 255;
@Component({
  selector: 'app-pokemon-stats',
  imports: [],
  templateUrl: './pokemon-stats.html',
  styleUrl: './pokemon-stats.scss',
})
export class PokemonStatsComponent {
  public readonly pokemon = input.required<Pokemon>();

  readonly stats = computed<StatRow[]>(() => {
    const s = this.pokemon().baseStats;
    return [
      { label: 'PS',       value: s.hp,             color: '#f43f5e' },
      { label: 'Ataque',   value: s.attack,          color: '#f97316' },
      { label: 'Defensa',  value: s.defense,         color: '#eab308' },
      { label: 'At. Esp',  value: s.specialAttack,   color: '#a855f7' },
      { label: 'Def. Esp', value: s.specialDefense,  color: '#22c55e' },
      { label: 'Velocidad',value: s.speed,           color: '#ec4899' },
    ];
  });

  readonly total = computed(() =>
    this.stats().reduce((acc, s) => acc + s.value, 0)
  );

  getBarWidth(value: number): string {
    return `${(value / MAX_STAT) * 100}%`;
  }
}