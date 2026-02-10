import { Component } from '@angular/core';
import { PokedexComponent } from '../../components/pokedex/pokedex';

@Component({
  selector: 'app-pokedex-page',
  imports: [PokedexComponent],
  templateUrl: './pokedex-page.html',
  styleUrl: './pokedex-page.scss',
})
export class PokedexPageComponent {
}
