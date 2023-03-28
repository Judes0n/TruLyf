import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CPoliciesComponent } from './policies.component';

describe('CPoliciesComponent', () => {
  let component: CPoliciesComponent;
  let fixture: ComponentFixture<CPoliciesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CPoliciesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CPoliciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
