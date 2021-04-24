import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportPruebasComponent } from './report-pruebas.component';

describe('ReportPruebasComponent', () => {
  let component: ReportPruebasComponent;
  let fixture: ComponentFixture<ReportPruebasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportPruebasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportPruebasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
