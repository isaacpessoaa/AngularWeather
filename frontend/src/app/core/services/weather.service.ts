import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class WeatherService {
  private base = 'http://localhost:3001/api/weather';

  constructor(private http: HttpClient) {}

  getCurrentWeather(city: string) {
    return this.http.get(`${this.base}/current?city=${city}`);
  }

  getForecast(city: string) {
    return this.http.get(`${this.base}/forecast?city=${city}`);
  }

  getWeatherByCoords(lat: number, lon: number) {
    return this.http.get(`${this.base}/coords?lat=${lat}&lon=${lon}`);
  }
}