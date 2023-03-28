import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NomineeComponent } from './nominee.component';

describe('NomineeComponent', () => {
  let component: NomineeComponent;
  let fixture: ComponentFixture<NomineeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NomineeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NomineeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
