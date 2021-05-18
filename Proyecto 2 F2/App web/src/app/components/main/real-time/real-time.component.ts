import { Component, OnInit } from '@angular/core';
import { ChartDataSets } from "chart.js";
import { Color, Label  } from "ng2-charts";
import { simboloOxigeno,simboloRitmo,simboloTemperatura } from "../../../models/data";
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

    ChartDataRitmo: ChartDataSets[] = [
      { data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], label: 'Ritmo cardiaco'}
    ]
    ChartDataTemperatura: ChartDataSets[] = [
      { data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], label: 'Temperatura Corporal'}
    ]
    ChartDataOxigeno: ChartDataSets[] = [
      { data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], label: 'Oxigeno en la sangre'}
    ]
    ChartLabels: Label[] =  ['', '', '', '', '', '', '', '','', ''];
  
    ChartColorsRitmo: Color[] = [
      {
        borderColor: 'red',
        backgroundColor: 'rgb(232, 18, 38, .5)'
      }
    ];
    ChartColorsTemperatura: Color[] = [
      {
        borderColor: 'orange',
        backgroundColor: 'rgb(255, 102, 0, .5)'
      }
    ];

    ChartColorsOxigeno: Color[] = [
      {
        borderColor: 'blue',
        backgroundColor: 'rgb(52, 111, 229, .5)'
      }
    ];
    
  
    ChartOptions = { responsive: true};
    ChartLegend = true;
    ChartPlugins = [];

    ChartTypeRitmo = "line";
    ChartTypeTemperatura = "line";
    ChartTypeOxigeno = "line";

    
    /* Elementos firebase */
  
    usuarioActual: any;
    fecha: string;
    reportcotroller = new reportService(this.db);
    listaRegistroUsuario: any;
    listaTop10Usuario: any;
  
    /* Variables auxiliares */
    newDataFecha:string[] = [];
    newRitmos:number[] = [];
    newTemperaturas:number[] = [];
    newOxigenos:number[] = [];
    referenciaRitmo:number;
    
    newRitmo:number;

    Ritmo;
    Temperatura;
    Oxigeno;

    usuario: string;


    iniciado:boolean;

    snd1:any;
    snd2:any;
    snd3:any;
    snd0:any;

    volumen:number;

    varianza_ritmo:string;
    varianza_oxigeno:string;
    varianza_temperatura:string;

    mostrar_ritmo_up:boolean;
    mostrar_ritmo_down:boolean;
    mostrar_ritmo_midle:boolean;

    mostrar_temperatura_up:boolean;
    mostrar_temperatura_down:boolean;
    mostrar_temperatura_midle:boolean;

    mostrar_oxigeno_up:boolean;
    mostrar_oxigeno_down:boolean;
    mostrar_oxigeno_midle:boolean;

  constructor(private servicioUsuario: UserServiceService, private router:Router, private db: AngularFireDatabase) { 
    this.iniciado = false;   
    this.volumen = 0;
    this.referenciaRitmo = 1000;

    this.mostrar_ritmo_midle = true;
    this.mostrar_oxigeno_midle = true;
    this.mostrar_temperatura_midle = true;

    this.varianza_oxigeno = 'No hay cambio';
    this.varianza_ritmo = 'No hay cambio';
    this.varianza_temperatura = 'No hay cambio';
    
  }

  ngOnInit(): void {
    this.usuario = sessionStorage.getItem('user');
    this.snd0 = new Audio("https://www.soundjay.com/button/beep-09.mp3");  
    this.snd1 = new Audio("https://www.soundjay.com/button/beep-08b.mp3");  
    this.snd2 = new Audio("https://www.soundjay.com/button/beep-07.mp3");  
    this.snd3 = new Audio("https://www.soundjay.com/button/beep-06.mp3");  



    this.iniciar();
    this.get_Data(); 

  }

  
  async iniciar()
  {
    await this.delay(3000);
  }

  

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }


  async clicked()
  {
      console.log('volumen clicked',this.volumen)
      this.getBeep3();
      await this.delay(450);
  }

  

  procesar(fechaDato)
  {
    console.log('Datos:',fechaDato)
    let nuevoRitmo:number;
    let nuevoTemperatura:number;
    let nuevoOxigeno:number;
    let nuevaFecha;
    let arregloDatos:string[];
    let i;

    let cambioRitmo:number;
    let cambioTemperatura:number;
    let cambioOxigeno:number;

    
    let viejoRitmo:number=0;
    let viejoTemperatura:number=0;
    let viejoOxigeno:number=0;
    

    if(fechaDato == undefined)
    {
      return;
    }
    
    let conteo:number = -1;

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
      nuevoTemperatura = +arregloDatos[0].split(':')[1];
      nuevoOxigeno = +arregloDatos[1].split(':')[1];
      nuevoRitmo = +arregloDatos[2].split(':')[1];
      nuevaFecha = fechaDato[i].horaexacta.replace('-',':');

      conteo++;

      this.newRitmo = nuevoRitmo;
      this.newRitmos[conteo] = nuevoRitmo;
      this.newTemperaturas[conteo] = nuevoTemperatura
      this.newOxigenos[conteo] = nuevoOxigeno;

      this.newDataFecha[conteo] = nuevaFecha;

      cambioRitmo = nuevoRitmo - viejoRitmo;
      cambioTemperatura = nuevoTemperatura - viejoTemperatura;
      cambioOxigeno = nuevoOxigeno - viejoOxigeno;

      viejoRitmo = nuevoRitmo;
      viejoOxigeno = nuevoOxigeno;
      viejoTemperatura = nuevoTemperatura;
    }    
    
    this.cambiarVarianzaRitmo(cambioRitmo);
    this.cambiarVarianzaTemperatura(cambioTemperatura);
    this.cambiarVarianzaOxigeno(cambioOxigeno);
    
    this.updateAll();

  }

  updateAll()
  {
    this.getAudio();
    console.log('updateall')
    this.Ritmo = this.newRitmos [this.newRitmos.length-1] + simboloRitmo;
    this.Temperatura = this.newTemperaturas [this.newTemperaturas.length-1] + simboloTemperatura;
    this.Oxigeno = this.newOxigenos [this.newOxigenos.length-1] + simboloOxigeno;

    this.ChartDataRitmo[0].data = this.newRitmos;
    this.ChartDataTemperatura[0].data = this.newTemperaturas;
    this.ChartDataOxigeno[0].data = this.newOxigenos;

    this.ChartLabels = this.newDataFecha;
   
    
  }

  formatLabel(value: number) {
    return Math.round(value * 100);
  }


  async getAudio()
  {
    let intensidad = this.newRitmo/this.referenciaRitmo;
    let i;
    console.log('intensidad',intensidad, 'volumen',this.volumen);
    
    if(intensidad <= 0)
    {
        this.getBeep0();
        await this.delay(800);
    }
    else if(intensidad < 0.33)
    {
        this.getBeep1();
        await this.delay(500);
    }
    else if(intensidad < 0.66)
    {
        this.getBeep2();
        await this.delay(500);
    }
    else if(intensidad < 1)
    {
        this.getBeep3();
        await this.delay(500);
    }

  }
  
  getBeep0()
  { 
    this.snd0.volume = this.volumen;
    this.snd0.play();
  }

  getBeep1()
  { 
    this.snd1.volume = this.volumen;
    this.snd1.play();
  }

  getBeep2()
  { 
    this.snd2.volume = this.volumen;
    this.snd2.play();
  }

  getBeep3()
  { 
    this.snd3.volume = this.volumen;
    this.snd3.play();
  }


  get_Data() {
    return new Promise((resolve, reject) => {
      this.db.database.ref('activo/').on('value', (snapshot) => {
      this.Update();
      });
    });
  }

  cambiarVarianzaRitmo(variacion:number)
  {
    if(variacion < 0)
    {
      this.mostrar_ritmo_up = false;
      this.mostrar_ritmo_down = true;
      this.mostrar_ritmo_midle = false;

      this.varianza_ritmo = 'Decremento en el ritmo'
    }
    else if(variacion > 0)
    {
      this.mostrar_ritmo_up = true;
      this.mostrar_ritmo_down = false;
      this.mostrar_ritmo_midle = false;

      this.varianza_ritmo = 'Incremento en el ritmo'
    }
    else
    {
      this.mostrar_ritmo_up = false;
      this.mostrar_ritmo_down = false;
      this.mostrar_ritmo_midle = true;

      this.varianza_ritmo = 'No hay cambio en el ritmo'
    }
  }

  cambiarVarianzaTemperatura(variacion:number)
  {
    if(variacion < 0)
    {
      this.mostrar_temperatura_up = false;
      this.mostrar_temperatura_down = true;
      this.mostrar_temperatura_midle = false;

      this.varianza_temperatura = 'Decremento en el temperatura'
    }
    else if(variacion > 0)
    {
      this.mostrar_temperatura_up = true;
      this.mostrar_temperatura_down = false;
      this.mostrar_temperatura_midle = false;

      this.varianza_temperatura = 'Incremento en el temperatura'
    }
    else
    {
      this.mostrar_temperatura_up = false;
      this.mostrar_temperatura_down = false;
      this.mostrar_temperatura_midle = true;

      this.varianza_temperatura = 'No hay cambio en la temperatura'
    }
  }
  cambiarVarianzaOxigeno(variacion:number)
  {
    if(variacion < 0)
    {
      this.mostrar_oxigeno_up = false;
      this.mostrar_oxigeno_down = true;
      this.mostrar_oxigeno_midle = false;

      this.varianza_oxigeno = 'Decremento en el oxigeno'
    }
    else if(variacion > 0)
    {
      this.mostrar_oxigeno_up = true;
      this.mostrar_oxigeno_down = false;
      this.mostrar_oxigeno_midle = false;

      this.varianza_oxigeno = 'Incremento en el oxigeno'
    }
    else
    {
      this.mostrar_oxigeno_up = false;
      this.mostrar_oxigeno_down = false;
      this.mostrar_oxigeno_midle = true;

      this.varianza_oxigeno = 'No hay cambio'
    }
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
