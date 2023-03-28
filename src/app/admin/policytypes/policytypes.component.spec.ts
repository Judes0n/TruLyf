import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PolicytypesComponent } from './policytypes.component';

describe('PolicytypesComponent', () => {
  let component: PolicytypesComponent;
  let fixture: ComponentFixture<PolicytypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PolicytypesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PolicytypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
