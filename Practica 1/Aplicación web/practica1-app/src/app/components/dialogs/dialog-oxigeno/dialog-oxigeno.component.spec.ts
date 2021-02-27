import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogOxigenoComponent } from './dialog-oxigeno.component';

describe('DialogOxigenoComponent', () => {
  let component: DialogOxigenoComponent;
  let fixture: ComponentFixture<DialogOxigenoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogOxigenoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogOxigenoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
