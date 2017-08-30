/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TestCardsComponentNew } from './test-cards.component';

describe('TestCardsComponent', () => {
  let component: TestCardsComponentNew;
  let fixture: ComponentFixture<TestCardsComponentNew>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestCardsComponentNew ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestCardsComponentNew);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
