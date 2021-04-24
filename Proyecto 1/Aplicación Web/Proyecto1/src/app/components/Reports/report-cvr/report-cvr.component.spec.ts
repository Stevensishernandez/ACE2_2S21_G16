import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportCvrComponent } from './report-cvr.component';

describe('ReportCvrComponent', () => {
  let component: ReportCvrComponent;
  let fixture: ComponentFixture<ReportCvrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportCvrComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportCvrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
