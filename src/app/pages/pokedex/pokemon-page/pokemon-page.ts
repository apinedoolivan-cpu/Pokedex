import { Component} from '@angular/core';
import { PokemonInfoComponent } from '../../../components/pokemon-info/pokemon-info';

@Component({
  selector: 'app-pokemon-page',
  imports: [PokemonInfoComponent],
  templateUrl: './pokemon-page.html',
  styleUrl: './pokemon-page.scss',
})
export class PokemonPageComponent {
}
