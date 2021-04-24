import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {MatDialog} from '@angular/material/dialog';


import { UserServiceService } from "../../../services/user-service/user-service.service";

import { DialogCompartirComponent } from "../../dialogs/dialog-compartir/dialog-compartir.component";

@Component({
  selector: 'app-nav-atleta',
  templateUrl: './nav-atleta.component.html',
  styleUrls: ['./nav-atleta.component.css']
})
export class NavAtletaComponent implements OnInit {


  constructor(public servicioUsuario: UserServiceService, private router:Router, public dialog: MatDialog) {
    let usuario = sessionStorage.getItem('user'); 
    this.servicioUsuario.inspeccionarme(usuario);
   }

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
  comenzar()
  {
    this.router.navigate(['atleta/real-time']);
  }
  irReportes()
  {
    this.router.navigate(['atleta/pruebas']);
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

    this.router.navigate(['']);  
  }

}
