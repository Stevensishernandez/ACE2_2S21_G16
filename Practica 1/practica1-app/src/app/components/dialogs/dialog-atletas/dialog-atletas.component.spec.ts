import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAtletasComponent } from './dialog-atletas.component';

describe('DialogAtletasComponent', () => {
  let component: DialogAtletasComponent;
  let fixture: ComponentFixture<DialogAtletasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAtletasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAtletasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
