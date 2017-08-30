import { Component, OnInit } from '@angular/core';
import {LambdaService} from '../lambda.service';
import {OpenWeatherService} from '../openweather.service';
import {GooglemapsService} from '../googlemaps.service';
// import {GooglemapsService} from '../googlemaps.service';
import { Http, Response } from '@angular/http';
import {WeatherInfo} from '../weather-info';
import {GooglemapsComponent} from '../googlemaps/googlemaps.component';

// import {GooglemapsComponent} from '../googlemaps/googlemaps.component';


@Component({
  selector: 'app-test-cards-new',
  templateUrl: './test-cards-new.component.html',
  styleUrls: ['./test-cards.component.css'],
  providers: [ OpenWeatherService, GooglemapsService,GooglemapsComponent]//,GooglemapsService]
})
export class TestCardsComponentNew implements OnInit {


  constructor(private lambda : LambdaService, private openweather: OpenWeatherService, private http: Http, private maps: GooglemapsService, private google:GooglemapsComponent) {}

// day_Icons ={
//     "Sunny"  :  "wi-day-sunny",
//     "Mostly Sunny" : "wi-day-sunny-overcast",
//     "Partly Sunny" : "wi-day-cloudy-high",
//     "Intermittent Clouds" : "wi-day-cloudy",
//     "Hazy Sunshine" : "wi-day-haze",
//     "Mostly Cloudy" : "wi-day-cloudy-high",
//     "Cloudy" : "wi-cloudy",
//     "Dreary"  : "wi-smog",
//     "Fog" : "wi-fog",
//     "Showers" : "wi-day-rain",
//     "Mostly Cloudy w/ Showers" : "wi-day-sprinkle",
//     "Partly Sunny w/ Showers" : "wi-day-rain-mix",
//     "T-Storms" : "wi-day-thunderstorm",
//     "Thunderstorms" : "wi-day-thunderstorm", // Newly added
//     "Mostly Cloudy w/ T-Storms" : "wi-day-thunderstorm",
//     "Partly Sunny w/ T-Storms" : "wi-day-thunderstorm",
//     "Rain" : "wi-day-rain",
//     "Flurries" : "wi-snow",
//     "Mostly Cloudy w/ Flurries" : "wi-snow",
//     "Partly Sunny w/ Flurries" : "wi-day-snow",
//     "Snow" : "wi-snow",
//     "Mostly Cloudy w/ Snow" : "wi-snow",
//     "Ice" : "wi-snowflake-cold",
//     "Sleet" : "wi-hail",
//     "Freezing Rain" : "wi-rain-wind",
//     "Rain and Snow" : "wi-rain-mix",
//     "Hot" : "wi-hot",
//     "Cold" : "wi-thermometer",
//     "Windy" : "wi-windy"
// };


weather : WeatherInfo =
{
  searchtype: "daily",
  searchtime: "5day",
  locationId: ["2626754","327351","336107","2156799"  ]
}


  // result ={
  //
  //   // ***********************************************First card *************************************
  //   //temp and unit for current day
  //   temp_max : "",    temp_unit : "",
  //   //Icons for current and future
  //   day_iconphrase_current : "",    day_iconphrase1 : "",    day_iconphrase2 : "",    day_iconphrase3 : "",
  //   // temp variables for future
  //   temp_tmrw_max : "",    temp_tmrw_min : "",    temp_tmrw1_max : "",    temp_tmrw1_min : "",    temp_tmrw2_max : "",    temp_tmrw2_min : "",
  //   // ***********************************************Second card *************************************
  //   //temp and unit for current day
  //   temp_max_scnd : "",    temp_unit_scnd : "",
  //   //Icons for current and future
  //   day_iconphrase_current_scnd : "",    day_iconphrase1_scnd : "",    day_iconphrase2_scnd : "",    day_iconphrase3_scnd : "",
  //   // temp variables for future
  //   temp_tmrw_max_scnd : "",    temp_tmrw_min_scnd : "",    temp_tmrw1_max_scnd : "",    temp_tmrw1_min_scnd : "",    temp_tmrw2_max_scnd : "",    temp_tmrw2_min_scnd : "",
  //   // ***********************************************Third card *************************************
  //   //temp and unit for current day
  //   temp_max_thrd : "",    temp_unit_thrd : "",
  //   //Icons for current and future
  //   day_iconphrase_current_thrd : "",    day_iconphrase1_thrd : "",    day_iconphrase2_thrd : "",    day_iconphrase3_thrd : "",
  //   // temp variables for future
  //   temp_tmrw_max_thrd : "",    temp_tmrw_min_thrd : "",    temp_tmrw1_max_thrd : "",    temp_tmrw1_min_thrd : "",    temp_tmrw2_max_thrd : "",    temp_tmrw2_min_thrd : "",
  //   // ***********************************************Fourth card *************************************
  //   //temp and unit for current day
  //   temp_max_frth : "",    temp_unit_frth : "",
  //   //Icons for current and future
  //   day_iconphrase_current_frth : "",    day_iconphrase1_frth : "",    day_iconphrase2_frth : "",    day_iconphrase3_frth : "",
  //   // temp variables for future
  //   temp_tmrw_max_frth : "",    temp_tmrw_min_frth : "",    temp_tmrw1_max_frth : "",    temp_tmrw1_min_frth : "",    temp_tmrw2_max_frth : "",    temp_tmrw2_min_frth : "",
  // }

  temp_tmrw_1 : Date ;
  temp_tmrw_2 : number ;

  day_Icons_info = [];
  // myDate : ;

  datee_current : string;
  datee1 : string;datee1_scnd :string;datee1_thrd :string;datee1_frth :string;
  datee2 : string;datee2_scnd :string;datee2_thrd :string;datee2_frth :string;
  datee3 : string;datee3_scnd :string;datee3_thrd :string;datee3_frth :string;

  obj : Object;
  Coordinates_Values = [
    { lat: 34.052235, lon: -118.243683},
    { lat: 38.846127, lon: -104.800644},
    { lat: 32.89748, lon: -97.040443},
    { lat: 39.952584, lon: -75.165222}
  ];
  warehouse ={
    "USA":[
      {lat: 19.027673, lng: -99.330484},   //Chilpancingo
      {lat: 34.052235, lng: -118.243683},  //Los Angeles
      {lat: 41.873087, lng: -87.643893},    //CHicago
      {lat: 29.760624, lng: -95.365310},  //Houston, TX, USA
      {lat: 47.308434, lng: -119.889059},  //Washington
      {lat: 53.968790, lng: -105.577784},    //Saskatchewan
      {lat: 37.775731, lng: -122.419991},    //San Francisco
      {lat: 46.905485, lng: -96.697949},    //Forgo
      {lat: 42.360129, lng: -71.059484},    //Boston, MA, USA
      {lat: 42.883509, lng: -112.446970},      //Pocatello, ID, USA
      {lat: 38.769184, lng: -98.342271},       //Kansas
      {lat: 29.063742, lng: -110.954147},   //Hermosillo, Mexico
      {lat: 33.758161, lng: -84.382418}     //Atlanta-Sandy Springs-Roswell
    ],
    "Europe":[
        {lat: 48.856804, lng: 2.350752},   //Paris
        {lat: 51.506554, lng: -0.127056},  //Greater London, United Kingdom
        {lat: 45.463772, lng: 9.189958},   //Milan metropolitan, Italy
        {lat: 45.815072, lng: 24.898282},   //Romania
        {lat: 40.415931, lng: -3.703132},  //Madrid metropolitan area, Spain
        {lat: 52.362607, lng: 4.891450},   //Randstad, Netherlands
        {lat: 50.110788, lng: 8.682081},   //Frankfurt/Rhine-Main, Germany
        {lat: 41.903601, lng: 12.495481},  // Rome, Italy
        {lat: 53.123212, lng: 18.009219},  // Bydgoszcz, Poland
        {lat: 48.207783, lng: 16.374014},  // Vienna metropolitan area, Austria
        {lat: 52.056330, lng: -2.717799},   //Hereford
        {lat: 55.953108, lng: -3.187144},   //Edinburch
        {lat: 39.486893, lng: 22.564071},   //Greece
        {lat: 49.041235, lng: 31.472373},   //Ukraine
        {lat: 58.697453, lng: 25.817627},   //Estonia
        {lat: 53.196869, lng: 28.041123},   //Belarus
        {lat: 48.014030, lng: 37.814875}   //Ukraine 2
    ]
  };
  weatherData = {
        warehouse:[]
  };
  selectedCountry = "USA";
  country ="USA";
  ngOnInit() {
    this.updateWarehouseData();
     this.maps.setCountry("USA");
  }

  changeCountry($event){
    $event.preventDefault();
    console.log('selected: ' + $event.target.value);
    this.country =  $event.target.value;
    this.maps.setCountry($event.target.value);
    this.google.updateCountry($event.target.value);
    this.updateWarehouseData();
    // this.testCardsComponent.updateCountry($event.target.value);
  }
  updateWarehouseData(){
      this.weatherData.warehouse.splice(0,this.weatherData.warehouse.length);
      var coordinatesValues = [];
      if(this.country == "USA"){
         coordinatesValues = this.warehouse.USA;
      }
      else if(this.country == "Europe"){
        coordinatesValues = this.warehouse.Europe;
      }
      var k = 0;
        for(let j=0; j<coordinatesValues.length;j++){
            var weatherData = {
                'title': "Warehouse "+(j+1),
                'coordinates': { 'lat': coordinatesValues[j].lat, 'lon': coordinatesValues[j].lng},
                'day1': { 'date': '', 'day_temp':Number,  'min_temp':Number,  'max_temp':Number,  'presure':Number,  'humidity':Number,  'windspeed':Number,
                        'weather':{ 'id': Number,  'main': '',  'description': '',  'icon': ''}},
                'day2': { 'date': '', 'day_temp':Number,  'min_temp':Number,  'max_temp':Number,  'presure':Number,  'humidity':Number,  'windspeed':Number,
                        'weather':{ 'id': Number,  'main': '',  'description': '',  'icon': ''}},
                'day3': { 'date': '', 'day_temp':Number,  'min_temp':Number,  'max_temp':Number,  'presure':Number,  'humidity':Number,  'windspeed':Number,
                        'weather':{ 'id': Number,  'main': '',  'description': '',  'icon': ''}},
                'day4': { 'date': '', 'day_temp':Number,  'min_temp':Number,  'max_temp':Number,  'presure':Number,  'humidity':Number,  'windspeed':Number,
                        'weather':{ 'id': Number,  'main': '',  'description': '',  'icon': ''}},
                'day5': { 'date': '', 'day_temp':Number,  'min_temp':Number,  'max_temp':Number,  'presure':Number,  'humidity':Number,  'windspeed':Number,
                        'weather':{ 'id': Number,  'main': '',  'description': '',  'icon': ''}},
            }
            this.weatherData.warehouse.push(weatherData);
            k++;
            if(k == coordinatesValues.length ){
              this.updateWarehouseValues();
            }
        }
  }
  updateCountry(data){
    // console.log("country in google map component: "+data);
    this.country = data;
    this.updateWarehouseData();
    // this.weatherData.warehouse = data;
    // console.log("weatherData: -- test cards component --"+JSON.stringify(this.weatherData.warehouse));
  }
  updateWarehouseValues(){
    var coordinatesValues = [];
    if(this.country == "USA"){
       coordinatesValues = this.warehouse.USA;
    }
    else if(this.country == "Europe"){
      coordinatesValues = this.warehouse.Europe;
    }
    // console.log('coordinatesValues'+JSON.stringify(coordinatesValues))
    for(let i=0; i<coordinatesValues.length;i++)
    {
        this.openweather.getweatherInfoNew(coordinatesValues[i]).subscribe(data => {
            // console.log(i+' : day temp: '+data.list[i].temp.day);
            // console.log(i+' : lat: '+data.city.coord.lat);
            // console.log(this.Coordinates_Values[i].lat);

            this.weatherData.warehouse[i].day1.day_temp = Math.round(data.list[0].temp.day);
            this.weatherData.warehouse[i].day1.min_temp = Math.round(data.list[0].temp.min);
            this.weatherData.warehouse[i].day1.max_temp = Math.round(data.list[0].temp.max);
            this.weatherData.warehouse[i].day1.weather.icon = "http://openweathermap.org/img/w/"+data.list[0].weather[0].icon+'.png';

            this.weatherData.warehouse[i].day2.day_temp = Math.round(data.list[1].temp.day);
            this.weatherData.warehouse[i].day2.min_temp = Math.round(data.list[1].temp.min);
            this.weatherData.warehouse[i].day2.max_temp = Math.round(data.list[1].temp.max);
            this.weatherData.warehouse[i].day2.weather.icon = "http://openweathermap.org/img/w/"+data.list[1].weather[0].icon+'.png';

            this.weatherData.warehouse[i].day3.day_temp = Math.round(data.list[2].temp.day);
            this.weatherData.warehouse[i].day3.min_temp = Math.round(data.list[2].temp.min);
            this.weatherData.warehouse[i].day3.max_temp = Math.round(data.list[2].temp.max);
            this.weatherData.warehouse[i].day3.weather.icon = "http://openweathermap.org/img/w/"+data.list[2].weather[0].icon+'.png';

            this.weatherData.warehouse[i].day4.day_temp = Math.round(data.list[3].temp.day);
            this.weatherData.warehouse[i].day4.min_temp = Math.round(data.list[3].temp.min);
            this.weatherData.warehouse[i].day4.max_temp = Math.round(data.list[3].temp.max);
            this.weatherData.warehouse[i].day4.weather.icon = "http://openweathermap.org/img/w/"+data.list[3].weather[0].icon+'.png';

            this.weatherData.warehouse[i].day5.day_temp = Math.round(data.list[4].temp.day);
            this.weatherData.warehouse[i].day5.min_temp = Math.round(data.list[4].temp.min);
            this.weatherData.warehouse[i].day5.max_temp = Math.round(data.list[4].temp.max);
            this.weatherData.warehouse[i].day5.weather.icon = "http://openweathermap.org/img/w/"+data.list[4].weather[0].icon+'.png';
      });
    }
  }

}
