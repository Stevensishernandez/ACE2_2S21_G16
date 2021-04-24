import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router"
import {MatDialog} from '@angular/material/dialog';

import { DialogRitmoComponent } from "../../dialogs/dialog-ritmo/dialog-ritmo.component";
import { DialogTemperaturaComponent } from "../../dialogs/dialog-temperatura/dialog-temperatura.component";
import { DialogOxigenoComponent } from "../../dialogs/dialog-oxigeno/dialog-oxigeno.component";

import { DialogCarreraComponent } from "../../dialogs/dialog-carrera/dialog-carrera.component";



@Component({
  selector: 'app-dashboard-atleta',
  templateUrl: './dashboard-atleta.component.html',
  styleUrls: ['./dashboard-atleta.component.css']
})
export class DashboardAtletaComponent implements OnInit {

  

  constructor(private router:Router, public dialog:MatDialog) { }

  ngOnInit(): void {
  
  }

  openDialogRitmo()
  {
    const dialogRef = this.dialog.open(DialogRitmoComponent,{
      width: '300px',
    });

  }

  openDialogTemperatura()
  {
    const dialogRef = this.dialog.open(DialogTemperaturaComponent,{
      width: '300px',
    });
  }

  openDialogOxigeno()
  {
    const dialogRef = this.dialog.open(DialogOxigenoComponent,{
      width: '300px',
    });
  }

  openDialogCarrera()
  {
    const dialogRef = this.dialog.open(DialogCarreraComponent,{
      width: '300px',
    });
  }


  irReporteRitmo()
  {
    this.router.navigate(['atleta/ritmo-cardiaco']);
  }

  irReporteTemperatura()
  {
    this.router.navigate(['atleta/temperatura-corporal']);
  }

  irReporteOxigeno()
  {
    this.router.navigate(['atleta/oxigeno-sangre']);
  }
  
  irReporteCarrera()
  {
    this.router.navigate(['atleta/carrera']);
  }

}
