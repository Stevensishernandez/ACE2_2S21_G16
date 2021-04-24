import { Component, OnInit } from '@angular/core';
import { ChartDataSets } from "chart.js";
import { Color, Label  } from "ng2-charts";
import { simboloTiempo, simboloVO2MAX, simboloVolumen } from "../../../models/data";
import { Router } from "@angular/router"

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

    lineChartData: ChartDataSets[] = [
      { data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], label: 'Gráfica tiempo real'}
    ]
    lineChartLabels: Label[] =  ['', '', '', '', '', '', '', '','', ''];
  
    lineChartColors: Color[] = [
      {
        borderColor: 'red',
        backgroundColor: 'rgb(250, 235, 215, .5)'
      }
    ];
    
  
    ChartOptions = { responsive: true};
    ChartLegend = true;
    ChartPlugins = [];
    lineChartType = "line";

    
    /* Elementos númericos simpes */

    vo2max;
    estado;
    tiempo;
    volumen;

    minutos: number;
    segundos: number;
    segundosAcumulados: number;
    sumaVolumenes: number;
  
    /* Elementos firebase */
  
    usuarioActual: any;
    fecha: string;
    reportcotroller = new reportService(this.db);
    listaRegistroUsuario: any;
    listaTop10Usuario: any;
  
    /* Variables auxiliares */
    newDataFecha:string[] = [];
    newVolumenes:number[] = [];
    newDatoVolumen:number;
    newDatoEstado:string;
    newDatoTiempo:number;
    newDatoVO2MAX: number;


    usuario: string;


    iniciado:boolean;

  constructor(private servicioUsuario: UserServiceService, private router:Router, private db: AngularFireDatabase) { 
    this.iniciado = false;
    this.sumaVolumenes = 0;
   
  }

  ngOnInit(): void {
    this.usuario = sessionStorage.getItem('user');
    this.servicioUsuario.peso = +sessionStorage.getItem('peso');

    this.reportcotroller.segundosAcumulados = 0;
    this.servicioUsuario.cronometroHabilitado = true;
    this.iniciar();
    this.get_Data(); 
    this.cronometro();
  }

  
  async iniciar()
  {
    await this.delay(3000);
    this.tiempo= 0;
  }

  async cronometro()
  {
    this.segundos = 0;
    this.minutos = 0;
    let cierreNormal = false;

    while(this.servicioUsuario.cronometroHabilitado)
    {
      await this.delay(1000);
      this.reportcotroller.segundosAcumulados++;
      this.segundos++;

      if(this.segundos > 59)
      {
        this.minutos++;
        this.segundos = 0;

        
      }

      if(this.minutos > 4 && this.segundos == 0)
      {
        this.servicioUsuario.cronometroHabilitado = false;
        cierreNormal = true;
      }

      let segundosLetra = this.segundos + '';

      if(this.segundos < 10)
      {
        segundosLetra = '0'+ this.segundos;
      }

      this.tiempo = this.minutos + ':' + segundosLetra;
    }

    if(cierreNormal)
    {
      this.router.navigate(['atleta'])
    }
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
    let nuevoVolumen:number;
    let nuevaFecha;
    let arregloDatos:string[];
    let i;

    let nuevoDatoTiempo;
    let nuevoOV: number;
    let nuevoDatoEstado;


    if(fechaDato == undefined)
    {
      return;
    }
    
    
    for(i in fechaDato)
    {
      if(fechaDato[i] == 0)
      {
        continue;
      }

    

      arregloDatos = fechaDato[i].cadena.replace('\"','').replace('\"','').split(',');

      if(arregloDatos.length < 3)
      {
        continue;
      }

      nuevoOV = +arregloDatos[1].split(':')[1];
      nuevoVolumen = +arregloDatos[1].split(':')[1];
      nuevoDatoEstado = +arregloDatos[2].split(':')[1];

      this.newDatoEstado = this.getEstado(nuevoDatoEstado);

      if(nuevoDatoEstado > 0)
      {
        nuevoVolumen = 0-nuevoVolumen;
      }

      this.newVolumenes[i] = nuevoVolumen;
      nuevaFecha = fechaDato[i].horaexacta.replace('-',':');
      this.newDataFecha[i] = nuevaFecha;
    }
/*
    if(nuevoDatoEstado < 0)
    {
      let calculo = nuevoOV/this.servicioUsuario.peso;
      this.newDatoVO2MAX = calculo;
    }
    */

    if(nuevoDatoEstado)
    
    if(nuevoDatoEstado < 0)
    {
      this.sumaVolumenes += nuevoVolumen;
      let calculo = +((this.sumaVolumenes*.21)/this.servicioUsuario.peso)/(this.reportcotroller.segundosAcumulados/60);
      this.newDatoVO2MAX = Math.round(calculo*100)/1000; 
    
    }
    
    
    
    this.updateAll();

  }

  getEstado(bandera): string
  {   
    if(bandera < 0)
    {
      return 'Inhalando';
    }

    return 'Exhalando';
  }

  updateAll()
  {
    console.log('updateall')
    console.log(this.newVolumenes)
    this.vo2max = this.newDatoVO2MAX + simboloVO2MAX;

    this.newDataFecha[this.newDataFecha.length - 1] = this.tiempo;
    this.lineChartData[0].data = this.newVolumenes;
    this.lineChartLabels = this.newDataFecha;
    this.volumen = this.newVolumenes [this.newVolumenes.length-1] + simboloVolumen;


    this.estado = this.newDatoEstado;
    //this.tiempo = this.minutos + ':' + this.segundos;

  }

  get_Data() {
    return new Promise((resolve, reject) => {
      this.db.database.ref('activo/').on('value', (snapshot) => {
      this.Update();
      });
    });
  }
  
  async Update() {
    
    await this.reportcotroller.get_Cambio(true);

    await this.reportcotroller.get_AllDataUserMin(this.fecha, this.servicioUsuario.usuarioActivo,10);

    // si la caja donde se ingresa la fecha esta null se asume que es la fecha de hoy.
    this.usuarioActual = JSON.stringify(this.reportcotroller.activo as Activo);
    //console.log(this.reportcotroller.cambiosTop10);
    this.procesar(this.reportcotroller.cambiosTop10);

  }
}
