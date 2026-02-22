import { Component, computed, input, inject, signal } from '@angular/core';
import { PokemonSpriteService } from '../../services/pokemon-sprite-service';
import { PokemonType } from '../../models/types.model';
import { Pokemon, PokemonForm } from '../../models/pokemon.model';
import { PokemonFormService } from '../../services/pokemon-form-service';

@Component({
  selector: 'app-pokemon-showcase',
  standalone: true,
  templateUrl: './pokemon-showcase.html',
  styleUrl: './pokemon-showcase.scss',
})
export class PokemonShowcaseComponent {
  private readonly pokemonSprite = inject(PokemonSpriteService);
  private readonly formService = inject(PokemonFormService);

  public readonly pokemon = input.required<Pokemon>();
  public readonly pokemonTypes = input.required<PokemonType[]>();

  readonly selectedFormIndex = signal<number | null>(null);

  readonly forms = computed<PokemonForm[]>(() =>
    this.formService.getFormsFor(this.pokemon().id)
  );

  readonly activePokemon = computed<Pokemon>(() => {
    const idx = this.selectedFormIndex();
    const base = this.pokemon();
    if (idx === null) return base;
    const form = this.forms().find(f => f.formIndex === idx);
    return form ? this.formService.mergeWithBase(base, form) : base;
  });

  readonly activeTypes = computed<PokemonType[]>(() => {
    const idx = this.selectedFormIndex();
    if (idx === null) return this.pokemonTypes();
    const form = this.forms().find(f => f.formIndex === idx);
    if (!form?.types) return this.pokemonTypes();
    
    return this.pokemonTypes(); 
  });

  readonly selectedPokemonSprite = computed(() =>
    this.pokemonSprite.getSpritePath(this.activePokemon())
  );

  selectForm(formIndex: number | null): void {
    this.selectedFormIndex.set(formIndex);
  }

  isFormActive(formIndex: number | null): boolean {
    return this.selectedFormIndex() === formIndex;
  }

  formTypeLabel(form: PokemonForm): string {
    switch (form.formType) {
      case 'mega':     return 'Mega';
      case 'regional': return form.region ?? 'Regional';
      default:         return 'Variante';
    }
  }
}