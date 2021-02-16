import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportTpComponent } from './report-tp.component';

describe('ReportTpComponent', () => {
  let component: ReportTpComponent;
  let fixture: ComponentFixture<ReportTpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportTpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportTpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
