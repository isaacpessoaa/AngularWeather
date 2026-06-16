import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class WeatherService {
  private apiKey = environment.openWeatherApiKey;
  private base = 'https://api.openweathermap.org/data/2.5';

  constructor(private http: HttpClient) {}

  getCurrentWeather(city: string) {
    return this.http.get(
      `${this.base}/weather?q=${city}&appid=${this.apiKey}&units=metric&lang=pt_br`
    );
  }

  getForecast(city: string) {
    return this.http.get(
      `${this.base}/forecast?q=${city}&appid=${this.apiKey}&units=metric&lang=pt_br`
    );
  }

  getWeatherByCoords(lat: number, lon: number) {
    return this.http.get(
      `${this.base}/weather?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=metric&lang=pt_br`
    );
  }
}