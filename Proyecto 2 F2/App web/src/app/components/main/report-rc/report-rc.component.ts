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
  
  /* Elementos de la tabla */
  displayedColumns = ['icono', 'fecha', 'dato'];
  dataSource = ELEMENT_RITMO;
  @ViewChild (MatTable) listado: MatTable<PeriodicElement>;

  panelOpenState = false;


  /* Elementos númericos simpes */

  datoRecibido = 'T:154, O:545, R:868';
  promedioRitmo;


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
    this.iniciar();
  }

  async iniciar()
  {
    this.Update();
    this.promedioRitmo = 0 + simboloRitmo;

  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }


  clicked()
  {
    console.log(this.Update());
  }

  procesar(fechaDato)
  {
    let nuevoDato;
    let nuevaFecha;
    let sumaDatos:number = 0;
    let arregloDatos:string[];
    let i;

    let conteo:number= 0;

    for(i in fechaDato)
    {
      arregloDatos = fechaDato[i].cadena.replace('\"','').replace('\"','').split(',');
      
      if(arregloDatos.length<3)
      {
        continue;
      }

      nuevoDato = +arregloDatos[2].split(':')[1];

      if(nuevoDato<0 || isNaN(nuevoDato))
      {
        continue
      }

      this.newData[conteo] = nuevoDato;
      nuevaFecha = fechaDato[i].horaexacta.replace('-',':').replace('-',':');
      this.newDataFecha[conteo] = nuevaFecha;
      this.dataSource[conteo] =  {fechaHora: nuevaFecha, dato: nuevoDato};
      sumaDatos += nuevoDato;

      conteo++;
    }
    this.promedio = Math.round(sumaDatos/(+conteo));
    this.updateAll();

  }

  updateAll()
  {
    this.barChartData[0].data = this.newData;
    this.barChartLabels = this.newDataFecha;
    this.promedioRitmo =this.promedio;
    this.listado.renderRows();
  }

  
  async Update() {
    await this.reportcotroller.get_Cambio(false);
    // si la caja donde se ingresa la fecha esta null se asume que es la fecha de hoy.
    await this.reportcotroller.get_AllDataUserMin(this.fecha, this.servicioUsuario.usuarioActivo,10);
    this.procesar(this.reportcotroller.cambiosRealTimeMin);
  
  }

  

}
