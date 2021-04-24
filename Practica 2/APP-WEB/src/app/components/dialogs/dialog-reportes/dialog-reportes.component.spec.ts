import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogReportesComponent } from './dialog-reportes.component';

describe('DialogReportesComponent', () => {
  let component: DialogReportesComponent;
  let fixture: ComponentFixture<DialogReportesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogReportesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogReportesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
