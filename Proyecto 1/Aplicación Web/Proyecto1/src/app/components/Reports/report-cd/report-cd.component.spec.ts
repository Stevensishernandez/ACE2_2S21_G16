import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportCdComponent } from './report-cd.component';

describe('ReportCdComponent', () => {
  let component: ReportCdComponent;
  let fixture: ComponentFixture<ReportCdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportCdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportCdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
