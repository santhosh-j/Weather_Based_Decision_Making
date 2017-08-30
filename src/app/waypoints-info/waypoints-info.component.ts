import { Component, OnInit } from '@angular/core';
import {GooglemapsService} from '../googlemaps.service';


@Component({
  selector: 'app-waypoints-info',
  templateUrl: './waypoints-info.component.html',
  styleUrls: ['./waypoints-info.component.css']
})
export class WaypointsInfoComponent implements OnInit {
 
  constructor(private maps : GooglemapsService) { }

    
  ngOnInit() {
    
  }

}
