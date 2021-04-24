import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportResultadosComponent } from './report-resultados.component';

describe('ReportResultadosComponent', () => {
  let component: ReportResultadosComponent;
  let fixture: ComponentFixture<ReportResultadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportResultadosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportResultadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
