import { Component, computed, input, inject } from '@angular/core';
import { PokemonSpriteService } from '../../services/pokemon-sprite-service';
import { getPokemonTypeById, PokemonType } from '../../models/types.model';
import { Pokemon } from '../../models/pokemon.model';

@Component({
  selector: 'app-pokemon-showcase',
  standalone: true,
  templateUrl: './pokemon-showcase.html',
  styleUrl: './pokemon-showcase.scss',
})
export class PokemonShowcaseComponent {

  private readonly pokemonSprite = inject(PokemonSpriteService);

  readonly pokemon = input.required<Pokemon>();

  readonly selectedPokemonSprite = computed(() =>
    this.pokemonSprite.getSpritePath(this.pokemon())
  );

  readonly pokemonTypes = computed<PokemonType[]>(() =>
    this.pokemon().types.map(typeId => getPokemonTypeById(typeId)).filter((t): t is PokemonType => !!t)
  );
}
