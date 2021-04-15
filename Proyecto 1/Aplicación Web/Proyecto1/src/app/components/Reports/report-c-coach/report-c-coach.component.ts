import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-report-c-coach',
  templateUrl: './report-c-coach.component.html',
  styleUrls: ['./report-c-coach.component.css']
})
export class ReportCCoachComponent implements OnInit {

  constructor( private router:Router) { }

  ngOnInit(): void {
  }

  irConetoRepeticiones()
  {
    this.router.navigate(['coach/carrera/conteo-repeticiones']);
  }
  irVelocidadAlcanzada()
  {
    this.router.navigate(['coach/carrera/velocidad-alcanzada']);
  }
  irDistanciaRepeticion()
  {
    this.router.navigate(['coach/carrera/distancia-repeticion']);
  }
  irConteoFallos()
  {
    this.router.navigate(['coach/carrera/conteo-fallos']);
  }
  irConteoRendicion()
  {
    this.router.navigate(['coach/carrera/conteo-rendicion']);
  }


}
