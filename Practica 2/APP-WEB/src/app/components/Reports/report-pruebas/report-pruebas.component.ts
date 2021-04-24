import { Component, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Location} from '@angular/common';
import { MatTable } from '@angular/material/table';
import { PeriodicElement,ELEMENT_PRUEBA } from "../../../models/data";

import {MatDialog} from '@angular/material/dialog';

import {AngularFireDatabase, AngularFireList, snapshotChanges} from '@angular/fire/database';
import {reportService} from '../../../services/ReportService';

import { UserServiceService } from "../../../services/user-service/user-service.service";
import { PruebaService } from "../../../services/Prueba/prueba.service";

@Component({
  selector: 'app-report-pruebas',
  templateUrl: './report-pruebas.component.html',
  styleUrls: ['./report-pruebas.component.css']
})
export class ReportPruebasComponent implements OnInit {
  
  fecha: string;

  mostrar: boolean;

  columnas: string[] = ['icono','numero','fecha','reporte'];

  datos: PeriodicElement[] = [];

  id:any;

  entrenador:string;
  entrenado:string;

  constructor(private servicioPrueba:PruebaService, private db: AngularFireDatabase,private router:Router,private _location: Location, private dialog:MatDialog) {
    this.entrenador = sessionStorage.getItem('user');
    this.mostrar = true;
   }

  @ViewChild(MatTable) tabla1: MatTable<PeriodicElement>;

  reportcotroller = new reportService(this.db);
  public atletas: Array<string>;

  ngOnInit(): void {
    this.iniciar();
  }


  async iniciar()
  {
    await this.reportcotroller.get_Cambio(false);
    await this.reportcotroller.get_AllDataPrueba(this.fecha, null);
    console.log('----------Prueba / Recorrido ----------');
    //console.log(this.reportcotroller.reportPrueba);
    
    let fecha, hora: string;

    let i:number = 0;  
    for(let prueba of this.reportcotroller.reportPrueba)
    {
      i++;
      let fecha_hora: string[]= prueba.fechahora.split('-')
      fecha = `${fecha_hora[0]}/${fecha_hora[1]}/${fecha_hora[2]}`;
      hora = `${fecha_hora[3]}:${fecha_hora[4]}:${fecha_hora[5]}`;;
      this.datos.push({fechaHora: `${fecha} - ${hora}`,dato:i});
      //console.log(prueba);
    }

    this.mostrar = false;

    this.tabla1.renderRows();
     
  }




  reportar(cod: number) {
    console.log(cod);
    this.servicioPrueba.setPrueba(this.reportcotroller.reportPrueba[cod]);
    this.router.navigate(['atleta/pruebas/reportes']);

  }
 

   delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

}
