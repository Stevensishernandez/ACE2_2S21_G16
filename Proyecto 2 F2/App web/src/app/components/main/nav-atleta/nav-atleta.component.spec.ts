import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavAtletaComponent } from './nav-atleta.component';

describe('NavAtletaComponent', () => {
  let component: NavAtletaComponent;
  let fixture: ComponentFixture<NavAtletaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavAtletaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavAtletaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
