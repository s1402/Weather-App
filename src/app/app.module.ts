import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { WeatherService } from './services/weather-service';
import { ResultComponent } from './components/home/result/result.component';
import { RouterModule } from '@angular/router';
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';

@NgModule({
  declarations: [AppComponent, HomeComponent, ResultComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    LoggerModule.forRoot({
      level: NgxLoggerLevel.DEBUG,
      serverLogLevel: NgxLoggerLevel.ERROR,
    }),
    RouterModule.forRoot([
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'weather/:city',
        component: ResultComponent,
      },
    ]),
  ],
  providers: [WeatherService],
  bootstrap: [AppComponent]
})
export class AppModule {}
