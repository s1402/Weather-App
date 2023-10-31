import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
  ComponentFixture,
  fakeAsync,
  flush,
  TestBed,
  tick,
} from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';
import { of, throwError } from 'rxjs';
import { SharedService } from 'src/app/services/shared-service.service';
import { WeatherService } from 'src/app/services/weather-service';
import { HomeComponent, Weather } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let service: WeatherService;
  let sharedService: SharedService;
  let router: Router;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [
        HttpClientTestingModule,
        [
          LoggerModule.forRoot({
            level: NgxLoggerLevel.DEBUG,
            serverLogLevel: NgxLoggerLevel.ERROR,
          }),
        ],
        RouterTestingModule,
      ],
      providers: [WeatherService, Router, SharedService],
    }).compileComponents();
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(WeatherService);
    router = TestBed.inject(Router);
    sharedService = TestBed.inject(SharedService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call enter form', async () => {
    //arrange
    const input = document.createElement('input');
    const city = 'Delhi';
    input.value = city;
    const mockGetWeatherData = spyOn(component, 'getWeatherData');

    //act
    await component.enterForm(input);

    //assert
    expect(mockGetWeatherData).toHaveBeenCalledWith(city);
    expect(input.value).toBe('');
  });

  it('should call onfocus and clear input text', () => {
    const input = document.createElement('input');
    const city = 'Search for location...';
    input.value = city;

    //act
    component.onFocus(input);

    //assert
    expect(input.value).toBe('');
  });

  it('should call cross() and spice the errorList', () => {
    //arrange
    const mockErrorList = ['error1', 'error2'];
    component.errorList = mockErrorList;

    //act on index 0
    component.cross(0);

    //assert
    expect(component.errorList.length).toBe(1);
    expect(component.errorList).toEqual(['error2']);

    //act on ["error2"] to be empty
    component.cross(0);

    //assert
    expect(component.errorList.length).toBe(0);
    expect(component.errorList).toEqual([]);
  });

  it('should call getWeatherData() and get all weather data', fakeAsync(() => {
    //arrange
    const city = 'Delhi';
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
    const mockService = spyOn(service, 'getWeatherData').and.returnValue(
      of(mockResponse)
    );
    spyOn(router, 'navigate');

    //act
    component.getWeatherData(city);
    tick();

    //assert
    expect(sharedService.weatherData).toEqual(mockResponse);
    expect(router.navigate).toHaveBeenCalledWith([
      'weather',
      mockResponse.name,
    ]);
    expect(mockService).toHaveBeenCalledWith(city);
    //since setTimeout/observables is called in this method.
    flush();
  }));

  it('should call getWeatherData() and get error message for invalid city ', fakeAsync(() => {
    //arrange
    const city = 'invalidCity';
    const errorMessage = city + ' Not Found';
    const mockService = spyOn(service, 'getWeatherData').and.returnValue(
      throwError(() => {
        new Error(errorMessage);
      })
    );

    //act
    component.getWeatherData(city);
    tick();

    //assert
    expect(component.toastNotificationTimeout).toEqual(4000);
    expect(component.errorList).toEqual([errorMessage]);
    expect(mockService).toHaveBeenCalledWith(city);

    //since setTimeout/observables is called in this method.
    flush();
  }));
});
