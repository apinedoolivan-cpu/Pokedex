import { Component, inject, input,  computed } from '@angular/core';
import { PokemonSpriteService } from '../../services/pokemon-sprite-service';
import { Pokemon } from '../../models/pokemon.model';
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
  
  public readonly pokemon = input.required<Pokemon>();
  private readonly rarityLabels: Record<ItemRarity, string> = {
    common: 'Común',
    uncommon: 'Poco común',
    rare: 'Raro'
  };

  public readonly urlUbicacion = computed(() =>
    this.spriteService.getUbicationImagePath(this.pokemon())
  );
  readonly heldItemsList = computed(() => {
    const heldItems = this.pokemon().heldItems;
    const itemsMap = this.itemService.itemsMap();
    console.log('heldItems', heldItems);

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
