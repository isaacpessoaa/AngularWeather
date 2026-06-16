import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { WeatherService } from '../../core/services/weather.service';
import { FavoritesService } from '../../core/services/favorites.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  searchCity = '';
  weather: any = null;
  error = '';
  loading = false;
  recentSearches: string[] = [];

  constructor(
    private weatherService: WeatherService,
    private favoritesService: FavoritesService,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.recentSearches = JSON.parse(localStorage.getItem('recent') || '[]');
    this.getLocation();
  }

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(pos => {
        this.weatherService.getWeatherByCoords(
          pos.coords.latitude,
          pos.coords.longitude
        ).subscribe({
          next: (data: any) => this.weather = data,
          error: () => this.error = 'Erro ao obter localização'
        });
      });
    }
  }

  search() {
    if (!this.searchCity.trim()) return;
    this.loading = true;
    this.error = '';

    this.weatherService.getCurrentWeather(this.searchCity).subscribe({
      next: (data: any) => {
        this.weather = data;
        this.loading = false;
        this.saveRecent(this.searchCity);
      },
      error: () => {
        this.error = 'Cidade não encontrada';
        this.loading = false;
      }
    });
  }

  saveRecent(city: string) {
    let recent: string[] = JSON.parse(localStorage.getItem('recent') || '[]');
    recent = [city, ...recent.filter(c => c !== city)].slice(0, 5);
    localStorage.setItem('recent', JSON.stringify(recent));
    this.recentSearches = recent;
  }

  goToDetail(city: string) {
    this.router.navigate(['/city', city]);
  }

  isFavorite(): boolean {
    return this.weather ? this.favoritesService.isFavorite(this.weather.name) : false;
  }

  toggleFavorite() {
    if (!this.weather) return;
    if (this.isFavorite()) {
      this.favoritesService.removeFavorite(this.weather.name);
    } else {
      this.favoritesService.addFavorite(this.weather.name);
    }
  }

  logout() {
    this.auth.logout();
  }
}