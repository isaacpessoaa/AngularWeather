import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { WeatherService } from '../../core/services/weather.service';
import { FavoritesService } from '../../core/services/favorites.service';

@Component({
  selector: 'app-city-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './city-detail.component.html',
  styleUrl: './city-detail.component.scss'
})
export class CityDetailComponent implements OnInit {
  cityName = '';
  current: any = null;
  forecast: any[] = [];
  hourly: any[] = [];
  error = '';
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private weatherService: WeatherService,
    private favoritesService: FavoritesService
  ) {}

  ngOnInit() {
    this.cityName = this.route.snapshot.paramMap.get('name') || '';
    this.loadData();
  }

  loadData() {
    this.weatherService.getCurrentWeather(this.cityName).subscribe({
      next: (data: any) => this.current = data,
      error: () => this.error = 'Cidade não encontrada'
    });

    this.weatherService.getForecast(this.cityName).subscribe({
      next: (data: any) => {
        this.hourly = data.list.slice(0, 8);
        this.forecast = this.getDailyForecast(data.list);
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }

  getDailyForecast(list: any[]): any[] {
    const days: { [key: string]: any } = {};
    list.forEach(item => {
      const date = item.dt_txt.split(' ')[0];
      if (!days[date]) days[date] = item;
    });
    return Object.values(days).slice(0, 6);
  }

  isFavorite(): boolean {
    return this.favoritesService.isFavorite(this.cityName);
  }

  toggleFavorite() {
    if (this.isFavorite()) {
      this.favoritesService.removeFavorite(this.cityName);
    } else {
      this.favoritesService.addFavorite(this.cityName);
    }
  }

  getWeekDay(dtTxt: string): string {
    const date = new Date(dtTxt);
    return date.toLocaleDateString('pt-BR', { weekday: 'short' });
  }

  getHour(dtTxt: string): string {
    return dtTxt.split(' ')[1].slice(0, 5);
  }
}