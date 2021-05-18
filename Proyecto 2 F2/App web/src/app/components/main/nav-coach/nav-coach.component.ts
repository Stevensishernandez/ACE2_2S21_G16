import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {MatDialog} from '@angular/material/dialog';

import { UserServiceService } from "../../../services/user-service/user-service.service";

import { DialogCompartirComponent } from "../../dialogs/dialog-compartir/dialog-compartir.component";

@Component({
  selector: 'app-nav-coach',
  templateUrl: './nav-coach.component.html',
  styleUrls: ['./nav-coach.component.css']
})
export class NavCoachComponent implements OnInit {

  usuario: string;

  constructor(public servicioUsuario: UserServiceService, private router: Router, public dialog: MatDialog) {
    
    let usuario = sessionStorage.getItem('user');
    this.servicioUsuario.inspeccionarme(usuario); 
    this.usuario = usuario;
  }



  ngOnInit(): void {
 
  }

  inspeccionarme()
  {
    this.servicioUsuario.inspeccionarme(this.usuario);
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
  irTiempoReal()
  {
    this.router.navigate(['coach/tiempo-real']);
  }

  openDialogTroll()
  {
    const dialogRef = this.dialog.open(DialogCompartirComponent,{
      width: '300px',
    });
  }

  logout()
  {
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('rol');
    sessionStorage.removeItem('userActive');

    this.router.navigate(['']);  
  }

}
