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

  // Pokemon seleccionado global
  readonly selectedPokemon = this.pokemonDataService.getSelectedPokemon();

  // Base inmutable mientras no cambie de especie
  private readonly basePokemon = signal<Pokemon | null>(null);

  readonly selectedFormIndex = signal<number | null>(null);

  constructor() {
    effect(() => {
      const current = this.selectedPokemon();
      if (!current) return;

      const currentBase = this.basePokemon();

      // Solo cambiar base si cambia la especie
      if (!currentBase || currentBase.id !== current.id) {
        this.basePokemon.set(current);
        this.selectedFormIndex.set(null);
      }
    });
  }

  readonly forms = computed<PokemonForm[]>(() => {
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
    this.pokemonSprite.getSpritePath(
      this.selectedPokemon()
    )
  );

  selectForm(form: PokemonForm | null): void {
    const base = this.basePokemon();
    if (!base) return;

    if (!form) {
      this.selectedFormIndex.set(null);
      this.pokemonDataService.selectedPokemon({
        ...base,
        formSlug: undefined,
        isForm: false
      });
      return;
    }

    const merged = this.formService.mergeWithBase(base, form);

    this.selectedFormIndex.set(form.formIndex ?? null);
    this.pokemonDataService.selectedPokemon(merged);
  }

  isFormActive(formIndex: number | null): boolean {
    return this.selectedFormIndex() === formIndex;
  }
}