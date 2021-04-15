import { Component, OnInit,ViewChild } from '@angular/core';
import { ChartDataSets } from "chart.js";
import { Color, Label  } from "ng2-charts";
import { PeriodicElement ,ELEMENT_ENTRENAMIENTOS, ELEMENT_REPETICIONES, simboloRitmo, PeriodicElementEnt, PeriodicElementSem } from "../../../models/data";
import { MatTable } from '@angular/material/table';

import {reportService} from '../../../services/ReportService';
import {AngularFireDatabase} from '@angular/fire/database';
import {Activo} from '../../../models/Activo';
import {Registro} from '../../../models/Registro';

import { UserServiceService } from "../../../services/user-service/user-service.service";

@Component({
  selector: 'app-report-cr',
  templateUrl: './report-cr.component.html',
  styleUrls: ['./report-cr.component.css']
})
export class ReportCrComponent implements OnInit {


  barChartDataEnt: ChartDataSets[] = [
    { data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], label: 'Repeticiones por entrenamiento'}
  ]
  barChartDataRep: ChartDataSets[] = [
    { data: [0, 0, 0], label: 'Repeticiones por semana'}
  ]


  barChartLabelsEnt: Label[] =  ['', '', '', '', '', '', '', '','', ''];
  barChartLabelsRep: Label[] =  ['', '', ''];

  barChartOptions = { responsive: true};

  barChartColorsEnt: Color[] = [
    {
      borderColor: 'green',
      backgroundColor: 'rgb(31, 199, 14, .5)'
    }
  ];

  barChartColorsRep: Color[] = [
    {
      borderColor: 'blue',
      backgroundColor: 'rgb(17, 131, 209, .5)'
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
  displayedColumnsEnt = ['icono', 'fechahora','entrenamiento','repeticiones', 'aprobacion'];
  dataSourceEnt = ELEMENT_ENTRENAMIENTOS;

  
  @ViewChild (MatTable) listado: MatTable<PeriodicElementEnt>;


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

  minimo: number;
  maximo: number;
  promedio: number;

  usuario: string;
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
    this.dataSourceEnt=[];
    let arregloDatos:string[];

    let nuevoMaximo = 0;
    let nuevoMinimo = 0;
    let nuevoPromedio = 0;

    let mainFecha ='';

    let sumaRepeteciones = 0;

    
    //console.log('Datos',entrenamientos);

    let cont=1;

    for(let entrenamiento of entrenamientos)
    {

      if(entrenamiento.recorridos == null || entrenamiento.recorridos == undefined){continue;}

        let numeroRecorrido = entrenamiento.recorridos.length;


        let recorrido = entrenamiento.recorridos[numeroRecorrido-1]

        if(recorrido == null || recorrido == undefined){continue;}

        let numeroRepeticiones =recorrido.registros.length;

        arregloDatos =recorrido.registros[numeroRepeticiones-1].cadena.replace('\"','').replace('\"','').split(',');

        if(arregloDatos.length < 5){continue;}

        let fallo_gano = this.getFalloGanoString(+arregloDatos[4].split(':')[1]);

        mainFecha =entrenamiento.fechahora;

        this.dataSourceEnt.push({
          fechaHora: entrenamiento.fechahora,
          entrenamiento: +cont,
          repeticiones: numeroRecorrido,
          aprobacion: fallo_gano

        });

        if(numeroRepeticiones>nuevoMaximo)
        {
          nuevoMaximo=numeroRepeticiones;
        }
        else (numeroRepeticiones<nuevoMinimo)
        {
          nuevoMinimo=numeroRepeticiones;
        }
        
        sumaRepeteciones += numeroRepeticiones;

        cont++;
    }

    nuevoPromedio = Math.round(sumaRepeteciones/cont);

    this.promedio=nuevoPromedio;
    this.maximo =nuevoMaximo;
    this.minimo = nuevoMinimo;

    this.updateAll();


  }

  getFalloGanoString(estado)
  {
    switch (estado)
    {
      case 0:
      case 1:
      case 2:
      case 3:
        return '✘'
      case 4:
        return '✔'
      default:
        return '-'
    }
  }


  updateAll()
  {
    let datosEnt = [];

    let fechasEnt = [];

    let cont:number = 0;


    for(let i= this.dataSourceEnt.length-1; i>-1; i--)
    {
      if(cont<10)
      {
        datosEnt.push(this.dataSourceEnt[i].repeticiones);
        fechasEnt.push('Ent#'+this.dataSourceEnt[i].entrenamiento);
        console.log(this.dataSourceEnt[i].repeticiones,this.dataSourceEnt[i].entrenamiento);
      }  
      cont++;
    }
    cont = 0;
    
    //console.log('datosEnt: ',datosEnt,'datosRep: ',fechasEnt);

 
    this.barChartDataEnt[0].data = datosEnt;
    this.barChartLabelsEnt = fechasEnt;

    this.barChartDataRep[0].data = [this.maximo,this.promedio,this.minimo];
    this.barChartLabelsRep = ['Máximo','Promedio','Mínimo'];
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
