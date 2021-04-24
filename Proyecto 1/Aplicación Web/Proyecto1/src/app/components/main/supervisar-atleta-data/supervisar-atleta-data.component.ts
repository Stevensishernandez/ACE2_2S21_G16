import { Component, OnInit, ViewChild } from '@angular/core';
import {Location} from '@angular/common';
import { PeriodicElementSupervisar,ELEMENT_SUPERVISAR } from "../../../models/data";

import { MatTable } from '@angular/material/table';

import { AngularFireDatabase } from '@angular/fire/database';

import {reportService} from '../../../services/ReportService';

@Component({
  selector: 'app-supervisar-atleta-data',
  templateUrl: './supervisar-atleta-data.component.html',
  styleUrls: ['./supervisar-atleta-data.component.css']
})
export class SupervisarAtletaDataComponent implements OnInit {

  mostrar:boolean;
  mostrarTabla:boolean;


  //Elementos para la tabla de registro de mediciones
  displayedColumns = ['icono', 'fecha', 'oxigeno','ritmo','temperatura'];
  dataSource = ELEMENT_SUPERVISAR;

  @ViewChild (MatTable) listado: MatTable<PeriodicElementSupervisar>;

  usuarioSeleccionado;

  reportecontroller = new reportService(this.db);
  public atletas: Array<string>;

  constructor(private db: AngularFireDatabase,private _location: Location) { 
    this.usuarioSeleccionado = sessionStorage.getItem('userSelect');
    this.mostrar = true;
    this.mostrarTabla = false;
  }

  ngOnInit(): void {
    this.iniciar();
  }

  async iniciar()
  {

    this.reportecontroller.get_AllDataUser(null, this.usuarioSeleccionado,10);
    this.reportecontroller.getTop10User();
    this.reportecontroller.sincronizar();
    
    await this.delay(1000);
    this.reportecontroller.get_AllDataUser(null, this.usuarioSeleccionado,10);
    this.reportecontroller.getTop10User();
    this.reportecontroller.sincronizar();
    
    await this.delay(1000);
    this.reportecontroller.get_AllDataUser(null, this.usuarioSeleccionado,10);
    this.reportecontroller.getTop10User();
    this.reportecontroller.sincronizar();
    
    await this.delay(1000);

    this.mostrar = false;

      
    console.log('---------------------TODO----------------------');
    console.log(this.reportecontroller.cambiosRealTime);


      
      this.reportecontroller.get_AllDataUser(null, this.usuarioSeleccionado,10);
      this.reportecontroller.getTop10User();
      this.reportecontroller.sincronizar();

      let arregloDatos:string[];
      let datoOxigeno,datoTemperatura,datoRitmo;
      
      let reporte = this.reportecontroller.cambiosRealTime;

      let objetoTabla: PeriodicElementSupervisar;


      for(let i=0; i<reporte.length; i++)
      {
        console.log(reporte[i].cadena);

        arregloDatos = reporte[i].cadena.replace('\"','').replace('\"','').split(',');
        datoTemperatura = +arregloDatos[0].split(':')[1];
        datoRitmo = +arregloDatos[1].split(':')[1];
        objetoTabla= {fechaHora: reporte[i].horaexacta, oxigeno: 0, ritmo: datoRitmo, temperatura: datoTemperatura};
        this.dataSource.push(objetoTabla);
      }

      console.log(this.dataSource)

      this.mostrarTabla = true;
     this.listado.renderRows();

    }

    
  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

}
