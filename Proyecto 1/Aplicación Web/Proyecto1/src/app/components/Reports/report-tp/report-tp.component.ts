import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartDataSets } from "chart.js";
import { Color, Label  } from "ng2-charts";
import { PeriodicElement ,ELEMENT_TEMPERATURA, simboloTemperatura, PeriodicElementSupervisar } from "../../../models/data";
import { MatTable } from '@angular/material/table';

import {reportService} from '../../../services/ReportService';
import {AngularFireDatabase} from '@angular/fire/database';
import {Activo} from '../../../models/Activo';
import {Registro} from '../../../models/Registro';

import { UserServiceService } from "../../../services/user-service/user-service.service";


@Component({
  selector: 'app-report-tp',
  templateUrl: './report-tp.component.html',
  styleUrls: ['./report-tp.component.css']
})
export class ReportTpComponent implements OnInit {

    /* Line chart variables */

    barChartData: ChartDataSets[] = [
      { data:[0, 0, 0, 0, 0, 0, 0, 0, 0, 0], label: 'Temperatura Corporal'}
    ]
  
    barChartLabels: Label[] =  ['', '', '', '', '', '', '', '','', ''];
  
    barChartOptions = { responsive: true};
  
    barChartColors: Color[] = [
      {
        borderColor: 'orange',
        backgroundColor: 'rgb(255, 102, 0, .5)'
      }
    ];
  
    barChartLegend = true;
    barChartPlugins = [];
    barChartType = "bar";
  
    /* Line chart variables 
    lineChartData: ChartDataSets[] = [
      { data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], label: 'Temperatura Corporal'}
    ]
  
    lineChartLabels: Label[] =  ['', '', '', '', '', '', '', '','', ''];
  
    lineChartOptions = { responsive: true};
  
    lineChartColors: Color[] = [
      {
        borderColor: 'orange',
        backgroundColor: 'rgb(225, 164, 32, .5)'
      }
    ];
  
    lineChartLegend = true;
    lineChartPlugins = [];
    lineChartType = "line";
    
    */
  
    /* Elementos de la tabla */
    displayedColumns = ['icono', 'fecha', 'dato'];
    dataSource = ELEMENT_TEMPERATURA;
    @ViewChild (MatTable) listado: MatTable<PeriodicElement>;

    panelOpenState = false;

      /* Elementos númericos simpes */

    temperatura;
    promTemperatura;
    maxTemperatura;
    minTemperatura;

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
    promedio: number = 0 ;
    maximo: number = 0;
    minimo: number = 0;

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
    this.temperatura = 0 + simboloTemperatura;
    this.promTemperatura = 0 + simboloTemperatura;
    this.maxTemperatura = 0 + simboloTemperatura;
    this.minTemperatura = 0 + simboloTemperatura;
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }


  clicked()
  {
    
  }

 
  procesar(fechaDato)
  {
    let nuevoDato: number;
    let nuevaFecha;
    let sumaDatos:number = 0;
    let arregloDatos:string[];
    let i;

    if(fechaDato == undefined)
    {
      return;
    }

    arregloDatos = fechaDato[0].cadena.replace('\"','').replace('\"','').split(',');
    nuevoDato = +arregloDatos[0].split(':')[1];

    this.maximo = nuevoDato;
    this.minimo = nuevoDato;

    for(i in fechaDato)
    {
      arregloDatos = fechaDato[i].cadena.replace('\"','').replace('\"','').split(',');
      nuevoDato = +arregloDatos[0].split(':')[1];
      this.newData[i] = nuevoDato;
      nuevaFecha = fechaDato[i].horaexacta;
      this.newDataFecha[i] = nuevaFecha;
      this.dataSource[i] =  {fechaHora: nuevaFecha, dato: nuevoDato};
      sumaDatos += nuevoDato;
      if(nuevoDato > this.maximo)
      {
        this.maximo = nuevoDato;
      }
      if(nuevoDato < this.minimo)
      {
        this.minimo = nuevoDato;
      }
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
    this.temperatura = this.newData [9] + simboloTemperatura;
    //this.lineChartData[0].data = this.newData;
    this.barChartData[0].data = this.newData;
    this.barChartLabels = this.newDataFecha;
    //this.lineChartLabels = this.newDataFecha;
    this.promTemperatura = this.promedio + simboloTemperatura;
    this.maxTemperatura = this.maximo + simboloTemperatura;
    this.minTemperatura = this.minimo + simboloTemperatura;
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
    this.reportcotroller.get_AllDataUser(this.fecha, this.servicioUsuario.usuarioActivo,10);
    this.usuarioActual = JSON.stringify(this.reportcotroller.activo as Activo);
    this.listaRegistroUsuario = JSON.stringify(this.reportcotroller.cambiosRealTime);
    this.listaTop10Usuario = JSON.stringify(this.reportcotroller.cambiosTop10);
    this.procesar(this.reportcotroller.cambiosTop10);
  }

  
}

