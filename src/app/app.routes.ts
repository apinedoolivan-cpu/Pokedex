import { Routes, } from '@angular/router';
import { HomePage } from './components/home-page/home-page';

export const routes: Routes = [
  {
    path: '',
    component: HomePage
  },
  {
    path: 'pokedex',
    loadComponent: () =>
      import('./pages/pokedex/pokedex-page')
        .then(m => m.PokedexPage)
  }
];
