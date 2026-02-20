import { Component, input, computed, inject } from '@angular/core';
import { Pokemon } from '../../models/pokemon.model';
import { TypesEffectivenessService } from '../../services/types-effectiveness-service';


@Component({
  selector: 'app-pokemon-type-effectiveness',
  imports: [],
  templateUrl: './pokemon-type-effectiveness.html',
  styleUrl: './pokemon-type-effectiveness.scss',
})

export class TypeEffectivenessComponent {
  public readonly pokemon = input.required<Pokemon>();

  private readonly effectivenessService = inject(TypesEffectivenessService);

  readonly effectiveness = computed(() =>
    this.effectivenessService.calculate(this.pokemon().types)
  );
}