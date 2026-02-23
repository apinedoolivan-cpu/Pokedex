import { Component, computed, input, inject, signal, effect } from '@angular/core';
import { PokemonSpriteService } from '../../services/pokemon-sprite-service';
import { PokemonType } from '../../models/types.model';
import { Pokemon, PokemonForm } from '../../models/pokemon.model';
import { PokemonFormService } from '../../services/pokemon-form-service';
import { PokemonDataService } from '../../services/pokemon-data-service';
import { getPokemonTypeById } from '../../models/types.model';

@Component({
  selector: 'app-pokemon-showcase',
  standalone: true,
  templateUrl: './pokemon-showcase.html',
  styleUrl: './pokemon-showcase.scss',
})
export class PokemonShowcaseComponent {
  private readonly pokemonSprite = inject(PokemonSpriteService);
  private readonly formService = inject(PokemonFormService);
  private readonly pokemonDataService = inject(PokemonDataService);

  public readonly pokemon = input.required<Pokemon>();

  private readonly basePokemon = signal<Pokemon | null>(null);
  readonly selectedFormIndex = signal<number | null>(null);

  constructor() {
    effect(() => {
      const p = this.pokemon();
      this.basePokemon.set(p);
      this.selectedFormIndex.set(null);
      this.pokemonDataService.selectedPokemon(p);
    });
  }

  readonly forms = computed<PokemonForm[]>(() =>
    this.formService.getFormsFor(this.pokemon().id)
  );

  readonly activeTypes = computed<PokemonType[]>(() =>
    this.pokemonDataService.getSelectedPokemon()()?.types
      .map(id => getPokemonTypeById(id))
      .filter((t): t is PokemonType => !!t) ?? []
  );

  readonly selectedPokemonSprite = computed(() =>
    this.pokemonSprite.getSpritePath(this.pokemonDataService.getSelectedPokemon()())
  );

  selectForm(form: PokemonForm | null): void {
    const base = this.basePokemon();
    if (!base) return;
    this.selectedFormIndex.set(form?.formIndex ?? null);
    const merged = form ? this.formService.mergeWithBase(base, form) : base;
    this.pokemonDataService.selectedPokemon(merged);
  }

  isFormActive(formIndex: number | null): boolean {
    return this.selectedFormIndex() === formIndex;
  }
}