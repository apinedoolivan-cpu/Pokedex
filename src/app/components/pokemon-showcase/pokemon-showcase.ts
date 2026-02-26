import { Component, computed, input, inject, signal, effect } from '@angular/core';
import { PokemonSpriteService } from '../../services/pokemon-sprite-service';
import { PokemonType } from '../../models/types.model';
import { Pokemon } from '../../models/pokemon.model';
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

  readonly selectedPokemon = this.pokemonDataService.getSelectedPokemon();

  public readonly basePokemon = signal<Pokemon | null>(null);
  readonly selectedFormId = signal<string | null>(null);

  constructor() {
    effect(() => {
      const current = this.selectedPokemon();
      if (!current) return;

      const currentBase = this.basePokemon();

      const isForm = !!current.formType;
      if (!isForm && (!currentBase || currentBase.id !== current.id)) {
        this.basePokemon.set(current);
        this.selectedFormId.set(null);
      }
    });
  }

  readonly forms = computed<Pokemon[]>(() => {
    const base = this.basePokemon();
    if (!base) return [];
    return this.formService.getFormsFor(base.id);
  });

  readonly activeTypes = computed<PokemonType[]>(() =>
    this.selectedPokemon()?.types
      .map(id => getPokemonTypeById(id))
      .filter((t): t is PokemonType => !!t) ?? []
  );

  readonly selectedPokemonSprite = computed(() =>
    this.pokemonSprite.getSpritePath(this.selectedPokemon())
  );

  selectForm(form: Pokemon | null): void {
    const base = this.basePokemon();
    if (!base) return;

    this.selectedFormId.set(form?.id ?? null);
    this.pokemonDataService.selectedPokemon(form ?? base);
    console.log(form);
  }

  isFormActive(formId: string | null): boolean {
    return this.selectedFormId() === formId;
  }
}