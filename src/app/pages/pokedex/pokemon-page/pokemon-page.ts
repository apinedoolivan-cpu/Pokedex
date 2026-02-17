import { Component} from '@angular/core';
import { PokemonComponent } from '../../../components/pokemon/pokemon';

@Component({
  selector: 'app-pokemon-page',
  imports: [PokemonComponent],
  templateUrl: './pokemon-page.html',
  styleUrl: './pokemon-page.scss',
})
export class PokemonPageComponent {
}
