import { Component, OnInit } from '@angular/core';
import { ChartDataSets } from "chart.js";
import { Color, Label  } from "ng2-charts";
import { simboloRitmo, simboloDistancia, simboloVelocidad, simboloTiemo,simboloTemperatura } from "../../../models/data";

import {reportService} from '../../../services/ReportService';
import {AngularFireDatabase} from '@angular/fire/database';
import {Activo} from '../../../models/Activo';

import { UserServiceService } from "../../../services/user-service/user-service.service";

@Component({
  selector: 'app-real-time',
  templateUrl: './real-time.component.html',
  styleUrls: ['./real-time.component.css']
})
export class RealTimeComponent implements OnInit {

  
    /* Line chart variables */
    lineChartDataRC: ChartDataSets[] = [
      { data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], label: 'Ritmo cardiaco'}
    ]

    doughnuCharDatav: ChartDataSets[] = [
      { data: [3,7], label: 'Velocidad'}
    ]

    lineChartLabelsRC: Label[] =  ['', '', '', '', '', '', '', '','', ''];
    doughnutChartLabelsV: Label[] =  ['velocidad','limite 10 m/s'];

  
    lineChartColorsRC: Color[] = [
      {
        borderColor: 'red',
        backgroundColor: 'rgb(250, 235, 215, .5)'
      }
    ];
    
    doughnutChartColorsV: Color[] = [
      {
        borderColor: 'green',
        backgroundColor: 'green'
      },
      {
        borderColor: 'gray',
        backgroundColor: 'gray'
      }
    ];

    
  
    ChartOptions = { responsive: true};
    ChartLegend = true;
    ChartPlugins = [];
    lineChartType = "line";
    doughnutChartType = "doughnut";
    barChartType = "bar";

    
    /* Elementos númericos simpes */
  
    //datoRecibido = 'T:154, O:545, R:868';
    ritmo; 
    velocidad;

    distancia;
    repeticion;
    tiempo;

    estado;

    promedioRitmo;
    

    
  
    /* Elementos firebase */
  
    usuarioActual: any;
    fecha: string;
    reportcotroller = new reportService(this.db);
    listaRegistroUsuario: any;
    listaTop10Usuario: any;
  
    /* Variables auxiliares */
    newDataRC:number[] = [];
    newDataFecha:string[] = [];
    newDatoPasos:number;
    newDatoDistancia:number;
    newDatoRepeticion:number;
    newDatoEstado:Number;
    newDatoTiempo:number;
    newDatoVelocidad:number;


    usuario: string;
    promedioRC: number;


    iniciado:boolean;

  constructor(private servicioUsuario: UserServiceService, private db: AngularFireDatabase) { 
    this.iniciado = false;

   
  }

  ngOnInit(): void {
    this.usuario = sessionStorage.getItem('user');
    this.iniciar();
    this.get_Data();
  }

  
  async iniciar()
  {
    await this.delay(3000);
    this.ritmo= 0 + simboloRitmo;
    this.tiempo= 0 + simboloTiemo;
    this.distancia = 0 + simboloDistancia;
    this.repeticion= 0;
    this.velocidad= 0 + simboloVelocidad;
    this.estado = 'Entrenando';
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
    console.log('Datos:',fechaDato)
    let nuevoDatoRC;
    let nuevaFecha;
    let arregloDatos:string[];
    let i;

    let nuevoDatoPaso;
    let nuevoDatoDistancia;
    let nuevoDatoTiempo;
    let nuevoDatoEstado;
    let nuevoDatoRepeticiones;
    let diferencialDistancia;
    let diferencialTiempo;


    if(fechaDato == undefined)
    {
      return;
    }
    

    arregloDatos = fechaDato[0].cadena.replace('\"','').replace('\"','').split(',');
    
    let DistanciaAntes:number;
    let TiempoAntes:number;

    for(i in fechaDato)
    {
      arregloDatos = fechaDato[i].cadena.replace('\"','').replace('\"','').split(',');
      nuevoDatoRC = +arregloDatos[0].split(':')[1];
      nuevoDatoDistancia = +arregloDatos[1].split(':')[1];
      nuevoDatoTiempo = +arregloDatos[2].split(':')[1];
      nuevoDatoRepeticiones = +arregloDatos[3].split(':')[1];
      nuevoDatoEstado = +arregloDatos[4].split(':')[1];
      this.newDataRC[i] = nuevoDatoRC;
      nuevaFecha = fechaDato[i].horaexacta;
      this.newDataFecha[i] = nuevaFecha;

      //Cálculo velocidad
      diferencialDistancia = nuevoDatoDistancia - DistanciaAntes;
      diferencialTiempo = nuevoDatoTiempo - TiempoAntes;

      this.newDatoVelocidad =0;


      if(diferencialDistancia>0)
      {
        console.log(diferencialDistancia);
        this.newDatoVelocidad = Math.round((diferencialDistancia / diferencialTiempo)*133)/100;
      }
   
      this.newDatoRepeticion = nuevoDatoRepeticiones;
      this.newDatoEstado = nuevoDatoEstado;

      DistanciaAntes = nuevoDatoDistancia;
      TiempoAntes = nuevoDatoTiempo;
    }

    this.newDatoDistancia =  Math.round((DistanciaAntes)*133)/100;
    this.newDatoTiempo = TiempoAntes;
    
  }

  updateAll()
  {
    console.log('updateall')
    this.ritmo = this.newDataRC [9] + simboloRitmo;
    this.lineChartDataRC[0].data = this.newDataRC;
    this.lineChartLabelsRC = this.newDataFecha;



    this.repeticion = this.newDatoRepeticion;
    this.distancia = this.newDatoDistancia+simboloDistancia;
    this.tiempo = this.newDatoTiempo+simboloTiemo;
    this.velocidad =this.newDatoVelocidad+simboloVelocidad;
  
    switch (this.newDatoEstado)
    {
      case 0:
        this.estado='Entrenando'
        break;
      case 1:
        this.estado='Rendimeinto por ritmo'
        break;
      case 2:
        this.estado='Rendimeinto por boton'
        break;
      case 3:
        this.estado='Fallo'
        break;
      case 4:
        this.estado='Ganó'
        break;
    }

    this.doughnuCharDatav[0].data[0] = +this.velocidad;
    this.doughnuCharDatav[0].data[1] = 20-this.velocidad;
  }

  get_Data() {
    return new Promise((resolve, reject) => {
      this.db.database.ref('activo/').on('value', (snapshot) => {
      this.Update();
      this.updateAll();

      });
    });
  }
  
  async Update() {
    


    this.reportcotroller.get_Cambio();

    this.reportcotroller.get_AllDataUserMin(this.fecha, this.servicioUsuario.usuarioActivo,10);

    // si la caja donde se ingresa la fecha esta null se asume que es la fecha de hoy.
    this.usuarioActual = JSON.stringify(this.reportcotroller.activo as Activo);
    console.log(this.reportcotroller.cambiosTop10);
    this.procesar(this.reportcotroller.cambiosTop10);

  }

  


}
