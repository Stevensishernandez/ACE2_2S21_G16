import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportCCoachComponent } from './report-c-coach.component';

describe('ReportCCoachComponent', () => {
  let component: ReportCCoachComponent;
  let fixture: ComponentFixture<ReportCCoachComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportCCoachComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportCCoachComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
