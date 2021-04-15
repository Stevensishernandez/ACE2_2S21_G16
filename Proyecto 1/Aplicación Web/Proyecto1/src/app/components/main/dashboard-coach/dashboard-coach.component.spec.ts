import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardCoachComponent } from './dashboard-coach.component';

describe('DashboardCoachComponent', () => {
  let component: DashboardCoachComponent;
  let fixture: ComponentFixture<DashboardCoachComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardCoachComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardCoachComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
