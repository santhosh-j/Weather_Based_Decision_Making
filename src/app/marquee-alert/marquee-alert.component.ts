import { Component, OnInit } from '@angular/core';
import {AlertBox} from './alert-box';
import {LambdaService} from '../lambda.service';
// import {GooglemapsService} from '../googlemaps.service';

@Component({
  selector: 'app-marquee-alert',
  templateUrl: './marquee-alert.component.html',
  styleUrls: ['./marquee-alert.component.css']
})
export class MarqueeAlertComponent implements OnInit {

  constructor(private lambda : LambdaService) {
  }

  alerts : AlertBox[];

  info: AlertBox = {
    severety: 1,
    category: "wind",
    location: "new york",
    alertDescription: "This is a test message for the alert response"
    // summary : "fsvss",
    // countrycode : "AUS"
  };

  result = {};


  location: string[] = ["336107","2626754","327351","2156799"];
  // chicago,los angeles, denver , newyork

  ngOnInit() {



    this.lambda.getAlerts(this.location).then(res => {
      console.log('checking RequestResponse : '+res);

      // console.log('THis is from client side and the result is :');

      // console.log("alerts for locations " + this.location + " is " + res);



      if (res) {
          //  console.log('Result arrived');
           this.result = res;

          //  console.log(typeof(this.result));
          //  var parse_data = JSON.parse(res);
          var obj = eval("(" + this.result + ')');
          // console.log("Marquee object",obj);


          for(var i=0; i<obj.length;i++){

            if(obj[i].length>0){
              console.log('This is the final array:',obj[i]);
              console.log(obj[i][0].AlertID);
              // this.info.severety = obj[i][0].AlertID;
              this.info.category = obj[i][0].Category;
              this.info.location = obj[i][0].Area[0].Name + " " + "&&" + " " +  obj[i][0].Area[1].Name;
              this.info.alertDescription = 'There is a' + this.info.category + 'currently at' + this.info.location+ 'Click here for Summary of the Alert';

              console.log(this.info.location);

            }
            else{
            this.info.alertDescription = `No Alerts !!   All warehouse conditons are good!!!`;

          }



          }

      }
    });

  }

}
