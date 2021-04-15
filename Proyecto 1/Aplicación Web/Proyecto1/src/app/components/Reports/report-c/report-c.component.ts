import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-report-c',
  templateUrl: './report-c.component.html',
  styleUrls: ['./report-c.component.css']
})
export class ReportCComponent implements OnInit {

  constructor( private router:Router) { }

  ngOnInit(): void {
  }

  irConetoRepeticiones()
  {
    this.router.navigate(['atleta/carrera/conteo-repeticiones']);
  }
  irVelocidadAlcanzada()
  {
    this.router.navigate(['atleta/carrera/velocidad-alcanzada']);
  }
  irDistanciaRepeticion()
  {
    this.router.navigate(['atleta/carrera/distancia-repeticion']);
  }
  irConteoFallos()
  {
    this.router.navigate(['atleta/carrera/conteo-fallos']);
  }
  irConteoRendicion()
  {
    this.router.navigate(['atleta/carrera/conteo-rendicion']);
  }

}
