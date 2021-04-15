import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import {MatDialog} from '@angular/material/dialog';

import { DialogRitmoComponent } from "../../dialogs/dialog-ritmo/dialog-ritmo.component";
import { DialogTemperaturaComponent } from "../../dialogs/dialog-temperatura/dialog-temperatura.component";
import { DialogOxigenoComponent } from "../../dialogs/dialog-oxigeno/dialog-oxigeno.component";
import { DialogAtletasComponent } from "../../dialogs/dialog-atletas/dialog-atletas.component";

import { DialogCarreraComponent } from "../../dialogs/dialog-carrera/dialog-carrera.component";


@Component({
  selector: 'app-dashboard-coach',
  templateUrl: './dashboard-coach.component.html',
  styleUrls: ['./dashboard-coach.component.css']
})
export class DashboardCoachComponent implements OnInit {

  constructor(private router:Router, private dialog:MatDialog) { }

  ngOnInit(): void {
    let d = new Date();

    console.log('fecha dashboard',d.getDate())

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

  openDialogAtletas()
  {
    const dialogRef = this.dialog.open(DialogAtletasComponent,{
      width: '300px',
    });
  }

  irReporteRitmo()
  {
    this.router.navigate(['coach/ritmo-cardiaco']);
  }

  irReporteTemperatura()
  {
    this.router.navigate(['coach/temperatura-corporal']);
  }

  irReporteOxigeno()
  {
    this.router.navigate(['coach/oxigeno-sangre']);
  }

  irReporteCarrera()
  {
    this.router.navigate(['coach/carrera']);
  }

  irReporteAtletas()
  {
    this.router.navigate(['coach/atletas']);
  }

}
