import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportCrComponent } from './report-cr.component';

describe('ReportCrComponent', () => {
  let component: ReportCrComponent;
  let fixture: ComponentFixture<ReportCrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportCrComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportCrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
