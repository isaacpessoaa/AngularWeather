import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class FavoritesService {
  private key = 'favorites';

  getFavorites(): string[] {
    return JSON.parse(localStorage.getItem(this.key) || '[]');
  }

  addFavorite(city: string) {
    const favs = this.getFavorites();
    if (!favs.includes(city)) {
      favs.push(city);
      localStorage.setItem(this.key, JSON.stringify(favs));
    }
  }

  removeFavorite(city: string) {
    const favs = this.getFavorites().filter(f => f !== city);
    localStorage.setItem(this.key, JSON.stringify(favs));
  }

  isFavorite(city: string): boolean {
    return this.getFavorites().includes(city);
  }
}