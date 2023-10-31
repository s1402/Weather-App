import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { WeatherService } from './weather-service';
import { Weather } from '../components/home/home.component';

describe('WeatherService', () => {
  let service: WeatherService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(WeatherService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should make an HTTP GET request to fetch weather data for a city', () => {
    const city = 'Delhi';
    const url =
      'https://api.openweathermap.org/data/2.5/weather?q=Delhi&APPID=2e7e1d8fabd7c153330e11d1f13782d9&units=metric';

    service.getWeatherData(city).subscribe((data: any) => {
      expect(data).toBeTruthy();
      expect(data[4]).toEqual(city);
    });

    const req = httpTestingController.expectOne(url);
    expect(req.request.method).toBe('GET');

    const mockResponse: Weather = {
      weather: [
        {
          main: 'Haze',
          description: 'haze',
        },
      ],
      base: 'stations',
      main: {
        temp: 22.05,
        feels_like: 21.88,
        temp_min: 22.05,
        temp_max: 22.05,
        pressure: 1015,
        humidity: 60,
      },
      wind: {
        speed: 0,
        deg: 0,
      },
      name: 'Delhi',
    };
    req.flush(Object.values(mockResponse));
  });
});
