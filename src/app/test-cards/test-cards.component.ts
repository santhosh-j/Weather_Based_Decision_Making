import { Component, OnInit } from '@angular/core';
import {LambdaService} from '../lambda.service';
// import {GooglemapsService} from '../googlemaps.service';
import {WeatherInfo} from '../weather-info';


@Component({
  selector: 'app-test-cards',
  templateUrl: './test-cards.component.html',
  styleUrls: ['./test-cards.component.css'],
  providers: [LambdaService]//,GooglemapsService]
})
export class TestCardsComponent implements OnInit {


  constructor(private lambda : LambdaService) { }
  
day_Icons ={
    "Sunny"  :  "wi-day-sunny",
    "Mostly Sunny" : "wi-day-sunny-overcast",
    "Partly Sunny" : "wi-day-cloudy-high",
    "Intermittent Clouds" : "wi-day-cloudy",
    "Hazy Sunshine" : "wi-day-haze",
    "Mostly Cloudy" : "wi-day-cloudy-high",
    "Cloudy" : "wi-cloudy",
    "Dreary"  : "wi-smog",
    "Fog" : "wi-fog",
    "Showers" : "wi-day-rain",
    "Mostly Cloudy w/ Showers" : "wi-day-sprinkle",
    "Partly Sunny w/ Showers" : "wi-day-rain-mix",
    "T-Storms" : "wi-day-thunderstorm",
    "Thunderstorms" : "wi-day-thunderstorm", // Newly added
    "Mostly Cloudy w/ T-Storms" : "wi-day-thunderstorm",
    "Partly Sunny w/ T-Storms" : "wi-day-thunderstorm",
    "Rain" : "wi-day-rain",
    "Flurries" : "wi-snow",
    "Mostly Cloudy w/ Flurries" : "wi-snow",
    "Partly Sunny w/ Flurries" : "wi-day-snow",
    "Snow" : "wi-snow",
    "Mostly Cloudy w/ Snow" : "wi-snow",
    "Ice" : "wi-snowflake-cold",
    "Sleet" : "wi-hail",
    "Freezing Rain" : "wi-rain-wind",
    "Rain and Snow" : "wi-rain-mix",
    "Hot" : "wi-hot",
    "Cold" : "wi-thermometer",
    "Windy" : "wi-windy"
};
  
  
weather : WeatherInfo =
{
  searchtype: "daily",
  searchtime: "5day",
  locationId: ["2626754","327351","336107","2156799"  ]
}


  result ={

    // ***********************************************First card *************************************
    //temp and unit for current day
    temp_max : "",    temp_unit : "",
    //Icons for current and future    
    day_iconphrase_current : "",    day_iconphrase1 : "",    day_iconphrase2 : "",    day_iconphrase3 : "",
    // temp variables for future
    temp_tmrw_max : "",    temp_tmrw_min : "",    temp_tmrw1_max : "",    temp_tmrw1_min : "",    temp_tmrw2_max : "",    temp_tmrw2_min : "",
    // ***********************************************Second card *************************************
    //temp and unit for current day
    temp_max_scnd : "",    temp_unit_scnd : "",
    //Icons for current and future    
    day_iconphrase_current_scnd : "",    day_iconphrase1_scnd : "",    day_iconphrase2_scnd : "",    day_iconphrase3_scnd : "",
    // temp variables for future
    temp_tmrw_max_scnd : "",    temp_tmrw_min_scnd : "",    temp_tmrw1_max_scnd : "",    temp_tmrw1_min_scnd : "",    temp_tmrw2_max_scnd : "",    temp_tmrw2_min_scnd : "",
    // ***********************************************Third card *************************************
    //temp and unit for current day
    temp_max_thrd : "",    temp_unit_thrd : "",
    //Icons for current and future    
    day_iconphrase_current_thrd : "",    day_iconphrase1_thrd : "",    day_iconphrase2_thrd : "",    day_iconphrase3_thrd : "",
    // temp variables for future
    temp_tmrw_max_thrd : "",    temp_tmrw_min_thrd : "",    temp_tmrw1_max_thrd : "",    temp_tmrw1_min_thrd : "",    temp_tmrw2_max_thrd : "",    temp_tmrw2_min_thrd : "",
    // ***********************************************Fourth card *************************************
    //temp and unit for current day
    temp_max_frth : "",    temp_unit_frth : "",
    //Icons for current and future    
    day_iconphrase_current_frth : "",    day_iconphrase1_frth : "",    day_iconphrase2_frth : "",    day_iconphrase3_frth : "",
    // temp variables for future
    temp_tmrw_max_frth : "",    temp_tmrw_min_frth : "",    temp_tmrw1_max_frth : "",    temp_tmrw1_min_frth : "",    temp_tmrw2_max_frth : "",    temp_tmrw2_min_frth : "",
  }

  temp_tmrw_1 : Date ; 
  temp_tmrw_2 : number ; 

  day_Icons_info = [];
  // myDate : ;

  datee_current : string;
  datee1 : string;datee1_scnd :string;datee1_thrd :string;datee1_frth :string;
  datee2 : string;datee2_scnd :string;datee2_thrd :string;datee2_frth :string;
  datee3 : string;datee3_scnd :string;datee3_thrd :string;datee3_frth :string;

  obj : Object;

  ngOnInit() {

      this.lambda.getweatherInfo(this.weather).then(res =>{
      
      // console.log('O/p for Cards is : ', res);

        this.obj = eval("(" + res + ')');

        console.log("Response Object",this.obj);



// **************For first card************************************************************************************
        // ******************* Current day *********************

        this.result.temp_max = this.obj[0].DailyForecasts[0].Temperature.Maximum.Value
        this.result.temp_unit = this.obj[0].DailyForecasts[0].Temperature.Maximum.Unit;
        this.result.day_iconphrase_current = this.obj[0].DailyForecasts[0].Day.IconPhrase; // Needs to change
        this.result.day_iconphrase_current = this.result.day_iconphrase_current.toLowerCase();
      
          for(var info in this.day_Icons){
            // 
            this.day_Icons_info.push({"key":  info.toLowerCase(), "value":  this.day_Icons[info]});
            
          }
   
        for(var i=0; i<this.day_Icons_info.length;i++){

          if(this.result.day_iconphrase_current == this.day_Icons_info[i].key){
            this.result.day_iconphrase_current = this.day_Icons_info[i].value;
            console.log("currentday ",this.result.day_iconphrase_current);
          }

        }

      
      //******************* First one******************** */

      this.result.day_iconphrase1 = this.obj[0].DailyForecasts[1].Day.IconPhrase; // Needs to change
      this.result.day_iconphrase1 = this.result.day_iconphrase1.toLowerCase();
      
        for(var i=0; i<this.day_Icons_info.length;i++){

          if(this.result.day_iconphrase1 == this.day_Icons_info[i].key){
            this.result.day_iconphrase1 = this.day_Icons_info[i].value;
            console.log("first one ",this.result.day_iconphrase1);
          }

        }
       
       var myDate1 = new Date(this.obj[0].DailyForecasts[1].EpochDate *1000).toLocaleString();
       this.datee1 = myDate1.toLocaleString();
       this.datee1 = this.datee1.slice(0,8);
       
       this.result.temp_tmrw_max = this.obj[0].DailyForecasts[1].Temperature.Maximum.Value;
       this.result.temp_tmrw_min = this.obj[0].DailyForecasts[1].Temperature.Minimum.Value;


      // //  ******2nd One********************************************//
      
      this.result.day_iconphrase2 = this.obj[0].DailyForecasts[2].Day.IconPhrase; // Needs to change
      this.result.day_iconphrase2 = this.result.day_iconphrase1.toLowerCase();
      
        for(var i=0; i<this.day_Icons_info.length;i++){

          if(this.result.day_iconphrase2 == this.day_Icons_info[i].key){
            this.result.day_iconphrase2 = this.day_Icons_info[i].value;
            console.log("second one ",this.result.day_iconphrase2);
          }

        }
       
       var myDate2 = new Date(this.obj[0].DailyForecasts[2].EpochDate *1000).toLocaleString();
       this.datee2 = myDate2.toLocaleString();
       this.datee2 = this.datee2.slice(0,8);

       this.result.temp_tmrw1_max = this.obj[0].DailyForecasts[2].Temperature.Maximum.Value;
       this.result.temp_tmrw1_min = this.obj[0].DailyForecasts[2].Temperature.Minimum.Value;

       
      //   //  ******3rd One********************************************//
      
      this.result.day_iconphrase3 = this.obj[0].DailyForecasts[3].Day.IconPhrase; // Needs to change
      this.result.day_iconphrase3 = this.result.day_iconphrase3.toLowerCase();
      
        for(var i=0; i<this.day_Icons_info.length;i++){

          if(this.result.day_iconphrase3 == this.day_Icons_info[i].key){
            this.result.day_iconphrase3 = this.day_Icons_info[i].value;
            console.log("third one ",this.result.day_iconphrase3);
          }

        }
       
       var myDate3 = new Date(this.obj[0].DailyForecasts[3].EpochDate *1000).toLocaleString();
       this.datee3 = myDate3.toLocaleString();
       this.datee3 = this.datee3.slice(0,8);
      
       this.result.temp_tmrw2_max = this.obj[0].DailyForecasts[3].Temperature.Maximum.Value;
       this.result.temp_tmrw2_min = this.obj[0].DailyForecasts[3].Temperature.Minimum.Value;



      // })


// --------------------------------------------------------------------------------------------------------------------
// **************For second card************************************************************************************
        
        // ******************* Current day *********************

        this.result.temp_max_scnd = this.obj[1].DailyForecasts[0].Temperature.Maximum.Value;
        this.result.temp_unit_scnd = this.obj[1].DailyForecasts[0].Temperature.Maximum.Unit;
        this.result.day_iconphrase_current_scnd = this.obj[1].DailyForecasts[0].Day.IconPhrase; // Needs to change
        this.result.day_iconphrase_current_scnd = this.result.day_iconphrase_current_scnd.toLowerCase();
      
        for(var i=0; i<this.day_Icons_info.length;i++){

          if(this.result.day_iconphrase_current_scnd == this.day_Icons_info[i].key){
            this.result.day_iconphrase_current_scnd = this.day_Icons_info[i].value;
            console.log("currentday ",this.result.day_iconphrase_current_scnd);
          }

        }

      
      //******************* First one******************** */

      this.result.day_iconphrase1_scnd = this.obj[1].DailyForecasts[1].Day.IconPhrase; // Needs to change
      this.result.day_iconphrase1_scnd = this.result.day_iconphrase1_scnd.toLowerCase();
      
        for(var i=0; i<this.day_Icons_info.length;i++){

          if(this.result.day_iconphrase1_scnd == this.day_Icons_info[i].key){
            this.result.day_iconphrase1_scnd = this.day_Icons_info[i].value;
            console.log("first one ",this.result.day_iconphrase1_scnd);
          }

        }
       
       var myDate1_scnd = new Date(this.obj[1].DailyForecasts[1].EpochDate *1000).toLocaleString();
       this.datee1_scnd = myDate1_scnd.toLocaleString();
       this.datee1_scnd = this.datee1_scnd.slice(0,8);
       
       this.result.temp_tmrw_max_scnd = this.obj[1].DailyForecasts[1].Temperature.Maximum.Value;
       this.result.temp_tmrw_min_scnd = this.obj[1].DailyForecasts[1].Temperature.Minimum.Value;


      // //  ******2nd One********************************************//
      
      this.result.day_iconphrase2_scnd = this.obj[1].DailyForecasts[2].Day.IconPhrase; // Needs to change
      this.result.day_iconphrase2_scnd = this.result.day_iconphrase2_scnd.toLowerCase();
      
        for(var i=0; i<this.day_Icons_info.length;i++){

          if(this.result.day_iconphrase2_scnd == this.day_Icons_info[i].key){
            this.result.day_iconphrase2_scnd = this.day_Icons_info[i].value;
            console.log("second one ",this.result.day_iconphrase2_scnd);
          }

        }
       
       var myDate2_scnd = new Date(this.obj[1].DailyForecasts[2].EpochDate *1000).toLocaleString();
       this.datee2_scnd = myDate2_scnd.toLocaleString();
       this.datee2_scnd = this.datee2_scnd.slice(0,8);

       this.result.temp_tmrw1_max_scnd = this.obj[1].DailyForecasts[2].Temperature.Maximum.Value;
       this.result.temp_tmrw1_min_scnd = this.obj[1].DailyForecasts[2].Temperature.Minimum.Value;

       
      //   //  ******3rd One********************************************//
      
      this.result.day_iconphrase3_scnd = this.obj[1].DailyForecasts[3].Day.IconPhrase; // Needs to change
      this.result.day_iconphrase3_scnd = this.result.day_iconphrase3_scnd.toLowerCase();
      
        for(var i=0; i<this.day_Icons_info.length;i++){

          if(this.result.day_iconphrase3_scnd == this.day_Icons_info[i].key){
            this.result.day_iconphrase3_scnd = this.day_Icons_info[i].value;
            console.log("third one ",this.result.day_iconphrase3_scnd);
          }

        }
       
       var myDate3_scnd = new Date(this.obj[1].DailyForecasts[3].EpochDate *1000).toLocaleString();
       this.datee3_scnd = myDate3_scnd.toLocaleString();
       this.datee3_scnd = this.datee3_scnd.slice(0,8);
      
       this.result.temp_tmrw2_max_scnd = this.obj[1].DailyForecasts[3].Temperature.Maximum.Value;
       this.result.temp_tmrw2_min_scnd = this.obj[1].DailyForecasts[3].Temperature.Minimum.Value;


// --------------------------------------------Third card -------------------------------------------------------------------


        // ******************* Current day *********************

        this.result.temp_max_thrd = this.obj[2].DailyForecasts[0].Temperature.Maximum.Value
        this.result.temp_unit_thrd = this.obj[2].DailyForecasts[0].Temperature.Maximum.Unit;
        this.result.day_iconphrase_current_thrd = this.obj[2].DailyForecasts[0].Day.IconPhrase; // Needs to change
        this.result.day_iconphrase_current_thrd = this.result.day_iconphrase_current_thrd.toLowerCase();

          console.log('Key value for Icon : ',this.result.day_iconphrase_current_thrd.toLowerCase());

          // console.log('Weather for third card',this.result.day_iconphrase_current_thrd);

          for(var info in this.day_Icons){
            // 
            this.day_Icons_info.push({"key":  info.toLowerCase(), "value":  this.day_Icons[info]});
            console.log('Log for Icons:',this.day_Icons_info);
          }
   
        for(var i=0; i<this.day_Icons_info.length;i++){

          if(this.result.day_iconphrase_current_thrd == this.day_Icons_info[i].key){
            this.result.day_iconphrase_current_thrd = this.day_Icons_info[i].value;
            console.log("currentday Weather for third card ",this.result.day_iconphrase_current_thrd);
          }

        }

      
      //******************* First one******************** */

      this.result.day_iconphrase1_thrd = this.obj[2].DailyForecasts[1].Day.IconPhrase; // Needs to change
      this.result.day_iconphrase1_thrd = this.result.day_iconphrase1_thrd.toLowerCase();
      
        for(var i=0; i<this.day_Icons_info.length;i++){

          if(this.result.day_iconphrase1_thrd == this.day_Icons_info[i].key){
            this.result.day_iconphrase1_thrd = this.day_Icons_info[i].value;
            console.log("first one ",this.result.day_iconphrase1_thrd);
          }

        }
       
       var myDate1_thrd = new Date(this.obj[2].DailyForecasts[1].EpochDate *1000).toLocaleString();
       this.datee1_thrd = myDate1_thrd.toLocaleString();
       this.datee1_thrd = this.datee1_thrd.slice(0,8);
       
       this.result.temp_tmrw_max_thrd = this.obj[2].DailyForecasts[1].Temperature.Maximum.Value;
       this.result.temp_tmrw_min_thrd = this.obj[2].DailyForecasts[1].Temperature.Minimum.Value;


      // //  ******2nd One********************************************//
      
      this.result.day_iconphrase2_thrd = this.obj[2].DailyForecasts[2].Day.IconPhrase; // Needs to change
      this.result.day_iconphrase2_thrd = this.result.day_iconphrase2_thrd.toLowerCase();
      
        for(var i=0; i<this.day_Icons_info.length;i++){

          if(this.result.day_iconphrase2_thrd == this.day_Icons_info[i].key){
            this.result.day_iconphrase2_thrd = this.day_Icons_info[i].value;
            console.log("second one ",this.result.day_iconphrase2_thrd);
          }

        }
       
       var myDate2_thrd = new Date(this.obj[2].DailyForecasts[2].EpochDate *1000).toLocaleString();
       this.datee2_thrd = myDate2_thrd.toLocaleString();
       this.datee2_thrd = this.datee2_thrd.slice(0,8);

       this.result.temp_tmrw1_max_thrd = this.obj[2].DailyForecasts[2].Temperature.Maximum.Value;
       this.result.temp_tmrw1_min_thrd = this.obj[2].DailyForecasts[2].Temperature.Minimum.Value;

       
      //   //  ******3rd One********************************************//
      
      this.result.day_iconphrase3_thrd = this.obj[2].DailyForecasts[3].Day.IconPhrase; // Needs to change
      this.result.day_iconphrase3_thrd = this.result.day_iconphrase3_thrd.toLowerCase();
      
        for(var i=0; i<this.day_Icons_info.length;i++){

          if(this.result.day_iconphrase3_thrd == this.day_Icons_info[i].key){
            this.result.day_iconphrase3_thrd = this.day_Icons_info[i].value;
            console.log("third one ",this.result.day_iconphrase3_thrd);
          }

        }
       
       var myDate3_thrd = new Date(this.obj[2].DailyForecasts[3].EpochDate *1000).toLocaleString();
       this.datee3_thrd = myDate3_thrd.toLocaleString();
       this.datee3_thrd = this.datee3_thrd.slice(0,8);
      
       this.result.temp_tmrw2_max_thrd = this.obj[2].DailyForecasts[3].Temperature.Maximum.Value;
       this.result.temp_tmrw2_min_thrd = this.obj[2].DailyForecasts[3].Temperature.Minimum.Value;


// ---------------------------------------------Fourth one --------------------------------------------------------------------------

// ******************* Current day *********************

        this.result.temp_max_frth = this.obj[3].DailyForecasts[0].Temperature.Maximum.Value
        this.result.temp_unit_frth = this.obj[3].DailyForecasts[0].Temperature.Maximum.Unit;
        this.result.day_iconphrase_current_frth = this.obj[3].DailyForecasts[0].Day.IconPhrase; // Needs to change
        this.result.day_iconphrase_current_frth = this.result.day_iconphrase_current_frth.toLowerCase();
      
          for(var info in this.day_Icons){
            // 
            this.day_Icons_info.push({"key":  info.toLowerCase(), "value":  this.day_Icons[info]});
            
          }
   
        for(var i=0; i<this.day_Icons_info.length;i++){

          if(this.result.day_iconphrase_current_frth == this.day_Icons_info[i].key){
            this.result.day_iconphrase_current_frth = this.day_Icons_info[i].value;
            console.log("currentday ",this.result.day_iconphrase_current_frth);
          }

        }

      
      //******************* First one******************** */

      this.result.day_iconphrase1_frth = this.obj[3].DailyForecasts[1].Day.IconPhrase; // Needs to change
      this.result.day_iconphrase1_frth = this.result.day_iconphrase1_frth.toLowerCase();
      
        for(var i=0; i<this.day_Icons_info.length;i++){

          if(this.result.day_iconphrase1_frth == this.day_Icons_info[i].key){
            this.result.day_iconphrase1_frth = this.day_Icons_info[i].value;
            console.log("first one ",this.result.day_iconphrase1_frth);
          }

        }
       
       var myDate1_frth = new Date(this.obj[3].DailyForecasts[1].EpochDate *1000).toLocaleString();
       this.datee1_frth = myDate1_frth.toLocaleString();
       this.datee1_frth = this.datee1_frth.slice(0,8);
       
       this.result.temp_tmrw_max_frth = this.obj[3].DailyForecasts[1].Temperature.Maximum.Value;
       this.result.temp_tmrw_min_frth = this.obj[3].DailyForecasts[1].Temperature.Minimum.Value;


      // //  ******2nd One********************************************//
      
      this.result.day_iconphrase2_frth = this.obj[3].DailyForecasts[2].Day.IconPhrase; // Needs to change
      this.result.day_iconphrase2_frth = this.result.day_iconphrase2_frth.toLowerCase();
      
        for(var i=0; i<this.day_Icons_info.length;i++){

          if(this.result.day_iconphrase2_frth == this.day_Icons_info[i].key){
            this.result.day_iconphrase2_frth = this.day_Icons_info[i].value;
            console.log("second one ",this.result.day_iconphrase2_frth);
          }

        }
       
       var myDate2_frth = new Date(this.obj[3].DailyForecasts[2].EpochDate *1000).toLocaleString();
       this.datee2_frth = myDate2_frth.toLocaleString();
       this.datee2_frth = this.datee2_frth.slice(0,8);

       this.result.temp_tmrw1_max_frth = this.obj[3].DailyForecasts[2].Temperature.Maximum.Value;
       this.result.temp_tmrw1_min_frth = this.obj[3].DailyForecasts[2].Temperature.Minimum.Value;

       
      //   //  ******3rd One********************************************//
      
      this.result.day_iconphrase3_frth = this.obj[3].DailyForecasts[3].Day.IconPhrase; // Needs to change
      this.result.day_iconphrase3_frth = this.result.day_iconphrase3_frth.toLowerCase();
      
        for(var i=0; i<this.day_Icons_info.length;i++){

          if(this.result.day_iconphrase3_frth == this.day_Icons_info[i].key){
            this.result.day_iconphrase3_frth = this.day_Icons_info[i].value;
            console.log("third one ",this.result.day_iconphrase3_frth);
          }

        }
       
       var myDate3_frth = new Date(this.obj[3].DailyForecasts[3].EpochDate *1000).toLocaleString();
       this.datee3_frth = myDate3_frth.toLocaleString();
       this.datee3_frth = this.datee3_frth.slice(0,8);
      
       this.result.temp_tmrw2_max_frth = this.obj[3].DailyForecasts[3].Temperature.Maximum.Value;
       this.result.temp_tmrw2_min_frth = this.obj[3].DailyForecasts[3].Temperature.Minimum.Value;

      

      })


    
  }

}
