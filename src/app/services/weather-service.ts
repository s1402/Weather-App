import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private APPID: string;
  private API_URL: string;

  constructor(private http: HttpClient) {
    this.APPID = '2e7e1d8fabd7c153330e11d1f13782d9';
    this.API_URL = 'https://api.openweathermap.org/data/2.5/weather?q=';
  }

  getWeatherData(city: string): Observable<Object> {
    return this.http.get(
      this.API_URL + city + '&APPID=' + this.APPID + '&units=metric'
    );
  }
}
