/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { LambdaService } from './lambda.service';

describe('LambdaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LambdaService]
    });
  });

  it('should ...', inject([LambdaService], (service: LambdaService) => {
    expect(service).toBeTruthy();
  }));
});
