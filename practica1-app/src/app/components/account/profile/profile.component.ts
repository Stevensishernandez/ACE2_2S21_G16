import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Location} from '@angular/common';
import { Rol,Sexo,User } from "../../../models/user";
import { PerfilElement, ELEMENT_PERFIL } from "../../../models/user";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  displayedColumns: string[] = ['title', 'name'];
  dataSource = ELEMENT_PERFIL;

  roles: Rol[] = [
    {value: 0,viewValue:'Atleta'},
    {value: 1,viewValue:'Coach'},
  ];

  sexos: Sexo[] = [
    {value: 0,viewValue:'Masculino'},
    {value: 1,viewValue:'Femenino'},
  ];


  rol_seleccionado: 'none'
  sexo_seleccionado: 'none'


  usuario=
  {
    nombres:'',
    apellidos:'',
    edad:'',
    sexo: '',
    peso: '',
    estatura: '',

    usuario: '',
    password: '',
  }

  c_password: string 
  

  constructor(private router:Router,private _location: Location) { }

  ngOnInit(): void {
  }

  cancel()
  {
    this._location.back();
  }
}
