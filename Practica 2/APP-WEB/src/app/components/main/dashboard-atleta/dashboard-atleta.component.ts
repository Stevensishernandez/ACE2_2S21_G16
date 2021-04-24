import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router"
import {MatDialog} from '@angular/material/dialog';

import { DialogOxigenoComponent } from "../../dialogs/dialog-oxigeno/dialog-oxigeno.component";
import { DialogReportesComponent } from "../../dialogs/dialog-reportes/dialog-reportes.component";
import { DialogPesoComponent } from "../../dialogs/dialog-peso/dialog-peso.component";

import { UserServiceService } from "../../../services/user-service/user-service.service";


@Component({
  selector: 'app-dashboard-atleta',
  templateUrl: './dashboard-atleta.component.html',
  styleUrls: ['./dashboard-atleta.component.css']
})
export class DashboardAtletaComponent implements OnInit {

  

  constructor(public servicioUsuario: UserServiceService, private router:Router, public dialog:MatDialog) { }

  ngOnInit(): void {
    this.servicioUsuario.cronometroHabilitado = false;
    let unidad = sessionStorage.getItem('rol'); 
    let peso = +sessionStorage.getItem('peso');
    if(unidad == 'L')
    {
      unidad = 'Lb'
    } 
    else
    {
      unidad = 'Kg'
    }
    this.servicioUsuario.mostrarPeso(peso,peso+' '+unidad);
  }

  openDialogVO2MAX()
  {
    const dialogRef = this.dialog.open(DialogOxigenoComponent,{
      width: '300px',
    });
  }
  openDialogCambiarPeso()
  {
    const dialogRef = this.dialog.open(DialogPesoComponent,{
      width: '300px',
    });
  }
  openDialogReportes()
  {
    const dialogRef = this.dialog.open(DialogReportesComponent,{
      width: '300px',
    });
  }

  irComenzar()
  {
    this.router.navigate(['atleta/real-time']);
  }

  irReportes()
  {
    this.router.navigate(['atleta/pruebas']);
  }

}
