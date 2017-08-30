import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

// import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { FixedAssetComponent } from './fixed-asset/fixed-asset.component';
import { MovingAssetComponent } from './moving-asset/moving-asset.component';
import { GooglemapsComponent } from './googlemaps/googlemaps.component';


import {GooglemapsService} from './googlemaps.service';
import {LambdaService} from './lambda.service';
import {OpenWeatherService} from './openweather.service';


import { AlertTrackingComponent } from './alert-tracking/alert-tracking.component';
import { WaypointsInfoComponent } from './waypoints-info/waypoints-info.component';
import { MarqueeAlertComponent } from './marquee-alert/marquee-alert.component';
import { WeatherForecastComponent } from './weather-forecast/weather-forecast.component';

import { NavbarComponent } from './navbar/navbar.component';
import { ConditionCheckComponent } from './condition-check/condition-check.component';
import { TestCardsComponent } from './test-cards/test-cards.component';
import { TestCardsComponentNew } from './test-cards-new/test-cards.component';
import { TestWaypontsComponent } from './test-wayponts/test-wayponts.component';
import { HomepageComponent } from './homepage/homepage.component';
import { FooterComponent } from './footer/footer.component';
import { FinalAlertComponent } from './final-alert/final-alert.component';

const appRoutes : Routes = [
  {
    path : 'fixed-asset',
    component : FixedAssetComponent
  },
  {
    path : 'moving-asset',
    component : MovingAssetComponent
  },
];

@NgModule({
  declarations: [
    AppComponent,
    FixedAssetComponent,
    MovingAssetComponent,
    GooglemapsComponent,
    AlertTrackingComponent,
    WaypointsInfoComponent,
    MarqueeAlertComponent,
    WeatherForecastComponent,
    NavbarComponent,
    ConditionCheckComponent,
    TestCardsComponent,
    TestCardsComponentNew,
    TestWaypontsComponent,
    HomepageComponent,
    FooterComponent,
    FinalAlertComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [GooglemapsService , LambdaService, OpenWeatherService],
  bootstrap: [HomepageComponent]
})
export class AppModule { }
