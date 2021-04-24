import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogTemperaturaComponent } from './dialog-temperatura.component';

describe('DialogTemperaturaComponent', () => {
  let component: DialogTemperaturaComponent;
  let fixture: ComponentFixture<DialogTemperaturaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogTemperaturaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogTemperaturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
