import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartDataSets } from "chart.js";
import { Color, Label  } from "ng2-charts";
import { PeriodicElementVelocidad ,ELEMENT_VELOCIDAD, simboloVelocidad } from "../../../models/data";
import { MatTable } from '@angular/material/table';

import {reportService} from '../../../services/ReportService';
import {AngularFireDatabase} from '@angular/fire/database';
import {Activo} from '../../../models/Activo';
import {Registro} from '../../../models/Registro';

import { UserServiceService } from "../../../services/user-service/user-service.service";

@Component({
  selector: 'app-report-cv',
  templateUrl: './report-cv.component.html',
  styleUrls: ['./report-cv.component.css']
})
export class ReportCvComponent implements OnInit {

  barChartData: ChartDataSets[] = [
    { data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], label: 'Repeticiones por entrenamiento'}
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
  displayedColumns = ['icono','fechaHora','entrenamiento','repeticion', 'promedio'];
  dataSource = ELEMENT_VELOCIDAD;

  
  @ViewChild (MatTable) listado: MatTable<PeriodicElementVelocidad>;

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
  promedio;
  maxima;
  minima;
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
    let arregloDatosPrimer:string[];
    let arregloDatosUltimo:string[];
    let distancia1:number;
    let distancia2:number;
    let diferenciaDistancia:number;
    let tiempo1:number;
    let tiempo2:number;
    let diferenciaTiempo:number;
    let velocidad:number;

    let velocidadMaxima:number = 0;
    let velocidadMinima:number = 0;
    let sumaVelocidades:number = 0;
    let contVelocidades:number = 0;

    this.dataSource=[];

    let cont=0;

    for(let entrenamiento of entrenamientos)
    {
      cont++;
      for(let repeticion of entrenamiento.recorridos)
      {
        let numRegistros =repeticion.registros.length;   
        arregloDatosPrimer = repeticion.registros[0].cadena.replace('\"','').replace('\"','').split(',');
        arregloDatosUltimo = repeticion.registros[numRegistros-1].cadena.replace('\"','').replace('\"','').split(',');

        if(arregloDatosPrimer.length < 5 || arregloDatosUltimo.length < 5){continue;}
        
        distancia1 = +arregloDatosPrimer[1].split(':')[1];
        distancia2 = +arregloDatosUltimo[1].split(':')[1];

        diferenciaDistancia = Math.round((distancia2-distancia1)*133)/100;;

        tiempo1 = +arregloDatosPrimer[2].split(':')[1];
        tiempo2 = +arregloDatosUltimo[2].split(':')[1];
        
        diferenciaTiempo = tiempo2 -tiempo1;

        if(diferenciaDistancia>0)
        {
          velocidad = Math.round((diferenciaDistancia/diferenciaTiempo)*133)/100;
        }
        else
        {
          velocidad = 0;
        }
        //console.log(velocidad);
        this.dataSource.push(
          {
            fechaHora: entrenamiento.fechahora,
            entrenamiento: cont,
            repeticion: repeticion.numeroRecorrido,
            promedio: velocidad
          }
        );

        contVelocidades++;
        sumaVelocidades += velocidad;

        if(velocidad > velocidadMaxima)
        {
          velocidadMaxima = velocidad;
        }
        else if(velocidad < velocidadMinima)
        {
          velocidadMinima = velocidad;
        }
        
      }
    }

    this.promedio = Math.round(sumaVelocidades/contVelocidades*100)/100 + simboloVelocidad;
    this.maxima = velocidadMaxima + simboloVelocidad;
    this.minima = velocidadMinima + simboloVelocidad;

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
        datos.push(this.dataSource[i].promedio);
        fechas.push('Rep#'+this.dataSource[i].repeticion);
      }  
      else
      {
        break;
      }
      cont++;
    }

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
