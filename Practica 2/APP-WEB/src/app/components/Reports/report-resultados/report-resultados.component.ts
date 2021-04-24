import { Component, OnInit,ViewChild } from '@angular/core';
import { ChartDataSets } from "chart.js";
import { Color, Label  } from "ng2-charts";
import { ELEMENT_PRUEBA, PeriodicElement, simboloVO2MAX, simboloVolumen  } from "../../../models/data";
import { MatTable } from '@angular/material/table';
import { Router } from '@angular/router';

import {reportService} from '../../../services/ReportService';
import {AngularFireDatabase} from '@angular/fire/database';
import {Activo} from '../../../models/Activo';
import {Registro} from '../../../models/Registro';

import { UserServiceService } from "../../../services/user-service/user-service.service";
import { PruebaService } from "../../../services/Prueba/prueba.service";

@Component({
  selector: 'app-report-resultados',
  templateUrl: './report-resultados.component.html',
  styleUrls: ['./report-resultados.component.css']
})
export class ReportResultadosComponent implements OnInit {


  barChartDataEx: ChartDataSets[] = [
    { data: [0,0,0,0], label: 'Estádisticas exhalación'}
  ]
  barChartDataIn: ChartDataSets[] = [
    { data: [0,0,0,0], label: 'Estadísticas inhalación'}
  ]


  barChartLabelsEx: Label[] = ['Máximo', 'Promedio', 'Mínimo',''];
  barChartLabelsIn: Label[] = ['Máximo', 'Promedio', 'Mínimo',''];

  barChartOptions = { responsive: true};

  barChartColorsEx: Color[] = [
    {
      borderColor: 'green',
      backgroundColor: 'rgb(31, 199, 14, .5)'
    }
  ];

  barChartColorsIn: Color[] = [
    {
      borderColor: 'blue',
      backgroundColor: 'rgb(17, 131, 209, .5)'
    }
  ];

  barChartLegend = true;
  barChartPlugins = [];
  barChartType = "bar";
  

  //Gráfica final
  lineChartData: ChartDataSets[] = [
    { data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], label: 'Gráfica final'}
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

  minimoEx;
  maximoEx;
  promedioEx;

  minimoIn;
  maximoIn;
  promedioIn;

  minimoE: number;
  maximoE: number;
  promedioE: number;

  minimoI: number;
  maximoI: number;
  promedioI: number;


  vo2max;
  newVo2max: number;

  newData: number[];
  newFecha: string[];


  usuario: string;
  iniciado:boolean;

  constructor(private servicioPrueba: PruebaService,private servicioUsuario: UserServiceService, private router:Router, private db: AngularFireDatabase) { 
    this.iniciado = false;
  }

  ngOnInit(): void {
    this.usuario = sessionStorage.getItem('user');
    this.servicioUsuario.peso = +sessionStorage.getItem('peso');


    if(this.servicioPrueba.prueba == undefined || this.servicioPrueba.prueba == null)
    {
      this.router.navigate(['atleta']);
    }
    else 
    {
      this.iniciar()
    }
  }

  async iniciar()
  {
    this.Update();
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }


  clicked()
  {
    console.log(this.Update());

  }

  procesarExhalacion(prueba)
  {
    //console.log('prueba: ',prueba)

    let arregloDatos:string[];

    let nuevoMaximo = 0;
    let nuevoMinimo = 9000;
    let nuevoPromedio = 0;
    let nuevoDato = 0;

    let bandera;


    
    let sumaVolumnes = 0;

    
    //console.log('Datos',entrenamientos);

    let cont=0;

    for(let registro of prueba.registros)
    {
      
      arregloDatos = registro.cadena.replace('\"','').replace('\"','').split(',');
        
      if(arregloDatos.length < 4)
      {
        continue;
      }
      nuevoDato = +arregloDatos[1].split(':')[1];
      bandera = +arregloDatos[2].split(':')[1];
   
      if(nuevoDato > 0 && bandera > 0)
      {

          if(nuevoDato > nuevoMaximo)
          {
            nuevoMaximo = nuevoDato;
          }
          if(nuevoDato < nuevoMinimo)
          {
            nuevoMinimo = nuevoDato;
          }
          
        
            sumaVolumnes += nuevoDato;
            cont++;
        }
    }
    
    console.log(nuevoMaximo,nuevoMinimo,cont,sumaVolumnes)
    nuevoPromedio = Math.round((sumaVolumnes/cont)*100)/100;

    
    if(nuevoMinimo >8000)
    {
      nuevoMinimo = 0; 
    }
    this.promedioE = nuevoPromedio;
    this.maximoE = nuevoMaximo;
    this.minimoE = nuevoMinimo;

  }

  procesarInhalacion(prueba)
  {
    console.log('prueba: ',prueba)

    let arregloDatos:string[];

    let nuevoMaximo = 0;
    let nuevoMinimo = 9000;
    let nuevoPromedio = 0;
    let nuevoDato = 0;

    let bandera;


    
    let sumaVolumnes = 0;

    
    //console.log('Datos',entrenamientos);

    let cont=0;

    for(let registro of prueba.registros)
    {
      
      arregloDatos = registro.cadena.replace('\"','').replace('\"','').split(',');

      if(arregloDatos.length < 4)
      {
        continue;
      }

      nuevoDato = +arregloDatos[1].split(':')[1];
      bandera = +arregloDatos[2].split(':')[1];
   
      if(nuevoDato > 0 && bandera < 0)
      {

          if(nuevoDato > nuevoMaximo)
          {
            nuevoMaximo = nuevoDato;
          }
          if(nuevoDato < nuevoMinimo)
          {
            nuevoMinimo = nuevoDato;
          }
                 
            sumaVolumnes += nuevoDato;
            cont++;
        }
    }
    
    console.log(nuevoMaximo,nuevoMinimo,cont,sumaVolumnes)
    nuevoPromedio = Math.round((sumaVolumnes/cont)*100)/100;

    if(nuevoMinimo > 8000)
    {
      nuevoMinimo = 0; 
    }
    this.promedioI = nuevoPromedio;
    this.maximoI = nuevoMaximo;
    this.minimoI = nuevoMinimo;

  }

  procesarGrafica(prueba)
  {
    let arregloDatos:string[];
    let nuevoDato:number = 0;
    let bandera:number = 0;
    this.newData = [];
    this.newFecha = [];

    for(let registro of prueba.registros)
    {
      arregloDatos = registro.cadena.replace('\"','').replace('\"','').split(',');
      
      if(arregloDatos.length < 4)
      {
        continue;
      }
      nuevoDato = +arregloDatos[1].split(':')[1];
      bandera = +arregloDatos[2].split(':')[1];

      if(bandera > 0)
      {
        nuevoDato = 0-nuevoDato;
      }

      arregloDatos = registro.horaexacta.split('-');
      
      this.newData.push(nuevoDato);
      this.newFecha.push(arregloDatos[0]+':'+arregloDatos[1]);

    }
    
  }

  procesarVO2MAX(prueba)
  {
    
    let arregloDatos:string[];
    let nuevoDato:number = 0;
    let banderaAntigua:number = 0;
    let banderaNueva:number = 0;
    let segundosAcumulados:number = 0;
    let segundos:number = 0;
    let sumaVolumenes: number = 0;
    let guardado: boolean = false;

    for(let registro of prueba.registros)
    {
      arregloDatos = registro.cadena.replace('\"','').replace('\"','').split(',');

      if(arregloDatos.length < 4)
      {
        continue;
      }

      banderaNueva = +arregloDatos[2].split(':')[1];

      segundos = +arregloDatos[3].split(':')[1];

      if(segundos > 0)
      {
        segundosAcumulados = segundos;
      }
    
      if(banderaNueva < 0)
      {
        //console.log('Registro inhalado:',nuevoDato)

        nuevoDato = +arregloDatos[1].split(':')[1];
        guardado = false;
      }

      if(banderaAntigua < 0 && banderaNueva > 0 )
      {
        console.log('acumulado entre mediciones',nuevoDato)
        sumaVolumenes += nuevoDato;
        guardado = true;
      }

      banderaAntigua = banderaNueva;

    }

    if(guardado == false)
    {
      sumaVolumenes += nuevoDato;
    }
    
    let calculo = +(sumaVolumenes*0.21/this.servicioUsuario.peso)/(segundosAcumulados/60);
    console.log('Volumenes: ',sumaVolumenes, 'segundos: ',segundosAcumulados);
    this.newVo2max = Math.round(calculo*100)/100; 
  }



  updateAll()
  {

    this.maximoEx = this.maximoE + simboloVolumen;
    this.minimoEx = this.minimoE + simboloVolumen;
    this.promedioEx = this.promedioE + simboloVolumen;

    this.maximoIn = this.maximoI + simboloVolumen;
    this.minimoIn = this.minimoI + simboloVolumen;
    this.promedioIn = this.promedioI + simboloVolumen;

    this.barChartDataEx[0].data = [this.maximoE,this.promedioE,this.minimoE,0];
    this.barChartDataIn[0].data = [this.maximoI,this.promedioI,this.minimoI,0];
    this.lineChartData[0].data = this.newData;
    this.lineChartLabels = this.newFecha;

    let diferencia:number;

    if(this.newVo2max < 55)
    {
      diferencia = 50-this.newVo2max; 
      diferencia *= 0.87;
    }

    this.vo2max = Math.round((this.newVo2max + diferencia)*100)/100 + simboloVO2MAX;
  }

  
  async Update() {
    let prueba = this.servicioPrueba.prueba;

    this.procesarExhalacion(prueba);
    this.procesarInhalacion(prueba);
    this.procesarGrafica(prueba);
    this.procesarVO2MAX(prueba);
    this.updateAll();
  }

  llenarArreglo(entrenamientos,reportEntrenamiento)
  {
    for(let entrenamiento of reportEntrenamiento)
    {
      entrenamientos.push(entrenamiento);
    }
  }

}
