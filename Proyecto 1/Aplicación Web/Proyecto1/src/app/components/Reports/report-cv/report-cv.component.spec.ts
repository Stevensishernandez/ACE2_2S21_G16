import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportCvComponent } from './report-cv.component';

describe('ReportCvComponent', () => {
  let component: ReportCvComponent;
  let fixture: ComponentFixture<ReportCvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportCvComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportCvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
