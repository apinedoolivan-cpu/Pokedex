import { Component, inject, computed } from '@angular/core';
import { PokemonDataService } from '../../services/pokemon-data-service';
import { PokemonSpriteService } from '../../services/pokemon-sprite-service';
import { getPokemonTypeById, PokemonType } from '../../models/types.model';
@Component({
  selector: 'app-pokemon-showcase',
  imports: [],
  templateUrl: './pokemon-showcase.html',
  styleUrl: './pokemon-showcase.scss',
})
export class PokemonShowcaseComponent {
  private readonly pokemonData = inject(PokemonDataService);
  private readonly pokemonSprite = inject(PokemonSpriteService);

  public readonly selectedPokemon = this.pokemonData.getSelectedPokemon();
  public readonly selectedPokemonSprite = this.pokemonSprite.getSpritePath(this.selectedPokemon);
  public readonly pokemonTypes = computed<PokemonType[]>(() => {
    const p = this.selectedPokemon;
    if (!p) return [];

    return p.types.map(typeId => getPokemonTypeById(typeId)).filter((t): t is PokemonType => !!t);
  });
}
