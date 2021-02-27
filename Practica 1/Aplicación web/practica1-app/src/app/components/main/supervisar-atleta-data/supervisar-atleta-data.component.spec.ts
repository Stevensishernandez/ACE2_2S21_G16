import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupervisarAtletaDataComponent } from './supervisar-atleta-data.component';

describe('SupervisarAtletaDataComponent', () => {
  let component: SupervisarAtletaDataComponent;
  let fixture: ComponentFixture<SupervisarAtletaDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupervisarAtletaDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupervisarAtletaDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
