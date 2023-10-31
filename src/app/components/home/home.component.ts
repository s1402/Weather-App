import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NGXLogger } from 'ngx-logger';
import { catchError, of } from 'rxjs';
import { SharedService } from 'src/app/services/shared-service.service';
import { WeatherService } from 'src/app/services/weather-service';

export interface Weather {
  base?: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  weather: [
    {
      main: string;
      description: string;
    }
  ];
  wind: {
    speed: number;
    deg: number;
  };
  name: string;
}

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(
    private service: WeatherService,
    private sharedService: SharedService,
    public logger: NGXLogger,
    private router: Router
  ) {}

  ngOnInit(): void {}

  errorMessage: string = '';
  toastNotificationTimeout: number = 0;
  errorList: string[] = [];

  async enterForm(input: HTMLInputElement) {
    const city = input.value;
    input.value = '';

    if (city) {
      await this.getWeatherData(city);
    }
  }

  async getWeatherData(city: string) {
    this.service
      .getWeatherData(city)
      .pipe(
        catchError(() => {
          this.toastNotificationTimeout = 4000;
          this.errorMessage = city + ' Not Found';
          this.errorList.push(this.errorMessage);
          setTimeout(() => {
            this.errorList.splice(0, 1);
          }, this.toastNotificationTimeout);
          return of(null);
        })
      )
      .subscribe((response: any) => {
        if (response !== null) {
          this.logger.log(response);
          this.sharedService.weatherData = response;
          this.router.navigate([
            'weather',
            this.sharedService.weatherData.name,
          ]);
        }
      });
  }

  onFocus(input: HTMLInputElement) {
    if (input.value == 'Search for location...') {
      input.value = '';
    }
  }

  cross(index: number) {
    this.errorList.splice(index, 1);
  }
}
