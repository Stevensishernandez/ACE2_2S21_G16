import { Component, OnInit,  ViewChild } from '@angular/core';
import { ChartDataSets } from "chart.js";
import { Color, Label  } from "ng2-charts";
import { PeriodicElement ,ELEMENT_DISTANCIA, simboloRitmo, PeriodicElementDistancia } from "../../../models/data";
import { MatTable } from '@angular/material/table';

import {reportService} from '../../../services/ReportService';
import {AngularFireDatabase} from '@angular/fire/database';
import {Activo} from '../../../models/Activo';
import {Registro} from '../../../models/Registro';

import { UserServiceService } from "../../../services/user-service/user-service.service";
import { Entranamiento } from 'src/app/models/Entranamiento';

@Component({
  selector: 'app-report-cd',
  templateUrl: './report-cd.component.html',
  styleUrls: ['./report-cd.component.css']
})
export class ReportCdComponent implements OnInit {

  barChartData: ChartDataSets[] = [
    { data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], label: 'Distancia por repetición'}
  ]

  barChartLabels: Label[] =  ['', '', '', '', '', '', '', '','', ''];

  barChartOptions = { responsive: true};

  barChartColors: Color[] = [
    {
      borderColor: 'green',
      backgroundColor: 'rgb(31, 199, 14, .5)'
    }
  ];

  barChartLegend = true;
  barChartPlugins = [];
  barChartType = "bar";
  

  /* Line chart variables 
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

  */

  /* Elementos de la tabla */
  displayedColumns = ['icono','fechaHora', 'entrenamiento','repeticion','dato'];
  dataSource = ELEMENT_DISTANCIA;

  
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
  listaEntramientos: any;

  /* Variables auxiliares */
  usuario: string;
  promedio: number;
  maxima: number;
  minima: number;
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
    await this.delay(1000);
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
    let arregloDatos:string[];
    this.dataSource = [];
    let numEnt=0;

    //console.log('report cd',entrenamientos);

    for(let entrenamiento of entrenamientos)
    {


      for(let repeticion of entrenamiento.recorridos)
      {

        let distancia1;
        let distancia2;
        let distancia;

        arregloDatos = repeticion.registros[0].cadena.replace('\"','').replace('\"','').split(',');
        //console.log('primero',arregloDatos.length);
        if(arregloDatos.length<5) {continue}; 
        distancia1 = +arregloDatos[1].split(':')[1];

        arregloDatos = repeticion.registros[repeticion.registros.length-1].cadena.replace('\"','').replace('\"','').split(',');
        //console.log('primero',arregloDatos.length);
        if(arregloDatos.length<5) {continue}; 
        distancia2 = +arregloDatos[1].split(':')[1];

        distancia = Math.round((distancia2-distancia1)*133)/100;

        this.dataSource.push(
          {
            fechaHora: entrenamientos[numEnt].fechahora,
            numEntrenamiento: numEnt+1,
            numRepeticion: repeticion.numeroRecorrido,
            dato: distancia2-distancia1
          }

        );
      }

      numEnt++;
    
    }

    this.updateAll();
  }

  updateAll()
  {
    let cont=0;
    let datos:number[]=[];
    let fechas:string[]=[];

    for(let i= this.dataSource.length-1; i>-1; i--)
    {
      if(cont<10)
      {
        datos.push(this.dataSource[i].dato);
        fechas.push('Rep#'+this.dataSource[i].numRepeticion);
      }  
      cont++;
    }

    //this.lineChartData[0].data = this.newData;
    this.barChartData[0].data=datos;
    this.barChartLabels = fechas;

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
