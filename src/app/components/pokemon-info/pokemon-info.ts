import { Component, input, inject, computed } from '@angular/core';
import { Pokemon } from '../../models/pokemon.model';
import { PokemonType } from '../../models/types.model';
import { PokemonAbilityService } from '../../services/pokemon-ability-service';

@Component({
  selector: 'app-pokemon-info',
  imports: [],
  templateUrl: './pokemon-info.html',
  styleUrl: './pokemon-info.scss',
})
export class PokemonInfoComponent {
  
  private readonly abilityService = inject(PokemonAbilityService);
  public readonly pokemon = input.required<Pokemon>();
  public readonly pokemonTypes = input.required<PokemonType[]>();

  public readonly abilities = computed(() =>
    this.abilityService.getAbilitiesForPokemon(this.pokemon())
  );

  public readonly hiddenAbility = computed(() => {
    const p = this.pokemon();
    const abilityMap = this.abilityService.abilities();
    
    const id = p.hiddenAbility;
    if (!id) return null;

    const ability = abilityMap[id];
    return ability ?? null;
  });

}
