import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FavoritesService } from '../../core/services/favorites.service';
import { WeatherService } from '../../core/services/weather.service';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss'
})
export class FavoritesComponent implements OnInit {
  favorites: string[] = [];
  weatherData: any[] = [];

  constructor(
    private favoritesService: FavoritesService,
    private weatherService: WeatherService,
    private router: Router
  ) {}

  ngOnInit() {
    this.favorites = this.favoritesService.getFavorites();
    this.loadWeather();
  }

  loadWeather() {
    this.favorites.forEach(city => {
      this.weatherService.getCurrentWeather(city).subscribe({
        next: (data: any) => this.weatherData.push(data),
        error: () => {}
      });
    });
  }

  remove(city: string) {
    this.favoritesService.removeFavorite(city);
    this.favorites = this.favoritesService.getFavorites();
    this.weatherData = this.weatherData.filter(w => w.name !== city);
  }

  goToDetail(city: string) {
    this.router.navigate(['/city', city]);
  }
}