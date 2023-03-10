import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyhomeComponent } from './companyhome.component';

describe('CompanyhomeComponent', () => {
  let component: CompanyhomeComponent;
  let fixture: ComponentFixture<CompanyhomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyhomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompanyhomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
