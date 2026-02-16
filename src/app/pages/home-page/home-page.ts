import { Component } from '@angular/core';
import { HomeComponent } from '../../components/home/home';

@Component({
  selector: 'app-home-page',
  imports: [HomeComponent],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
})
export class HomePageComponent {
}
