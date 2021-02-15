import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartDataSets } from "chart.js";
import { Color, Label  } from "ng2-charts";
import { PeriodicElement ,ELEMENT_RITMO, simboloRitmo, PeriodicElementSupervisar } from "../../../models/data";
import { MatTable } from '@angular/material/table';

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
  

  /* Line chart variables */
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


  /* Elementos de la tabla */
  displayedColumns = ['icono', 'fecha', 'dato'];
  dataSource = ELEMENT_RITMO;
  @ViewChild (MatTable) listado: MatTable<PeriodicElement>;

  panelOpenState = false;


  /* Elementos númericos simpes */
  newData:number[]=[];

  ritmo; 

  constructor() { }

  ngOnInit(): void {
  }

  clicked()
  {
    this.newData = [
      this.newData[1],
      this.newData[2],
      this.newData[3],
      this.newData[4],
      this.newData[5],
      this.newData[6],
      this.newData[7],
      this.newData[8],
      this.newData[9],
      Math.random(),
    ];
    
    
    this.dataSource[0] = {fechaHora: '23-02-2021', dato: this.newData[0]};
    this.dataSource[1] = {fechaHora: '24-02-2021', dato: this.newData[1]};
    this.dataSource[2] = {fechaHora: '25-02-2021', dato: this.newData[2]};
    this.dataSource[3] = {fechaHora: '26-02-2021', dato: this.newData[3]};
    this.dataSource[4] = {fechaHora: '27-02-2021', dato: this.newData[4]};
    this.dataSource[5] = {fechaHora: '28-02-2021', dato: this.newData[5]};
    this.dataSource[6] = {fechaHora: '29-02-2021', dato: this.newData[6]};
    this.dataSource[7] = {fechaHora: '30-02-2021', dato: this.newData[7]};
    this.dataSource[8] = {fechaHora: '31-02-2021', dato: this.newData[8]};
    this.dataSource[9] = {fechaHora: '32-02-2021', dato: this.newData[9]};

    this.updateData(this.newData)
    

  }

  updateData(newData:number [])
  {
    this.ritmo = newData [9] + simboloRitmo;
    this.lineChartData[0].data = newData;
    this.barChartData[0].data = newData;
    this.listado.renderRows();
  }

  
}
