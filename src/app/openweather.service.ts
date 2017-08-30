import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import {WeatherInfo} from './weather-info';

@Injectable()
export class OpenWeatherService {

weatherData = [];
constructor(private http: Http) {}

getweatherInfoNew( coordinates) {
  return this.http.get(`http://api.openweathermap.org/data/2.5/forecast/daily?lat=${coordinates.lat}&lon=${coordinates.lng}&cnt=5&units=metric&appid=df87da0a2e3bbe71d9682f4f97153e16`)
  .map((res:Response) => res.json());
  // .subscribe(data => {
  //     this.weatherData.push(data);
  //   });
  // .map((res:Response) => {
  //   console.log('inside map rsponse'+res.json());
  //   this.weatherData.push(res.json());
  // });
  // return 'Success';
  // return this.weatherData;
}
getweatherInfoWaypoints( coordinates) {
  return this.http.get(`http://api.openweathermap.org/data/2.5/forecast/daily?lat=${coordinates.lat}&lon=${coordinates.lon}&cnt=5&units=metric&appid=df87da0a2e3bbe71d9682f4f97153e16`)
  .map((res:Response) => res.json());
}
// getWarehouseLocation(){
//     return this.http.get('./warehouseLocation.json').map(res => res.json());
// }

}
