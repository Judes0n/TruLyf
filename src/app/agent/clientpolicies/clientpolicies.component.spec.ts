import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientpoliciesComponent } from './clientpolicies.component';

describe('ClientpoliciesComponent', () => {
  let component: ClientpoliciesComponent;
  let fixture: ComponentFixture<ClientpoliciesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientpoliciesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientpoliciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
