import { Component, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Location} from '@angular/common';
import { MatTable } from '@angular/material/table';
import { UserBasicList } from "../../../models/user";

@Component({
  selector: 'app-atletas',
  templateUrl: './atletas.component.html',
  styleUrls: ['./atletas.component.css']
})
export class AtletasComponent implements OnInit {

  columnas: string[] = ['icono','usuario','nombre','opcion'];

  datos: UserBasicList[] = [];

  id:any;

  usuarioBuscado:string;

  constructor(private router:Router,private _location: Location) { }

  ngOnInit(): void {
    this.Iniciar_ordenes();
    this.Iniciar_ordenes();
  }

  Iniciar_ordenes()
  {
    this.datos.push({
      usuario: this.usuarioBuscado,
      nombres: 'El nombre de '+this.usuarioBuscado,
      });
     
  }

  addAtleta()
  {
    this.datos.push({
      usuario: 'usuario1',
      nombres: 'El nombre del usuario 1'
      }); 
      this.tabla1.renderRows();
  }

  @ViewChild(MatTable) tabla1: MatTable<UserBasicList>;

  borrarFila(cod: number) {
    if (confirm("Desea marcar la transacción como entregada?")) {
      this.borrarOrden(cod);
      this.datos.splice(cod, 1);
      this.tabla1.renderRows();
    }
  }
  borrarOrden(cod: number)
  {
    let numero=this.datos[cod].usuario;
    console.log(numero);

  }

}
