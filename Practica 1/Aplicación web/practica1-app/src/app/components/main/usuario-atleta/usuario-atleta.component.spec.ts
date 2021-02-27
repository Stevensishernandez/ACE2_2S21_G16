import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioAtletaComponent } from './usuario-atleta.component';

describe('UsuarioAtletaComponent', () => {
  let component: UsuarioAtletaComponent;
  let fixture: ComponentFixture<UsuarioAtletaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsuarioAtletaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuarioAtletaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
