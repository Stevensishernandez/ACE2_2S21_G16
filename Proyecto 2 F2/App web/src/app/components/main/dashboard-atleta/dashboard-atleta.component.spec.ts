import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardAtletaComponent } from './dashboard-atleta.component';

describe('DashboardAtletaComponent', () => {
  let component: DashboardAtletaComponent;
  let fixture: ComponentFixture<DashboardAtletaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardAtletaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardAtletaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
