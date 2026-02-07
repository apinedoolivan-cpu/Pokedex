import { Routes, } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page';
import { PokedexPageComponent } from './pages/pokedex/pokedex-page';

export const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'pokedex', component: PokedexPageComponent },
  { path: '**', redirectTo: '' } 
];