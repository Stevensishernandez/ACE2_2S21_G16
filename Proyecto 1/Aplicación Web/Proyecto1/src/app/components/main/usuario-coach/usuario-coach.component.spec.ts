import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioCoachComponent } from './usuario-coach.component';

describe('UsuarioCoachComponent', () => {
  let component: UsuarioCoachComponent;
  let fixture: ComponentFixture<UsuarioCoachComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsuarioCoachComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuarioCoachComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
