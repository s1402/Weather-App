import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/services/shared-service.service';

@Component({
  selector: 'result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css'],
})
export class ResultComponent implements OnInit {
  constructor(private sharedService: SharedService, private router: Router) {}

  backgroundImageUrl: string = '../../../../assets/Bg-';

  description: string = '';
  temp: number = 0;
  min: number = 0;
  max: number = 0;
  feelsLike: number = 0;
  pressure: number = 0;
  humidity: number = 0;
  name: string = '';
  windSpeed: number = 0;
  mainDescription: string = '';

  ngOnInit() {
    this.mainDescription = this.sharedService.weatherData.weather[0].main;
    this.description =
      this.sharedService.weatherData.weather[0].description.toLocaleUpperCase();
    this.temp = this.sharedService.weatherData.main.temp;
    this.feelsLike = this.sharedService.weatherData.main.feels_like;
    this.min = this.sharedService.weatherData.main.temp_min;
    this.max = this.sharedService.weatherData.main.temp_max;
    this.pressure = this.sharedService.weatherData.main.pressure;
    this.humidity = this.sharedService.weatherData.main.humidity;
    this.name = this.sharedService.weatherData.name;
    this.windSpeed = this.sharedService.weatherData.wind.speed;
    if (this.name === '') {
      this.goBack();
    }
  }

  getBackGroundImage() {
    return this.backgroundImageUrl + this.mainDescription + '.jpg';
  }

  goBack() {
    this.router.navigate(['']);
  }
}
