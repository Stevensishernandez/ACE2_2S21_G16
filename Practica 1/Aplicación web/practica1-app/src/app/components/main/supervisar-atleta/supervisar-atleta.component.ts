import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { PeriodicElementSupervisar,ELEMENT_SUPERVISAR } from "../../../models/data";
import { User,ELEMENT_PERFIL } from "../../../models/user";

@Component({
  selector: 'app-supervisar-atleta',
  templateUrl: './supervisar-atleta.component.html',
  styleUrls: ['./supervisar-atleta.component.css']
})
export class SupervisarAtletaComponent implements OnInit {

  //Elementos para la tabla de registro de mediciones
  displayedColumns = ['icono', 'fecha', 'oxigeno','ritmo','temperatura'];
  dataSource = ELEMENT_SUPERVISAR;

  //Elementos para tabla de datos de perfil
  displayedColumnsPerfil: string[] = ['title', 'name'];

  dataSourcePerfil = ELEMENT_PERFIL;

  usuario=
  {
    nombres:'',
    apellidos:'',
    edad:'',
    sexo: '',
    peso: '',
    estatura: '',
  }

  constructor(private _location: Location) { }

  ngOnInit(): void {
  }

  cancel()
  {
    this._location.back();
  }
}
