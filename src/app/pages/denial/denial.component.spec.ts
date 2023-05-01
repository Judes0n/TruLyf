/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DenialComponent } from './denial.component';

describe('DenialComponent', () => {
  let component: DenialComponent;
  let fixture: ComponentFixture<DenialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DenialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DenialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
