import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartDataSets } from "chart.js";
import { Color, Label  } from "ng2-charts";
import { PeriodicElement ,ELEMENT_ENTRENAMIENTOS, simboloRitmo } from "../../../models/data";
import { MatTable } from '@angular/material/table';

import {reportService} from '../../../services/ReportService';
import {AngularFireDatabase} from '@angular/fire/database';
import {Activo} from '../../../models/Activo';
import {Registro} from '../../../models/Registro';

import { UserServiceService } from "../../../services/user-service/user-service.service";

@Component({
  selector: 'app-report-cvf',
  templateUrl: './report-cvf.component.html',
  styleUrls: ['./report-cvf.component.css']
})
export class ReportCvfComponent implements OnInit {

  pieChartData: ChartDataSets[] = [
    { data: [38, 0], label: 'Fallos'}
  ]

  pieChartLabels: Label[] =  ['Fallos', 'No fallos'];

  pieChartOptions = { responsive: true};

  pieChartLegend = true;
  pieChartPlugins = [];
  pieChartType = "pie";


  /* Elementos de la tabla */
  displayedColumns = ['icono', 'fechahora','entrenamiento','repeticiones', 'aprobacion'];
  dataSource = ELEMENT_ENTRENAMIENTOS;

  
  @ViewChild (MatTable) listado: MatTable<PeriodicElement>;

  panelOpenState = false;


  /* Elementos númericos simpes */

  datoRecibido = 'T:154, O:545, R:868';
  promedioRitmo;

  fallos; 

  /* Elementos firebase */

  usuarioActual: any;
  fecha: string;
  reportcotroller = new reportService(this.db);
  listaRegistroUsuario: any;
  listaTop10Usuario: any;

  /* Variables auxiliares */
  newData:number[] = []
  newDataFecha:string[] = []
  usuario: string;
  promedio: number;
  rendisiones: number;
  iniciado:boolean;

  constructor(private servicioUsuario: UserServiceService, private db: AngularFireDatabase) { 
    this.iniciado = false;
  }

 
  ngOnInit(): void {
    this.usuario = sessionStorage.getItem('user');
    this.iniciar()
  }

  async iniciar()
  {
    await this.delay(3000);
    this.Update();
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }


  clicked()
  {
    console.log(this.Update());

  }

  procesar(entrenamientos)
  {
    
    this.dataSource=[];
    let arregloDatos:string[];



    let mainFecha ='';


  
    
    console.log('Datos',entrenamientos);

    let cont=1;
    let contFallos=0;

    for(let entrenamiento of entrenamientos)
    {

      if(entrenamiento.recorridos == null || entrenamiento.recorridos == undefined){continue;}

        let numeroRecorrido = entrenamiento.recorridos.length;

        let recorrido = entrenamiento.recorridos[numeroRecorrido-1]

        if(recorrido == null || recorrido == undefined){continue;}

        let numeroRepeticiones =recorrido.registros.length;

        arregloDatos =recorrido.registros[numeroRepeticiones-1].cadena.replace('\"','').replace('\"','').split(',');

        if(arregloDatos.length < 5){continue;}

        let fallo_gano = this.getFalloGano(+arregloDatos[4].split(':')[1]);

        if(fallo_gano)
        {
          contFallos++;
          mainFecha =entrenamiento.fechahora;

          this.dataSource.push({
            fechaHora: entrenamiento.fechahora,
            entrenamiento: +cont,
            repeticiones: numeroRecorrido,
            aprobacion: '✘'
  
          });

  
        }


        cont++;
 
    }

    this.fallos=contFallos;

    this.newData[0]=+contFallos;
    this.newData[1]=+(cont-1-contFallos);

    this.updateAll();

  }

  getFalloGano(estado):boolean
  {
    switch (estado)
    {
      case 0:
      case 1:
      case 2:
      case 3:
        return true
      case 4:
        return false
        break;
    }
  }

  updateAll()
  {
    this.pieChartData[0].data=this.newData;

    this.pieChartLabels = ['fallos','no fallos']
    this.listado.renderRows();
  }

  
  async Update() {
    await this.reportcotroller.get_Cambio();

    let entrenamientos = []
    // si la caja donde se ingresa la fecha esta null se asume que es la fecha de hoy.
    await this.reportcotroller.get_AllDataEntranamiento('2021-04-10', this.servicioUsuario.usuarioActivo);
    this.llenarArreglo(entrenamientos,this.reportcotroller.reportEntramiento);
    await this.reportcotroller.get_AllDataEntranamiento(this.fecha, this.servicioUsuario.usuarioActivo);
    this.llenarArreglo(entrenamientos,this.reportcotroller.reportEntramiento);

    this.procesar(entrenamientos);   
  }

  llenarArreglo(entrenamientos,reportEntrenamiento)
  {
    for(let entrenamiento of reportEntrenamiento)
    {
      entrenamientos.push(entrenamiento);
    }
  }
  
}
