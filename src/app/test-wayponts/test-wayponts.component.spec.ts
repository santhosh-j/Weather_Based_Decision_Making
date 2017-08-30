/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TestWaypontsComponent } from './test-wayponts.component';

describe('TestWaypontsComponent', () => {
  let component: TestWaypontsComponent;
  let fixture: ComponentFixture<TestWaypontsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestWaypontsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestWaypontsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
