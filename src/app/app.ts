import { Component, signal } from '@angular/core';
import { HomePage } from './components/home-page/home-page';

@Component({
  selector: 'app-root',
  imports: [HomePage],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('Pokedex');
}
