import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartDataSets } from "chart.js";
import { Color, Label  } from "ng2-charts";
import { PeriodicElement ,ELEMENT_RITMO, simboloRitmo, PeriodicElementSupervisar } from "../../../models/data";
import { MatTable } from '@angular/material/table';

import {reportService} from '../../../services/ReportService';
import {AngularFireDatabase} from '@angular/fire/database';
import {Activo} from '../../../models/Activo';
import {Registro} from '../../../models/Registro';

import { UserServiceService } from "../../../services/user-service/user-service.service";

@Component({
  selector: 'app-report-rc',
  templateUrl: './report-rc.component.html',
  styleUrls: ['./report-rc.component.css']
})


export class ReportRcComponent implements OnInit {

    /* Line chart variables */

  barChartData: ChartDataSets[] = [
    { data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], label: 'Ritmo cardiaco'}
  ]

  barChartLabels: Label[] =  ['', '', '', '', '', '', '', '','', ''];

  barChartOptions = { responsive: true};

  barChartColors: Color[] = [
    {
      borderColor: 'red',
      backgroundColor: 'rgb(250, 0, 0, .5)'
    }
  ];

  barChartLegend = true;
  barChartPlugins = [];
  barChartType = "bar";
  

  /* Line chart variables */
  lineChartData: ChartDataSets[] = [
    { data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], label: 'Ritmo cardiaco'}
  ]

  lineChartLabels: Label[] =  ['', '', '', '', '', '', '', '','', ''];

  lineChartOptions = { responsive: true};

  lineChartColors: Color[] = [
    {
      borderColor: 'red',
      backgroundColor: 'rgb(250, 235, 215, .5)'
    }
  ];

  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType = "line";


  /* Elementos de la tabla */
  displayedColumns = ['icono', 'fecha', 'dato'];
  dataSource = ELEMENT_RITMO;
  @ViewChild (MatTable) listado: MatTable<PeriodicElement>;

  panelOpenState = false;


  /* Elementos númericos simpes */

  datoRecibido = 'T:154, O:545, R:868';
  promedioRitmo;

  ritmo; 

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

  iniciado:boolean;

  constructor(private servicioUsuario: UserServiceService, private db: AngularFireDatabase) { 
    this.iniciado = false;
  }

  ngOnInit(): void {
    this.usuario = sessionStorage.getItem('user');
    this.get_Data();
    this.iniciar();
  }

  async iniciar()
  {
    await this.delay(3000);
    this.Update();
    this.updateHistorial();
    this.promedioRitmo = 0 + simboloRitmo;

  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }


  clicked()
  {
    console.log(this.Update());
    this.updateHistorial();

  }

  procesar(fechaDato)
  {
    let nuevoDato;
    let nuevaFecha;
    let sumaDatos:number = 0;
    let arregloDatos:string[];
    let i;

    for(i in fechaDato)
    {
      arregloDatos = fechaDato[i].cadena.replace('\"','').replace('\"','').split(',');
      nuevoDato = +arregloDatos[1].split(':')[1];
      this.newData[i] = nuevoDato;
      nuevaFecha = fechaDato[i].horaexacta;
      this.newDataFecha[i] = nuevaFecha;
      this.dataSource[i] =  {fechaHora: nuevaFecha, dato: nuevoDato};
      sumaDatos += nuevoDato;
    }
    this.promedio = Math.round(sumaDatos/(+i+1));

  }

  updateHistorial()
  {
    this.barChartData[0].data = this.newData;
    this.barChartLabels = this.newDataFecha;
    this.listado.renderRows();
  }
  updateAll()
  {
    this.ritmo = this.newData [9] + simboloRitmo;
    this.lineChartData[0].data = this.newData;
    this.barChartData[0].data = this.newData;
    this.barChartLabels = this.newDataFecha;
    this.lineChartLabels = this.newDataFecha;
    this.promedioRitmo =this.promedio;
    this.listado.renderRows();
  }

  get_Data() {
    return new Promise((resolve, reject) => {
      this.db.database.ref('activo/').on('value', (snapshot) => {
      this.Update();
      if(this.iniciado){ this.updateAll();} else { this.iniciado = true;}
      });
    });
  }
  
  Update(): any{
    this.reportcotroller.get_Cambio();
    // si la caja donde se ingresa la fecha esta null se asume que es la fecha de hoy.
    this.reportcotroller.get_AllDataUserMin(this.fecha, this.servicioUsuario.usuarioActivo,10);
    this.usuarioActual = JSON.stringify(this.reportcotroller.activo as Activo);
    this.listaRegistroUsuario = JSON.stringify(this.reportcotroller.cambiosRealTime);
    this.listaTop10Usuario = JSON.stringify(this.reportcotroller.cambiosTop10);
    this.procesar(this.reportcotroller.cambiosTop10);
  }

  

}
