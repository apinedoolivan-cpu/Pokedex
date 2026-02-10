import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';


interface WeightedFavicon {
  src: string;
  weight: number;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.html',
})
export class App implements OnInit {

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const favicons: WeightedFavicon[] = [
      { src: '/favicon-1.ico', weight: 40 },
      { src: '/favicon-2.ico', weight: 30 },
      { src: '/favicon-3.ico', weight: 20 },
      { src: '/favicon-4.ico', weight: 10 }
    ];

    const selectedFavicon = this.getWeightedRandom(favicons);

    const link = document.getElementById('app-favicon') as HTMLLinkElement | null;

    if (link) {
      link.href = `${selectedFavicon}?v=${Date.now()}`;
    }
  }

  private getWeightedRandom(items: WeightedFavicon[]): string {
    const totalWeight = items.reduce((sum, item) => sum + item.weight, 0);
    let random = Math.random() * totalWeight;

    for (const item of items) {
      if (random < item.weight) {
        return item.src;
      }
      random -= item.weight;
    }

    return items[0].src;
  }
}