import { Injectable } from '@angular/core';
import * as AWS from '../../node_modules/aws-sdk/index.js';
import {LocationInfo} from './location-info';
import {WeatherInfo} from './weather-info';

import {JsonpModule, Jsonp} from '@angular/http'; //New
import { HttpModule } from '@angular/http';

@Injectable()
export class LambdaService {

  constructor() {

     this.configureAWS();
    
  }


  writeToLog(value: string) {
    return new Promise(
      (resolve) => {
        var z = 10;
        console.log("resolved");
        resolve(z);
      }
    );
  }

  //function to configure AWS credentials
  configureAWS() {
    AWS.config.apiVersions = {
      lambda: '2015-03-31'
    };
    AWS.config.update({ region: 'us-east-1' });
    var accessKeyId: string = "AKIAJZGQEIQ223CDU2IA";
    var secretAccessKey: string = "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";
    var sessionToken;
    var credentials = new AWS.Credentials(accessKeyId, secretAccessKey, sessionToken = null);
    AWS.config.credentials = credentials;
  }


  getLocationId(location: LocationInfo) {
    var lambda = new AWS.Lambda();
    var Payload = {
      "searchtype": location.searchtype,
      "lattitude": location.lat,
      "longitude": location.lng,
      "city": location.city
    };
    var params = {
      'FunctionName': 'fiLocationId',
      'InvocationType': 'RequestResponse',
      'Payload': JSON.stringify(Payload),
      'LogType': 'None',
    };
    return new Promise((resolve, reject) => {
      lambda.invoke(params, function (err, data) {
        if (err) {
          reject(err);
        } else {
          // console.log("invoking the lambda function was sucessful");
          resolve(data.Payload);
        }
      });
    });

  }

  getAlerts(locIds: string[]) {
    var lambda = new AWS.Lambda();
    var Payload = {
      "locIds": locIds
    };
    var params = {
      'FunctionName': 'fiAlerts',
      'InvocationType': 'RequestResponse',
      'Payload': JSON.stringify(Payload),
      'LogType': 'None',
    };
    return new Promise((resolve,reject) => {
     lambda.invoke(params, function (err, data) {
      if (err) {
        reject(err);
      } else {
        // console.log("invoking the lambda function was sucessful");
        // console.log(data.Payload);
        var res = resolve(data.Payload);
        return res;

      }
     });
    });

  }

  getweatherInfo(weatherQuarry: WeatherInfo) {
    var lambda = new AWS.Lambda();
    var Payload = {
      "searchtype": weatherQuarry.searchtype,
      "searchtime": weatherQuarry.searchtime,
      "locationId": weatherQuarry.locationId
    };
    var params = {
      'FunctionName': 'fiweatherinfo',
      'InvocationType': 'RequestResponse',
      'Payload': JSON.stringify(Payload),
      'LogType': 'None',
    };
    return new Promise((resolve,reject) => {
       lambda.invoke(params, function (err, data) {
      if (err) {
        reject(err);
      } else {
        // console.log("invoking the lambda function was sucessful");
        // console.log(data.Payload);
        resolve(data.Payload);
      }
    });

    });
  }
  ////////////////////////////////////////////////////////////////
  // ------------------------- New Code ------------------------------------
  getweatherInfoNew(weatherQuarry: WeatherInfo) {

  }
}
