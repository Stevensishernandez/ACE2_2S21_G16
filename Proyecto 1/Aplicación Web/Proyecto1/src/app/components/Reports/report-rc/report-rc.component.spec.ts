import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportRcComponent } from './report-rc.component';

describe('ReportRcComponent', () => {
  let component: ReportRcComponent;
  let fixture: ComponentFixture<ReportRcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportRcComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportRcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
