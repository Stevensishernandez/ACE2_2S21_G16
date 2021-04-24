import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogPesoComponent } from './dialog-peso.component';

describe('DialogPesoComponent', () => {
  let component: DialogPesoComponent;
  let fixture: ComponentFixture<DialogPesoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogPesoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogPesoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
