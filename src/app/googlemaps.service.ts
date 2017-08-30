import { Component, Input, OnInit, Injectable } from '@angular/core';
// import { MarkerInfowindowComponent } from '../google-maps/marker-infowindow.component';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import {Observable} from 'rxjs/Rx';
import {OpenWeatherService} from './openweather.service';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
declare var swal: any;

declare var $: any;
declare var x: any;
declare var google: any;
declare var map: any;
var globalMap;
// var google;
var msg = '';
var marker;
var interval;
var alt_route = false;
var dist1, dist2, dist3, dist4, dist5;
var directionsService;
var directionsDisplay2;
var directionsDisplay;
var directionsDisplay3;
var movingAsset;
var summaryPanel;
var route;
var setInt;
var cur_pos_lat, cur_pos_lng;

var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
var labelIndex = 0;
var markers = [];

var response1;
var response2;

var per_25, per_50, per_75;

var waypointData; //waypoint information
var overviewpath; // overviewpath of orgin and destination

var clickCount = 0;
var source;
var destination;
var waypointCoordinates=[];
var overviewPathIndex=[];
var badWeatherpoint;
var badWeatherIndex;
var country;
var mapCenter;
var openweather;


var sanfrancisco = { lat: 37.773972, lng: -122.431297 };
var indianapolis = { lat: 39.79, lng: -86.14 };
var sanDiego = { lat: 32.715736, lng: -117.161087 };
var kansas = { lat: 37.697948, lng: -97.314835 };

//dan deigo to kansas
var waypoint1 = { lat: 32.83574, lng: -113.35498000000001 }; //2132997 Aztec
var waypoint2 = { lat: 34.29404, lng: -110.97811000000002 }; //2274049 Hunter creek
var waypoint3 = { lat: 35.16819, lng: -107.89875 };//2233812 Milan
var waypoint4 = { lat: 35.27568, lng: -103.50422 }; //339583 Logan
var waypoint5 = { lat: 37.22889, lng: -100.65012 }; //343260 Kismet

//dataware house
var dwh = {
  dwh1: new google.maps.LatLng(34.052235, -118.243683), //Los Angeles
  dwh2: new google.maps.LatLng(38.846127, -104.800644), //Colorado Denver
  dwh3: new google.maps.LatLng(32.89748, -97.040443), //CHicago
  dwh4: new google.maps.LatLng(39.952584, -75.165222) // Newyork
};
var warehouse ={
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
      {lat: 48.014030, lng: 37.814875},   //Ukraine 2
  ]
};
var objec: any;
@Injectable()
export class GooglemapsService {

  constructor(private openweather1: OpenWeatherService ) {
    openweather = OpenWeatherService;
    objec = this;
  }

  configureWayPoints(data) {
    waypointData = data.waypoint;
  }
  getWaypointCoordinates(){
    var wd = JSON.parse(JSON.stringify({'waypoint':waypointCoordinates, 'source':source, 'destination':destination}));
    return wd;
  }
  setCountry(countryIn){
    country = countryIn;
    if(country == "USA"){
      mapCenter = {
        lat: 38.853976,
        lng: -98.627282
      };
    }
    else {
      mapCenter = {
          lat: 48.599261,
          lng: 21.109196
      }
    }

  }
  configureMapsNew(inputMarkerArray) {

    // var mapCenter1 = {
    //     lat: 48.599261,
    //     lng: 21.109196
    // }
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 5,
      center: mapCenter,
      fullscreenControl: false,
      rotateControl: false,
      streetViewControl: false,

    });
    // var origin = sanDiego;
    directionsDisplay3 = new google.maps.DirectionsRenderer({
      map: map
    });
  //  var map = new google.maps.Map(document.getElementById('map'), { zoom: 18, center: origin });
  //  var clickHandler = new ClickEventHandler(map, origin);
    map.addListener('click', function(e) {
      clickEvent(e.latLng);
    });
    function clickEvent(latlng){
      if(clickCount % 2 == 0){
        source = latlng;
        // var coord = JSON.parse(JSON.stringify(latlng));
        // var coords = coord.lat +","+coord.lng;
        // console.log('coords: '+coords);
        // var geocoder = new google.maps.Geocoder();
        // geocoder.geocode({'address': coords}, function(results, status) {
        //   if (status === 'OK') {
        // //   //  resultsMap.setCenter(results[0].geometry.location);
        // //   //  var marker = new google.maps.Marker({
        // // //      map: resultsMap,
        // //     //  position: results[0].geometry.location
        // //   });
        // // console.log('response: '+JSON.stringify(results));
        //   } else {
        //     alert('Geocode was not successful for the following reason: ' + status);
        //   }
        // });
        // addMarker(latlng,'S');
        let marker = new google.maps.Marker({
          position: latlng,
          label:'S',
          map: map
        });
        markers.push(marker);
      }
      else{
        destination = latlng;
        placeMarker(latlng, map);
      }
      clickCount++;
    }
    function placeMarker(latLng, map) {
      setMapOnAll(null);
      markers=[];
      var request3 = {
        destination: destination,
        origin: source,
        travelMode: 'DRIVING'
      };
      var directionsService3 = new google.maps.DirectionsService();
      directionsService3.route(request3, function(response, status) {
        if (status == 'OK') {
          directionsDisplay3.setDirections(response);
          response2 = response;

          var route2 = response2.routes[0];

          overviewpath = route2.overview_path;
          // console.log('response2 : '+ JSON.stringify(response));
          var totalWaypoints = Math.floor(overviewpath.length / 20);
          waypointCoordinates.splice(0,waypointCoordinates.length);
          overviewPathIndex.splice(0,overviewPathIndex.length);
          badWeatherpoint = Math.floor(totalWaypoints*3/4);

          // console.log('overviewpath.length: ' + overviewpath.length +' totalWaypoints: '+totalWaypoints+' badWeatherpoint: '+badWeatherpoint);
          var totalWaypointsCount = 0;
          for (var j = 1; j <= totalWaypoints; j++) {
            if(overviewpath[j * 20] !=null){
              addMarker(overviewpath[j * 20],j);
              waypointCoordinates.push(overviewpath[j * 20]);
              overviewPathIndex.push(j*20);
              addMarkerListener(overviewpath[j * 20],j);
              if(j == badWeatherpoint){
                badWeatherIndex = j*20;
              }
            }
            else {
              console.log("Hello "+overviewpath[j * 20]);
            }
            totalWaypointsCount++;
            if(totalWaypointsCount == totalWaypoints) {

            }
          }

        }
        else{
          alert('No Routes available for selected location.. \nChoose different location..\n\n\n\n');
          // swal({
          //   text: 'No Routes available for selected location \nChoose different location',
          //   type:'info'
          // });
        }
      });
      //map.panTo(latLng);
    }
    function addMarker(latlng, i){
        var marker = new google.maps.Marker({
          position: latlng,
          icon:'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
          map: map
        });
        markers.push(marker);
    }
    function addMarkerListener(latlng,j) {
      // for(var j=0; j<waypointCoordinates.length;j++) {
        // console.log("j= "+j);
          var latlng1 = JSON.parse(JSON.stringify(latlng));
          objec.openweather1.getweatherInfoNew(latlng1).subscribe(data => {
            var windspeed = Math.round(data.list[0].speed) * 3.6;
            // console.log("j= "+j+"**latlng1= "+JSON.stringify(latlng1));
            markers[j-1].addListener('click', function() {
              $('#myModal').modal('show');
              $('#myModalLabel').html(`<div class='container-fluid' style='text-align:center'<div ><h2>Waypoint `+j+`</h2></div></div>`);
              // $('#myModalLabel').html(`<div class='container-fluid'><div class='row'><div class='col-md-12'><h2>Waypoint ${i}</h2><h6><b>Location</b><br/>* Latitude: <i>${latlng1.lat}</i> <br/> * Longitude: <i> ${latlng1.lng} </i></h6></div></div></div>`);

              // var modalBody = `<div class='container-fluid'><div class='row'><div class='col-md-4' style='font-size:150px;margin-top:30px;'</div><div class='col-md-8'><div class='card'><div class='card-block'><div class='card-text'><h6>Temperature : 20&deg F</h6><h6>Humidity :40 %</h6><h6>Wind : 120Km/hr</h6></div></div></div></div></div></div>`;

              var modalbb=`<div class='container-fluid'><div class='row'><div class='col-md-12'><h6><b>Location</b><br/>* Latitude: <i>${latlng1.lat}</i> <br/> * Longitude: <i> ${latlng1.lng} </i></h6></div></div></div>
              <div class="container-fluid">
                <div class="row">
                    <div class="col-md-8" >
                      <div class="weather">
                          <div class="current" >
                              <div class="info">
                                  <div>&nbsp;</div>
                                  <div class="temp">Temperature: ${Math.round(data.list[0].temp.day)} &deg; <small>C</small></div>
                                  <div>Humidity: ${Math.round(data.list[0].humidity)} % </div>
                                  <div>Wind Speed: ${windspeed} Km/hr </div>
                                  <div>Description:  ${data.list[0].weather[0].description}  </div>
                              <div>&nbsp;</div>
                              </div>
                          </div>
                      </div>
                    </div>
                    <div class="col-md-2" >
                        <div>&nbsp;</div>
                        <img src="http://openweathermap.org/img/w/${data.list[0].weather[0].icon}.png" />
                    </div>
            </div> </div>
            `
              $('.modal-body').html(modalbb);
            });
          });
      // }
    }
    function setMapOnAll(map) {
        for (var i = 0; i < markers.length; i++) {
          markers[i].setMap(map);
        }
      }

    globalMap = map;
    map.setCenter(mapCenter);
    drop(inputMarkerArray); // This sets all the markers to be plotted on the map.
    function drop(inputMarkerArray) {
      //    console.log(inputMarkerArray.length);
      //    console.log(inputMarkerArray[0]);

      for (var i = 0; i < inputMarkerArray.length; i++) {
        setTimeout(plot(inputMarkerArray, i), i * 200);
      }
    }

    function plot(inputMarkerArray, i) {
      directionsService = new google.maps.DirectionsService;
      directionsDisplay = new google.maps.DirectionsRenderer;
      var location = {
        lat: inputMarkerArray[i].coordinates.lat,
        lng: inputMarkerArray[i].coordinates.lon
      };
      var title = inputMarkerArray[i].title;
      var day_temp = inputMarkerArray[i].day1.day_temp;
      var humidity = inputMarkerArray[i].day1.humidity;
      var icon = inputMarkerArray[i].day1.weather.icon;
      var windspeed = (inputMarkerArray[i].day1.windspeed * 3.6).toFixed(2);
      var iconBase = "http://maps.google.com/mapfiles/kml/shapes/"
      var icons = {
        warehouse: {
          icon: iconBase + "ranger_station.png"
        }
      };
      var marker = new google.maps.Marker({
        map: map,
        position: location,
        title: title,
        draggable: false,
        animation: google.maps.Animation.DROP,
        icon: "../../assets/warehouse-40x40.png"

      });
      var contentString = "<h6>" + title + "</h6><small>for more info right click icon</small>";

      function MoreInfoButtonClicked() {
        console.log("More info button clicked");

      }
      var infowindow = new google.maps.InfoWindow({
        content: contentString
      });
      marker.addListener('mouseover', function() {
        infowindow.open(map, marker);
        // console.log("marker clicked at " + JSON.stringify(location));
      });
      marker.addListener('mouseout', function() {
        infowindow.close();

      });
      marker.addListener('click', function(e) {
      //  console.log("warehouse clicked at " + JSON.stringify(event));
        clickEvent(e.latLng);
      });
      marker.addListener('rightclick', function() {
        $('#myModal').modal('show');
        $('#myModalLabel').text(title);
        $('#myModalLabel').html("<div><h4>" + title + "</h4><h5><small><b>Location</b><br/>* Latitude: <i>" + location.lat + "</i> <br/> * Longitude: <i>" + location.lng + "</i></small></h5></div");

        var modalBody = `<div class='container-fluid'><div class='row'><div class='col-md-4' style='font-size:150px;margin-top:30px;'>  <img src=${icon} width='150' height='150' /></div><div class='col-md-8'><div class='alert alert-success'>no alerts : All good here!</div><div class='card'><div class='card-block'><div class='card-text'><p>Temperature : ${day_temp}&deg F</p><p>Humidity : ${humidity} %</p><p>Wind : ${windspeed}Km/hr</p></div></div></div></div><div class='col-md-12'><div class='card'><div class='card-title' style='text-align:center'><b>Stock Details</b></div><div class='card-block'><div class='row'><div class='col-md-6'><h6>Perishable goods</h6></div><div class='col-md-4'><p>7 units</p></div></div><div class='row'><div class='col-md-6'><h6>Stable goods</h6></div><div class='col-md-6'><p>21 units</p></div></div><div class='row'><div class='col-md-6'><h6>Total capacity</h6></div><div class='col-md-6'><p>48 units</p></div></div></div></div></div></div><div>`;


        $('.modal-body').html(modalBody);
      });
    }


  }

  //---------------------------------------------------------


  configureMaps(inputMarkerArray) {

    var mapCenter = {
      lat: 38.853976,
      lng: -98.627282
    };

    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 4,
      center: mapCenter,
      fullscreenControl: false,
      rotateControl: false,
      streetViewControl: false,

    });

    globalMap = map;

    drop(inputMarkerArray); // This sets all the markers to be plotted on the map.

    var directionsDisplay = new google.maps.DirectionsRenderer({
      map: map,
      drivingOptions: {
        departureTime: new Date(Date.now()),  // for the time N milliseconds from now.
        trafficModel: 'optimistic'
      }
    });
    directionsDisplay2 = new google.maps.DirectionsRenderer({
      map: map
    });
    // directionsService = new google.maps.DirectionsService;
    // directionsDisplay = new google.maps.DirectionsRenderer;
    var request = {
      destination: indianapolis,
      origin: sanfrancisco,
      travelMode: 'DRIVING'
    };

    directionsService = new google.maps.DirectionsService();
    directionsService.route(request, function(response, status) {
      if (status == 'OK') {
        // Display the route on the map.
        directionsDisplay.setDirections(response);
        response1 = response;
      }
    });

    var request2 = {
      destination: kansas,
      origin: sanDiego,
      travelMode: 'DRIVING',
      waypoints: [
        {
          location: waypoint1,
          stopover: false
        },
        {
          location: waypoint2,
          stopover: false
        },
        {
          location: waypoint3,
          stopover: false
        },
        {
          location: waypoint4,
          stopover: false
        },
        {
          location: waypoint5,
          stopover: false
        },
      ]


    };
    var directionsService2 = new google.maps.DirectionsService();
    directionsService2.route(request2, function(response, status) {
      if (status == 'OK') {
        directionsDisplay2.setDirections(response);
        response2 = response;

        var route2 = response2.routes[0];

        overviewpath = route2.overview_path;
        // console.log('response2 : '+ JSON.stringify(response));
        var totalWaypoints = Math.round(overviewpath.length / 20);
        console.log('overviewpath.length: ' + totalWaypoints);
        for (var j = 1; j < totalWaypoints; j++) {
          var marker = new google.maps.Marker({
            position: overviewpath[j * 20],
            label: '' + j,
            map: map
          });
        }

      }
    });

    map.setCenter(mapCenter);

    function drop(inputMarkerArray) {
      //    console.log(inputMarkerArray.length);
      //    console.log(inputMarkerArray[0]);

      for (var i = 0; i < inputMarkerArray.length; i++) {
        setTimeout(plot(inputMarkerArray, i), i * 200);
      }
    }

    function plot(inputMarkerArray, i) {
      directionsService = new google.maps.DirectionsService;
      directionsDisplay = new google.maps.DirectionsRenderer;
      var location = {
        lat: inputMarkerArray[i].coordinates.lat,
        lng: inputMarkerArray[i].coordinates.lon
      };
      var title = inputMarkerArray[i].title;
      var day_temp = inputMarkerArray[i].day1.day_temp;
      var humidity = inputMarkerArray[i].day1.humidity;
      var icon = inputMarkerArray[i].day1.weather.icon;
      var windspeed = (inputMarkerArray[i].day1.windspeed * 3.6).toFixed(2);
      var iconBase = "http://maps.google.com/mapfiles/kml/shapes/"
      var icons = {
        warehouse: {
          icon: iconBase + "ranger_station.png"
        }
      };
      var marker = new google.maps.Marker({
        map: map,
        position: location,
        title: title,
        draggable: false,
        animation: google.maps.Animation.DROP,
        icon: "../../assets/warehouse-40x40.png"

      });
      var contentString = "<h6>" + title + "</h6><small>for more info right click icon</small>";

      function MoreInfoButtonClicked() {
        console.log("More info button clicked");

      }
      var infowindow = new google.maps.InfoWindow({
        content: contentString
      });
      marker.addListener('mouseover', function() {
        infowindow.open(map, marker);
        // console.log("marker clicked at " + JSON.stringify(location));
      });
      marker.addListener('mouseout', function() {
        infowindow.close();

      });
      marker.addListener('click', function() {
        $('#myModal').modal('show');
        $('#myModalLabel').text(title);
        $('#myModalLabel').html("<div><h4>" + title + "</h4><h5><small>location:{lat: <i>" + location.lat + "</i> , lng: <i>" + location.lng + "</i>}</small></h5></div");

        var modalBody = `<div class='container-fluid'><div class='row'><div class='col-md-4' style='font-size:150px;margin-top:30px;'>  <img src=${icon} width='150' height='150' /></div><div class='col-md-8'><div class='alert alert-success'>no alerts : All good here!</div><div class='card'><div class='card-block'><div class='card-text'><p>Temperature : ${day_temp}&deg F</p><p>Humidity : ${humidity} %</p><p>Wind : ${windspeed}Km/hr</p></div></div></div></div><div class='col-md-12'><div class='card'><div class='card-title' style='text-align:center'>stock details</div><div class='card-block'><div class='row'><div class='col-md-6'><h6>perishable goods</h6></div><div class='col-md-4'><p>7 units</p></div></div><div class='row'><div class='col-md-6'><h6>stable goods</h6></div><div class='col-md-6'><p>21 units</p></div></div><div class='row'><div class='col-md-6'><h6>total capacity</h6></div><div class='col-md-6'><p>48 units</p></div></div></div></div></div></div><div>`;


        $('.modal-body').html(modalBody);
      });
    }

  }


  // ****************************************************
  //  myFunction() {
  //     console.log('inside the myFunction()');
  //     setTimeout(function(){ alert("Hello"); }, 1000);

  // };

  // ****************************************************
//--------------------------------------------------------------------------

  startAnimation(that, callback) {

    var path = response2.routes[0].overview_path;
    var i = 0;
    var lats = {};
    var langs = {};
    var log = "";
    var sanDiego = { lat: 32.715736, lng: -117.161087 };

    //************************Navigation Marker********************* */
    // console.log('Path: '+JSON.stringify(path));
    movingAsset = new google.maps.Marker({
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        scale: 6,
        strokeColor: "black",
        fillColor: "yellow",
        fillOpacity: 1.0,
        //   rotation : 50
      },

      position: source,
      draggable: true,
      map: globalMap,
      rotateControl: true,
      // icon : '../../assets/truck.png',
      //  icon : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGOpOQ1PdISWKJDrJqrNZEn5by0c2BtTbzXNLQTHLfXFYhU9rEmg',

      //  scale : 5,
      //  strokeColor : 'black'
      // rotation : 90
    });


    // ****************************************************
    function myFunction() {
      console.log('inside the myFunction()');
      setTimeout(function() { alert("Hello"); }, 1000);

    };

    // ****************************************************

    function getDistance(that, callback) {
      var wd;
      // console.log('Entered the function');
      if(country == "USA"){
        wd = warehouse.USA;
      }
      else if(country == "Europe"){
        wd = warehouse.Europe;
      }
      let dist = [];
      for(let m = 0; m<wd.length;m++){
        let distance_bw = 0.001 * (google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(cur_pos_lat, cur_pos_lng), new google.maps.LatLng(wd[m].lat, wd[m].lng)));
        dist.push(distance_bw);
      }
      var min_dist =  Math.min.apply(null, dist);
      var min_index = dist.indexOf(min_dist);
      // dist1 = 0.001 * (google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(cur_pos_lat, cur_pos_lng), new google.maps.LatLng(34.052235, -118.243683)));
      // dist2 = 0.001 * (google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(cur_pos_lat, cur_pos_lng), new google.maps.LatLng(38.846127, -104.800644)));
      // dist3 = 0.001 * (google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(cur_pos_lat, cur_pos_lng), new google.maps.LatLng(32.89748, -97.040443)));
      // dist4 = 0.001 * (google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(cur_pos_lat, cur_pos_lng), new google.maps.LatLng(39.952584, -75.165222)));
      // //   dist5 = 0.001*(google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(cur_pos_lat,cur_pos_lng),new google.maps.LatLng(-33.8497,150.9110)));
      //
      //
      // console.log('Distance from your point to DWH located at liverpool is ', dist1, 'km');
      // console.log('Distance from your point to DWH located at sydney is ', dist2, 'km');
      // console.log('Distance from your point to DWH located at bankstown is ', dist3, 'km');
      // console.log('Distance from your point to DWH located at cabramatta is ', dist4, 'km');
      //   console.log('Distance from your point to DWH located at Wetherill Park is ',dist5,'km');

      console.log('Finished checking the distance');

      // var minValue = Math.min(dist1, dist2, dist3, dist4);
      console.log('minValue is ', min_dist);

      window.alert('Your destination is getting changed and Re-Route to nearest warehouse (WareHouse '+(min_index+1)+')\n\n\n\n');
      // swal({
      //   text: 'Your destination is getting changed and Re-Route to nearest warehouse (WareHouse '+(min_index+1)+')',
      //   type:'success'
      // });

      var final_des = new google.maps.LatLng(wd[min_index].lat, wd[min_index].lng);;

      console.log(final_des);
      // if (minValue == dist1) {
      //   console.log('Plotting to dist1');
      //   final_des = new google.maps.LatLng(34.052235, -118.243683);
      // } else if (minValue == dist2) {
      //   console.log('Plotting to dist2');
      //   final_des = new google.maps.LatLng(38.846127, -104.800644);
      // } else if (minValue == dist3) {
      //   console.log('Plotting to dist3');
      //   final_des = new google.maps.LatLng(32.89748, -97.040443);
      // } else {
      //   console.log('Plotting to dist4');
      //   final_des = new google.maps.LatLng(39.952584, -75.165222);
      // }
      //   else if(minValue == dist4){
      //     console.log('Plotting to dist4');
      //     final_des = new google.maps.LatLng(39.952584,-75.165222);
      //   }
      //   else if(minValue == dist5){
      //     console.log('Plotting to dist5');
      //     final_des = new google.maps.LatLng(-33.8497,150.9110);
      //   }

      // //**********************************************Change Route *************************************************************

      directionsDisplay = new google.maps.DirectionsRenderer();
      // movingAsset.rotation  = 150;
      // movingAsset.fillColor= 'white';
      directionsService.route({
        origin: new google.maps.LatLng(cur_pos_lat, cur_pos_lng),
        destination: final_des,
        travelMode: 'DRIVING'
      }, function(response, status) {

        if (status === 'OK') {
          path = response.routes[0].overview_path;  //Changed here
          directionsDisplay.setDirections(response);

          // directionsDisplay2.setMap(null);
           directionsDisplay3.setMap(null);
          // setMapOnAll(null);
          // this has to be write in different function
          // for (var k = 0; k < markers.length; k++) {
          //   markers[k].setMap(null);
          // }
          directionsDisplay3.setOptions({
            polylineOptions: {
              strokeColor: '#380825'
            }
          });
          directionsDisplay3.setMap(globalMap);
          directionsDisplay.setMap(globalMap);
          overviewPathIndex.splice(0,overviewPathIndex.length);

          // console.log('the response object for DWH is:', response);

          route = response.routes[0];


          // console.log('the directions to DWH are :', route);
          // console.log('the directions to DWH are :', path);

          console.log('Reached one destination');
          msg = `

                            You have changed your route to the nearest dataware house <br>
                            Keep you posted the latest weather conditions..

                        `;
          callback.apply(that, [msg]);

        } else {
          console.log('Failed at setting the path for DWH');
          window.alert('Directions request failed due to ' + status);
          clearInterval(interval);
        }
      });

      interval = setInterval(function() {
        (that, callback);
      }, 120);


    };// End of function


    // ****************************************************
    // function myFunction() {
    //     console.log('inside the myFunction()');
    //     setTimeout(function(){ alert("Hello"); }, 1000);

    // };

    // ****************************************************

    function iteratePosition(that, callback) {
      if (path[i]) {
        lats[i] = path[i].lat();
        langs[i] = path[i].lng();

        var latlng = new google.maps.LatLng(lats[i], langs[i]);
        var testLoc = {
          lat: lats[i],
          lng: langs[i]
        };
        // console.log(testLoc);
        movingAsset.setPosition(latlng);
        cur_pos_lat = movingAsset.getPosition().lat();
        cur_pos_lng = movingAsset.getPosition().lng();

        for(var j=0; j<overviewPathIndex.length ; j++){
            if(overviewPathIndex[j] == i){
                // console.log('j= '+j+" overviewPathIndex: "+overviewPathIndex[j]+" i: "+i);
                if(j == overviewPathIndex.length -1){
                    markers[j].setIcon('http://maps.google.com/mapfiles/ms/icons/green-dot.png');
                }
                else
                {
                      if(j == badWeatherpoint - 3){
                          // console.log('set marker icon: set');
                          waypointData[j+2].day1.windspeed = 35;
                          waypointData[j+2].day1.humidity = 52;
                          waypointData[j+2].day1.day_temp = 10;
                          waypointData[j+2].day1.weather.description = 'heavy intensity rain';
                         markers[j+2].setIcon('http://maps.google.com/mapfiles/ms/icons/red-dot.png');
                         google.maps.event.clearInstanceListeners(markers[j+2]);
                         var latlng1 = JSON.parse(JSON.stringify(overviewpath[overviewPathIndex[j+2]]));
                        //  console.log("overviewpath[overviewPathIndex[j+2]]: "+JSON.stringify(overviewpath[overviewPathIndex[j+2]]));
                         markers[j+2].addListener('click', function() {
                           $('#myModal').modal('show');
                           $('#myModalLabel').html(`<div class='container-fluid' style='text-align:center'<div ><h2>Waypoint `+badWeatherpoint+`</h2></div></div>`);
                           // $('#myModalLabel').html(`<div class='container-fluid'><div class='row'><div class='col-md-12'><h2>Waypoint ${i}</h2><h6><b>Location</b><br/>* Latitude: <i>${latlng1.lat}</i> <br/> * Longitude: <i> ${latlng1.lng} </i></h6></div></div></div>`);

                           // var modalBody = `<div class='container-fluid'><div class='row'><div class='col-md-4' style='font-size:150px;margin-top:30px;'</div><div class='col-md-8'><div class='card'><div class='card-block'><div class='card-text'><h6>Temperature : 20&deg F</h6><h6>Humidity :40 %</h6><h6>Wind : 120Km/hr</h6></div></div></div></div></div></div>`;

                           var modalbb=`<div class='container-fluid'><div class='row'><div class='col-md-12'><h6><b>Location</b><br/>* Latitude: <i>${latlng1.lat}</i> <br/> * Longitude: <i> ${latlng1.lng} </i></h6></div></div></div>
                           <div class="container-fluid">
                             <div class="row">
                                 <div class="col-md-8" >
                                   <div class="weather">
                                       <div class="current" >
                                           <div class="info">
                                               <div>&nbsp;</div>
                                               <div class="temp">Temperature: 10 &deg; <small>C</small></div>
                                               <div>Humidity: 52 % </div>
                                               <div>Wind Speed: 126 Km/hr </div>
                                               <div>Description: heavy intensity rain  </div>
                                           <div>&nbsp;</div>
                                           </div>
                                       </div>
                                   </div>
                                 </div>
                                 <div class="col-md-2" >
                                     <div>&nbsp;</div>
                                     <img src="http://openweathermap.org/img/w/10d.png" />
                                 </div>
                         </div> </div>
                         `
                           $('.modal-body').html(modalbb);
                         });
                      }
                      markers[j].setIcon('http://maps.google.com/mapfiles/ms/icons/green-dot.png');
                      if(j == badWeatherpoint -2){
                          var z ;

                          var x = confirm('The conditions at your next point is not good... Do u want to change the route?'
                                   +'\n----------------------------------------------------------------------------'
                                   +' \n\nTemperature: '
                                   + waypointData[j+1].day1.day_temp
                                   + '°C\nHumidity: ' + waypointData[j+1].day1.humidity
                                   + '%\nWind Speed: ' +  Math.round(waypointData[j+1].day1.windspeed * 3.6)
                                   + ' Km/hr\nDescription: ' + waypointData[j+1].day1.weather.description+'\n\n\n');
                          if (x == false){
                            // console.log('Next point conditions are good !!!!!');
                          }
                          else{
                            console.log('you r abt to change the route');
                            i = 0;
                            alt_route = true;
                            getDistance(that, callback);
                          }
                      }
                      else{
                        if(waypointData != null){
                            alert('Condition is good at your next waypoint.. You can continue..\n\nTemperature: '
                              + waypointData[j+1].day1.day_temp
                              + '°C\nHumidity: ' + waypointData[j+1].day1.humidity
                              + '%\nWind Speed: ' +  Math.round(waypointData[j+1].day1.windspeed * 3.6)
                              + ' Km/hr\nDescription: ' + waypointData[j+1].day1.weather.description+'\n\n\n');
                        }
                      }
                }
            }

        }

        //************************************************************************************************* */
        i++;
        // console.log("I value",i ,"and", "path length", path.length);

        if (i == path.length) {
          //change expression here
          // clearInterval(setInt);
          console.log('Trip is over');

          // $('.alert strong').html('Super');
          window.alert("\nSuccesfully reached the destination\n\n\n\n");
        }
      }

    }
    interval = setInterval(function() {
      iteratePosition(that, callback);
    }, 60);

  }

  stopjourney() {
    clearInterval(interval);

  }


}
