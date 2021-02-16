import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-coach',
  templateUrl: './nav-coach.component.html',
  styleUrls: ['./nav-coach.component.css']
})
export class NavCoachComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  
  irDashboard()
  {
    this.router.navigate(['coach']);
  }
  irPerfil()
  {
    this.router.navigate(['coach/perfil']);
  }
  irRitmoCardiaco()
  {
    this.router.navigate(['coach/ritmo-cardiaco']);
  }
  irTemperaturaCorporal()
  {
    this.router.navigate(['coach/temperatura-corporal']);
  }
  irOxigenoSangre()
  {
    this.router.navigate(['coach/oxigeno-sangre']);
  }
  irAtletasAsignados()
  {
    this.router.navigate(['coach/atletas']);
  }
  logout()
  {
    this.router.navigate(['login']);
  }

}
