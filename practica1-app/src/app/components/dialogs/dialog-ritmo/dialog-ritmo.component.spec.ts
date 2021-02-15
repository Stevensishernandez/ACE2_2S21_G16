import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogRitmoComponent } from './dialog-ritmo.component';

describe('DialogRitmoComponent', () => {
  let component: DialogRitmoComponent;
  let fixture: ComponentFixture<DialogRitmoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogRitmoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogRitmoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
