import { Component, computed, input, inject } from '@angular/core';
import { PokemonSpriteService } from '../../services/pokemon-sprite-service';
import { PokemonType } from '../../models/types.model';
import { Pokemon } from '../../models/pokemon.model';

@Component({
  selector: 'app-pokemon-showcase',
  standalone: true,
  templateUrl: './pokemon-showcase.html',
  styleUrl: './pokemon-showcase.scss',
})
export class PokemonShowcaseComponent {

  private readonly pokemonSprite = inject(PokemonSpriteService);

  public readonly pokemon = input.required<Pokemon>();
  public readonly pokemonTypes = input.required<PokemonType[]>();

  public readonly selectedPokemonSprite = computed(() =>
    this.pokemonSprite.getSpritePath(this.pokemon())
  );
}
