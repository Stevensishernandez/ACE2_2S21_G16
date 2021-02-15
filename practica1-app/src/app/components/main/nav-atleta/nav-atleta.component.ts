import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-atleta',
  templateUrl: './nav-atleta.component.html',
  styleUrls: ['./nav-atleta.component.css']
})
export class NavAtletaComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }


  irDashboard()
  {
    this.router.navigate(['atleta']);
  }
  irPerfil()
  {
    this.router.navigate(['atleta/perfil']);
  }
  irRitmoCardiaco()
  {
    this.router.navigate(['atleta/ritmo-cardiaco']);
  }
  irTemperaturaCorporal()
  {
    this.router.navigate(['atleta/temperatura-corporal']);
  }
  irOxigenoSangre()
  {
    this.router.navigate(['atleta/oxigeno-sangre']);
  }
  logout()
  {
    this.router.navigate(['login']);
  }

}
