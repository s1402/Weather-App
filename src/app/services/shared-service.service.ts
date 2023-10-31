import { Injectable } from '@angular/core';
import { Weather } from '../components/home/home.component';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  weatherData: Weather = {
    main: {
      temp: 0,
      feels_like: 0,
      temp_min: 0,
      temp_max: 0,
      pressure: 0,
      humidity: 0,
    },
    weather: [
      {
        main: '',
        description: '',
      },
    ],
    wind: {
      speed: 0,
      deg: 0,
    },
    name: '',
  };

  constructor() {}
}
