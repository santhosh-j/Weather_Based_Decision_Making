import { Component, OnInit, Input, HostListener, Output, EventEmitter,ChangeDetectorRef,OnChanges } from '@angular/core';
import {Observable} from 'rxjs/Observable';


@Component({
  selector: 'app-alert-tracking',
  templateUrl: './alert-tracking.component.html',
  styleUrls: ['./alert-tracking.component.css']
})
export class AlertTrackingComponent implements OnInit {

  @Input() info : string ;
  

  constructor(private cd : ChangeDetectorRef) { }

  // ngOnchanges(changes){
  //   this.changeColor();
  // }

  // onChange(x){
  //   this.changeColor();
  // }

  ngOnInit() {
    this.info ="This is on Init";
  }

  changeColor(){
    console.log('Color changed');
    
  }
}
