import { Component, OnInit, Output, EventEmitter,DirectiveDecorator ,Directive } from '@angular/core';
import {GooglemapsService} from '../googlemaps.service';
import {OpenWeatherService} from '../openweather.service';
import {GooglemapsComponent} from '../googlemaps/googlemaps.component';


@Component({
  selector: 'app-moving-asset',
  templateUrl: './moving-asset-new.component.html',
  styleUrls: ['./moving-asset.component.css'],
  providers: [ OpenWeatherService, GooglemapsService,GooglemapsComponent]
})

@Directive({
  selector : '[AlertTrackingComponent]'
})

export class MovingAssetComponent implements OnInit {

  isButtonDisabled: boolean = false;


  message : string = 'Initial data';

  that: MovingAssetComponent = this;


  constructor(private maps: GooglemapsService, private openweather: OpenWeatherService, private google: GooglemapsComponent) { }

  onClicked(){
    // this.isButtonDisabled = true;
    this.maps.startAnimation(this,function(msg:string) {
      // console.log(msg);
      this.message = msg;
      // console.log(this);
    });

}

  stopjourney(){
    this.maps.stopjourney();
  }
  Waypoint_Coordinates = [
    {lat: 32.83574, lon: -113.35498000000001},
    {lat:34.29404, lon:-110.97811000000002},
    {lat:35.16819, lon:-107.89875},
    {lat:35.27568, lon:-103.50422},
    {lat:37.22889, lon:-100.65012}
  ];
  weatherData = {
    waypoint:[]
  }
  selectedCountry = "USA";
  ngOnInit() {
    this.maps.setCountry("USA");
  }

  changeCountry($event){
    $event.preventDefault();
    console.log('selected: ' + $event.target.value);
    this.maps.setCountry($event.target.value);
    this.google.updateCountry($event.target.value);
    // this.testCardsComponent.updateCountry($event.target.value);
  }
  updateWaypointValues() {
      //console.log(this.maps.getWaypointCoordinates());
      // console.log('Value is ',this.isButtonDisabled);

      var waypointCount = 0;
      for(let i=0; i<this.weatherData.waypoint.length;i++)
      {
          // console.log('waypoint count: i : '+i);
          // console.log('this.weatherData.waypoint[i].coordinates:  '+JSON.stringify(this.weatherData.waypoint[i].coordinates));
          this.openweather.getweatherInfoWaypoints(this.weatherData.waypoint[i].coordinates).subscribe(data => {
              // console.log(i+' : day temp: '+data.list[i].temp.day);
              // console.log(i+' : lat: '+data.city.coord.lat);
              this.weatherData.waypoint[i].day1.day_temp = Math.round(data.list[0].temp.day);
              this.weatherData.waypoint[i].day1.min_temp = Math.round(data.list[0].temp.min);
              this.weatherData.waypoint[i].day1.max_temp = Math.round(data.list[0].temp.max);
              this.weatherData.waypoint[i].day1.weather.icon = "http://openweathermap.org/img/w/"+data.list[0].weather[0].icon+'.png';
              this.weatherData.waypoint[i].day1.humidity = data.list[0].humidity;
              this.weatherData.waypoint[i].day1.windspeed = data.list[0].speed;
              this.weatherData.waypoint[i].day1.weather.description = data.list[0].weather[0].description;

              this.weatherData.waypoint[i].day2.day_temp = Math.round(data.list[1].temp.day);
              this.weatherData.waypoint[i].day2.min_temp = Math.round(data.list[1].temp.min);
              this.weatherData.waypoint[i].day2.max_temp = Math.round(data.list[1].temp.max);
              this.weatherData.waypoint[i].day2.weather.icon = "http://openweathermap.org/img/w/"+data.list[1].weather[0].icon+'.png';

              this.weatherData.waypoint[i].day3.day_temp = Math.round(data.list[2].temp.day);
              this.weatherData.waypoint[i].day3.min_temp = Math.round(data.list[2].temp.min);
              this.weatherData.waypoint[i].day3.max_temp = Math.round(data.list[2].temp.max);
              this.weatherData.waypoint[i].day3.weather.icon = "http://openweathermap.org/img/w/"+data.list[2].weather[0].icon+'.png';

              this.weatherData.waypoint[i].day4.day_temp = Math.round(data.list[3].temp.day);
              this.weatherData.waypoint[i].day4.min_temp = Math.round(data.list[3].temp.min);
              this.weatherData.waypoint[i].day4.max_temp = Math.round(data.list[3].temp.max);
              this.weatherData.waypoint[i].day4.weather.icon = "http://openweathermap.org/img/w/"+data.list[3].weather[0].icon+'.png';

              this.weatherData.waypoint[i].day5.day_temp = Math.round(data.list[4].temp.day);
              this.weatherData.waypoint[i].day5.min_temp = Math.round(data.list[4].temp.min);
              this.weatherData.waypoint[i].day5.max_temp = Math.round(data.list[4].temp.max);
              this.weatherData.waypoint[i].day5.weather.icon = "http://openweathermap.org/img/w/"+data.list[4].weather[0].icon+'.png';
              waypointCount++;
              if(waypointCount == this.weatherData.waypoint.length) {
                  this.maps.configureWayPoints(this.weatherData);
              }
              // console.log('waypoint no: '+waypointCount);
        });
      }

  }
  updateWaypoint(){
    // console.log('inside updateWaypoint function');
    var data =this.maps.getWaypointCoordinates();
    this.weatherData.waypoint.splice(0,this.weatherData.waypoint.length);
    //  console.log(' : '+JSON.stringify(data));
    //  console.log('length: '+data.waypoint.length)
    var j=0;
    for(var i=0; i<data.waypoint.length; i++){
      // var latlong = data.waypoint[i];
      //  console.log('latLong: '+ JSON.stringify(latlong));
      //  console.log('latLong: '+ latlong);
      // console.log('latitude: '+ latlong.lat);
      // console.log('longitude: '+ latlong.lng);
        var wayPointData = {
            'title': "Waypoint "+(i+1),
            'coordinates': { 'lat': data.waypoint[i].lat, 'lon': data.waypoint[i].lng},
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
        this.weatherData.waypoint.push(wayPointData);
        j++;
        if(j == data.waypoint.length ){
          // console.log('length: this.weatherData.waypoint :'+JSON.stringify(this.weatherData.waypoint[0].coordinates));
          this.updateWaypointValues();
        }
    }
    // console.log(JSON.stringify(this.weatherData))
  }

}
