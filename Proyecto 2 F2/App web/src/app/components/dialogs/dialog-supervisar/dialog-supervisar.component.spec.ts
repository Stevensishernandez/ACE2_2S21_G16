import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogSupervisarComponent } from './dialog-supervisar.component';

describe('DialogSupervisarComponent', () => {
  let component: DialogSupervisarComponent;
  let fixture: ComponentFixture<DialogSupervisarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogSupervisarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogSupervisarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
