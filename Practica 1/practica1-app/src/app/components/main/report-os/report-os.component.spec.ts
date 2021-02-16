import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportOsComponent } from './report-os.component';

describe('ReportOsComponent', () => {
  let component: ReportOsComponent;
  let fixture: ComponentFixture<ReportOsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportOsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportOsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
