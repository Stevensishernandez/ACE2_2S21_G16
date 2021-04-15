import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartDataSets } from "chart.js";
import { Color, Label  } from "ng2-charts";
import { PeriodicElement ,ELEMENT_ENTRENAMIENTOS, simboloRitmo } from "../../../models/data";
import { MatTable } from '@angular/material/table';

import {reportService} from '../../../services/ReportService';
import {AngularFireDatabase} from '@angular/fire/database';
import {Activo} from '../../../models/Activo';
import {Registro} from '../../../models/Registro';

import { UserServiceService } from "../../../services/user-service/user-service.service";

@Component({
  selector: 'app-report-cvr',
  templateUrl: './report-cvr.component.html',
  styleUrls: ['./report-cvr.component.css']
})
export class ReportCvrComponent implements OnInit {

  pieChartData: ChartDataSets[] = [
    { data: [50, 50], label: 'Distancia por repetición'}
  ]

  pieChartLabels: Label[] =  ['Rendicon', 'No rendido'];

  pieChartOptions = { responsive: true};

  pieChartLegend = true;
  pieChartPlugins = [];
  pieChartType = "pie";


  /* Elementos de la tabla */
  displayedColumns = ['icono', 'fechahora','entrenamiento','repeticiones', 'aprobacion'];
  dataSource = ELEMENT_ENTRENAMIENTOS;

  
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
  rendisiones: number;
  iniciado:boolean;

  rendicion:number;

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
    
    this.dataSource=[];
    let arregloDatos:string[];


    let mainFecha ='';

    
    //console.log('Datos',entrenamientos);

    let cont=1;
    let contRendiciones=0;

    for(let entrenamiento of entrenamientos)
    {

      let rendicionActual=0;
       
       for(let recorrido of entrenamiento.recorridos)
       {
          for(let registro of recorrido.registros)
          {
            arregloDatos =registro.cadena.replace('\"','').replace('\"','').split(',');
            if(arregloDatos.length < 5){continue;}

            let estado = +arregloDatos[4].split(':')[1];
            if(estado==1 || estado==2)
            {
              rendicionActual = estado;
            }

          }
       }

        if(rendicionActual != 0)
        {
          contRendiciones++;
          mainFecha =entrenamiento.fechahora;

          this.dataSource.push({
            fechaHora: entrenamiento.fechahora,
            entrenamiento: +cont,
            repeticiones: entrenamiento.recorridos.length,
            aprobacion: this.getTipoRendicion(rendicionActual)
  
          });

  
        }


        cont++;
 
    }

    this.rendisiones=contRendiciones;

    this.newData[0]=+contRendiciones;
    this.newData[1]=+(cont-1-contRendiciones);

    this.updateAll();

  }

  getTipoRendicion(estado):string
  {
    if(estado==1)
    {
      return 'Por ritmo'
    }
    return 'Agotamiento'
  }

  updateAll()
  {
    this.pieChartData[0].data = this.newData;
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
