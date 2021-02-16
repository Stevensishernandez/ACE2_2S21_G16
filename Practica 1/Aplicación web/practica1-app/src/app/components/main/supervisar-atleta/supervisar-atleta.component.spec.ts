import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupervisarAtletaComponent } from './supervisar-atleta.component';

describe('SupervisarAtletaComponent', () => {
  let component: SupervisarAtletaComponent;
  let fixture: ComponentFixture<SupervisarAtletaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupervisarAtletaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupervisarAtletaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
