/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { GooglemapsService } from './googlemaps.service';

describe('GooglemapsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GooglemapsService]
    });
  });

  it('should ...', inject([GooglemapsService], (service: GooglemapsService) => {
    expect(service).toBeTruthy();
  }));
});
