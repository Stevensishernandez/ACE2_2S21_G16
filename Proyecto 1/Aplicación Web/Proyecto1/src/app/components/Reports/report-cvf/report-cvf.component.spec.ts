import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportCvfComponent } from './report-cvf.component';

describe('ReportCvfComponent', () => {
  let component: ReportCvfComponent;
  let fixture: ComponentFixture<ReportCvfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportCvfComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportCvfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
