import { Component, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Location} from '@angular/common';
import { MatTable } from '@angular/material/table';
import { UserBasicList } from "../../../models/user";

import {MatDialog} from '@angular/material/dialog';
import { SupervisarAtletaComponent } from "../supervisar-atleta/supervisar-atleta.component";
import { SupervisarAtletaDataComponent } from "../supervisar-atleta-data/supervisar-atleta-data.component";
import { DialogSupervisarComponent } from "../../dialogs/dialog-supervisar/dialog-supervisar.component";

import {AngularFireDatabase, AngularFireList, snapshotChanges} from '@angular/fire/database';
import {reportService} from '../../../services/ReportService';
import { coachService } from '../../../services/CouchService';

import { UserServiceService } from "../../../services/user-service/user-service.service";

@Component({
  selector: 'app-atletas',
  templateUrl: './atletas.component.html',
  styleUrls: ['./atletas.component.css']
})
export class AtletasComponent implements OnInit {

  mostrar: boolean;

  columnas: string[] = ['icono','usuario','informacion','historial','inspeccionar'];

  datos: UserBasicList[] = [];

  id:any;

  entrenador:string;
  entrenado:string;

  constructor(private servicioUsuario:UserServiceService, private db: AngularFireDatabase,private router:Router,private _location: Location, private dialog:MatDialog) {
    this.entrenador = sessionStorage.getItem('user');
    this.mostrar = true;
   }

  coachcontroller = new coachService(this.db);
  reportecontroller = new reportService(this.db);
  public atletas: Array<string>;

  ngOnInit(): void {
    this.iniciar();
  }

  async iniciar()
  {
    this.coachcontroller.extraerfichajes(this.entrenador);
    await this.delay(4000);
    this.coachcontroller.extraerfichajes(this.entrenador);
    this.atletas = this.coachcontroller.atletas;
    console.log(this.atletas);

    for(let atleta of this.atletas)
    {
      this.datos.push({usuario:atleta})
    }

    this.mostrar = false;

    this.tabla1.renderRows();
    /*
    this.datos.push({
      usuario: this.usuarioBuscado,
      nombres: 'El nombre de '+this.usuarioBuscado,
      });
      */
     
  }

  async addAtleta()
  {
    this.coachcontroller.ficharAtleta(this.entrenador, this.entrenado);

    await this.delay(1000);

     this.coachcontroller.extraerfichajes(this.entrenador);
     this.atletas = this.coachcontroller.atletas;
     console.log(this.atletas);

     for(let i in this.atletas)
    {
      this.datos[i] = {usuario:this.atletas[i]}
    }

         /*
    this.datos.push({
      usuario: this.usuarioBuscado,
      nombres: 'El nombre del usuario 1'
      }); 
      */
      this.tabla1.renderRows();
  }

  @ViewChild(MatTable) tabla1: MatTable<UserBasicList>;

  openDialogHistorial(cod: number)
  {
    let nombreUsuario=this.datos[cod].usuario;
    console.log(nombreUsuario);
    sessionStorage.setItem('userSelect',nombreUsuario);
    const dialogRef = this.dialog.open(SupervisarAtletaDataComponent);
  }
  
  openDialogSupervisar(cod: number)
  {
    let nombreUsuario=this.datos[cod].usuario;
    this.servicioUsuario.mostrarAtleta(nombreUsuario);
    const dialogRef = this.dialog.open(DialogSupervisarComponent,{
      width: '300px',
    });
  }

  openDialogVerPerfil(cod: number)
  {
    let nombreUsuario=this.datos[cod].usuario;
    console.log(nombreUsuario);
    sessionStorage.setItem('userSelect',nombreUsuario);
    const dialogRef = this.dialog.open(SupervisarAtletaComponent);
  }

  borrarFila(cod: number) {
    if (confirm("Desea marcar la transacción como entregada?")) {
      this.borrarOrden(cod);
      this.datos.splice(cod, 1);
      this.tabla1.renderRows();
    }
  }
  borrarOrden(cod: number)
  {
    let numero=this.datos[cod].usuario;
    console.log(numero);

  }

   delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

}
