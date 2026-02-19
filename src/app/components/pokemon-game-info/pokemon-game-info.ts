import { Component, inject, input,  computed } from '@angular/core';
import { Pokemon } from '../../models/pokemon.model';
import { PokemonSpriteService } from '../../services/pokemon-sprite-service';
import { GameRoutesService } from '../../services/game-routes-service';
import { GameItemsService } from '../../services/game-items-service';


type ItemRarity = 'common' | 'uncommon' | 'rare';

@Component({
  selector: 'app-pokemon-game-info',
  imports: [],
  templateUrl: './pokemon-game-info.html',
  styleUrl: './pokemon-game-info.scss',
})
export class PokemonGameInfoComponent {
  public readonly spriteService = inject(PokemonSpriteService);
  public readonly itemService = inject(GameItemsService);
  public readonly ubicationService = inject(GameRoutesService)
  
  public readonly pokemon = input.required<Pokemon>();
  private readonly rarityLabels: Record<ItemRarity, string> = {
    common: 'Común',
    uncommon: 'Poco común',
    rare: 'Raro'
  };

  public readonly urlUbicacion = computed(() =>
    this.spriteService.getUbicationImagePath(this.pokemon())
  );

  readonly routesForPokemon = computed(() =>
    this.ubicationService.getRoutesByPokemon(this.pokemon().id)
  );
  
  readonly heldItemsList = computed(() => {
    const heldItems = this.pokemon().heldItems;
    const itemsMap = this.itemService.itemsMap();

    if (!heldItems) return [];

    return Object.entries(heldItems)
      .filter(([, value]) => !!value)
      .map(([rarity, itemId]) => ({
        rarity: rarity as ItemRarity,
        rarityLabel: this.rarityLabels[rarity as ItemRarity],
        item: itemsMap.get(itemId as string) ?? null
      }));
  });
}
