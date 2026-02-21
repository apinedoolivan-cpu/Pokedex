import { Component, input, inject, computed } from '@angular/core';
import { Pokemon } from '../../models/pokemon.model';
import { PokemonMovesService } from '../../services/pokemon-moves-service';
import { LevelMove, MtMove, ResolvedMove } from '../../models/info-game.model';

@Component({
  selector: 'app-pokemon-moves',
  imports: [],
  templateUrl: './pokemon-moves.html',
  styleUrl: './pokemon-moves.scss',
})
export class PokemonMovesComponent {
  pokemon = input.required<Pokemon>();

  private readonly movesService = inject(PokemonMovesService);

  levelMoves = computed<LevelMove[]>(() =>
    this.movesService.resolveLevelMoves(this.pokemon().moves ?? [])
  );

  mtMoves = computed<MtMove[]>(() =>
    this.movesService.resolveMtMoves(this.pokemon().mtMoves ?? [])
  );

  eggMoves = computed<ResolvedMove[]>(() =>
    this.movesService.resolveEggMoves(this.pokemon())
  );

  mtLabel(n: number): string {
    return `MT${String(n).padStart(3, '0')}`;
  }
}