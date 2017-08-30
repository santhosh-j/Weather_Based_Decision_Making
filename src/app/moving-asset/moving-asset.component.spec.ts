/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MovingAssetComponent } from './moving-asset.component';

describe('MovingAssetComponent', () => {
  let component: MovingAssetComponent;
  let fixture: ComponentFixture<MovingAssetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovingAssetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovingAssetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
