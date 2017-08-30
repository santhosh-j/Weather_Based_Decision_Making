import { Component, OnInit, Input, HostListener, Output, EventEmitter } from '@angular/core';
import {GooglemapsService} from '../googlemaps.service';
import {Marker} from './marker';
import {Observable} from 'rxjs/Observable';
import {OpenWeatherService} from '../openweather.service';
// import {TestCardsComponentNew} from '../test-cards-new/test-cards.component';

declare var google: any;
declare var map: any;


@Component({
  selector: 'app-googlemaps',
  templateUrl: './googlemaps.component.html',
  styleUrls: ['./googlemaps.component.css'],
  providers : [GooglemapsService, OpenWeatherService]
})
export class GooglemapsComponent implements OnInit {

  //  @Input() pageInfo: string;

  // mess : string = '';

  // isItMoving: boolean = false;
  // onClicked() {
  //      this.maps.startAnimation();
  // }

  constructor(private maps: GooglemapsService, private openweather: OpenWeatherService) { }

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
  country = "USA";
  ngOnInit() {

    this.updateWarehouseData();
    // if (this.pageInfo == "moving") {
    //   this.isItMoving = true;
    // }

    // var markers = this.prepareMarkersArray();
    // this.maps.configureMaps(markers);

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
          var warehouseData = {
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
          this.weatherData.warehouse.push(warehouseData);
          k++;
          if(k == coordinatesValues.length ){
            this.updateWarehouseValues();
          }
      }
  }
  updateWarehouseValues() {
    var coordinatesValues = [];
    if(this.country == "USA"){
       coordinatesValues = this.warehouse.USA;
    }
    else if(this.country == "Europe"){
      coordinatesValues = this.warehouse.Europe;
    }
    var coordinateLength = 0;
    var k = 0;
    for(let i=0; i<coordinatesValues.length;i++)
    {
        // console.log('')
        this.openweather.getweatherInfoNew(coordinatesValues[i]).subscribe(data => {
            // console.log('data: '+JSON.stringify(data));
            this.weatherData.warehouse[i].day1.day_temp = data.list[0].temp.day;
            this.weatherData.warehouse[i].day1.min_temp = data.list[0].temp.min;
            this.weatherData.warehouse[i].day1.max_temp = data.list[0].temp.max;
            this.weatherData.warehouse[i].day1.humidity = data.list[0].humidity;
            this.weatherData.warehouse[i].day1.windspeed = data.list[0].speed;
            this.weatherData.warehouse[i].day1.weather.icon = "http://openweathermap.org/img/w/"+data.list[0].weather[0].icon+'.png';

            this.weatherData.warehouse[i].day2.day_temp = data.list[1].temp.day;
            this.weatherData.warehouse[i].day2.min_temp = data.list[1].temp.min;
            this.weatherData.warehouse[i].day2.max_temp = data.list[1].temp.max;
            this.weatherData.warehouse[i].day2.weather.icon = "http://openweathermap.org/img/w/"+data.list[1].weather[0].icon+'.png';

            this.weatherData.warehouse[i].day3.day_temp = data.list[2].temp.day;
            this.weatherData.warehouse[i].day3.min_temp = data.list[2].temp.min;
            this.weatherData.warehouse[i].day3.max_temp = data.list[2].temp.max;
            this.weatherData.warehouse[i].day3.weather.icon = "http://openweathermap.org/img/w/"+data.list[2].weather[0].icon+'.png';

            this.weatherData.warehouse[i].day4.day_temp = data.list[3].temp.day;
            this.weatherData.warehouse[i].day4.min_temp = data.list[3].temp.min;
            this.weatherData.warehouse[i].day4.max_temp = data.list[3].temp.max;
            this.weatherData.warehouse[i].day4.weather.icon = "http://openweathermap.org/img/w/"+data.list[3].weather[0].icon+'.png';

            this.weatherData.warehouse[i].day5.day_temp = data.list[4].temp.day;
            this.weatherData.warehouse[i].day5.min_temp = data.list[4].temp.min;
            this.weatherData.warehouse[i].day5.max_temp = data.list[4].temp.max;
            this.weatherData.warehouse[i].day5.weather.icon = "http://openweathermap.org/img/w/"+data.list[4].weather[0].icon+'.png';
            coordinateLength = coordinateLength + 1;
            if(coordinateLength == coordinatesValues.length){
                this.maps.configureMapsNew(this.weatherData.warehouse);
                // this.testCardsComponent.updateWarehouseData(this.weatherData.warehouse);
            }
      });
    }
  }
  updateCountry(country){
    // console.log("country in google map component: "+country);
    this.country = country;
    this.updateWarehouseData();
  }
  // markers: Marker[];

  prepareMarkersArray() {
    // var markers : Marker[];
    type MyArrayType = Array<Marker>;
    // var markers : Marke;

    var marker1: Marker = {
      lat: 34.052235,
      lng: -118.243683,
      title: "warehouse1",
      draggable: false
    };
    var marker2: Marker = {
      lat: 38.846127,
      lng: -104.800644,
      title: "warehouse2",
      draggable: false
    };

    var marker3: Marker = {
      lat: 32.897480,
      lng: -97.040443,
      title: "warehouse3",
      draggable: false
    };

    var marker4: Marker = {
      lat: 39.952584,
      lng: -75.165222,
      title: "warehouse4",
      draggable: false
    };
    var markers: MyArrayType = [
      marker1,
      marker2,
      marker3,
      marker4,
    ];
    // console.log(markers);
    return markers;
  }

}
