import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavCoachComponent } from './nav-coach.component';

describe('NavCoachComponent', () => {
  let component: NavCoachComponent;
  let fixture: ComponentFixture<NavCoachComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavCoachComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavCoachComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
