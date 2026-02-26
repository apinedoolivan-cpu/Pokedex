import { Component, inject, signal, computed, ElementRef } from '@angular/core';
import { PokedexStoreService } from '../../services/pokedex-store-service';
import { PokemonDataService } from '../../services/pokemon-data-service';
import { Router } from '@angular/router';
import { HostListener } from '@angular/core';
import { PokemonSpriteService } from '../../services/pokemon-sprite-service';

@Component({
  selector: 'app-pokemon-search',
  imports: [],
  templateUrl: './pokemon-search.html',
  styleUrl: './pokemon-search.scss',
})
export class PokemonSearchComponent {
  private readonly store = inject(PokedexStoreService);
  private readonly pokemonData = inject(PokemonDataService);
  public readonly spriteService = inject(PokemonSpriteService)
  private readonly router = inject(Router);
  private readonly elRef = inject(ElementRef);

  readonly selected = this.pokemonData.getSelectedPokemon();

  query = signal('');
  isOpen = signal(false);

  readonly suggestions = computed(() => {
    const q = this.query().toLowerCase().trim();
    if (!q) return [];
    return this.store
      .all()
      .filter((p) => p.name.toLowerCase().includes(q))
      .slice(0, 8);
  });

  private readonly currentIndex = computed(() => {
    const sel = this.selected();
    if (!sel) return -1;

    // Si es una forma, busca por el id base
    const lookupId = sel.formType
      ? sel.id.substring(0, sel.id.lastIndexOf('_'))
      : sel.id;

    return this.store.all().findIndex((p) => p.id === lookupId);
  });

  readonly hasPrev = computed(() => this.currentIndex() > 0);
  readonly hasNext = computed(() => this.currentIndex() < this.store.all().length - 1);

  selectPokemon(pokemon: any): void {
    this.router.navigate(['/pokedex', pokemon.slug]);
    this.query.set('');
    this.isOpen.set(false);
  }

  prev(): void {
    const idx = this.currentIndex();
    if (idx > 0) {
      this.router.navigate(['/pokedex', this.store.all()[idx - 1].slug]);
    }
  }

  next(): void {
    const idx = this.currentIndex();
    const all = this.store.all();
    if (idx < all.length - 1) {
      this.router.navigate(['/pokedex', all[idx + 1].slug]);
    }
  }

  onInput(value: string): void {
    this.query.set(value);
    this.isOpen.set(value.trim().length > 0);
  }

  formatDexNumber(dexNumber: string): string {
    return `#${dexNumber.padStart(3, '0')}`;
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent): void {
    if (!this.elRef.nativeElement.contains(event.target)) {
      this.isOpen.set(false);
    }
  }
}