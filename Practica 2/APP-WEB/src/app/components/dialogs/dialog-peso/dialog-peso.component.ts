import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Location} from '@angular/common';
import { Rol,Sexo,User } from "../../../models/user";

import { AngularFireDatabase } from '@angular/fire/database';
import { userService } from "../../../services/UserService";


import { UserServiceService } from "../../../services/user-service/user-service.service";


@Component({
  selector: 'app-dialog-peso',
  templateUrl: './dialog-peso.component.html',
  styleUrls: ['./dialog-peso.component.css']
})
export class DialogPesoComponent implements OnInit {

  usercontroller = new userService(this.db);

  roles: Rol[] = [
    {value: 'L',viewValue:'Libras'},
    {value: 'K',viewValue:'Kilogramos'},
  ];


  rol_seleccionado = '';


  usuario=
  {
    nombres:'',
    apellidos:'',
    edad:'',
    peso: '',
    estatura: '',

    usuario: '',
    password: '',

  }

  c_password: string 
  

  constructor(public servicioUsuario: UserServiceService, private db: AngularFireDatabase, private router:Router,private _location: Location) { }

  ngOnInit(): void {
    this.usuario.usuario = sessionStorage.getItem('user');
  }

  cambiar()
  {
    const user = {} as User;

    user.key = this.usuario.usuario;
    
    if(this.usuario.peso != '' && this.rol_seleccionado != '')
    {

          user.peso = this.usuario.peso;
          user.rol = 'K';
      
          if(this.rol_seleccionado == 'L')
          {
            let recalculoPeso = +this.usuario.peso *0.453592;
            user.peso = Math.round(recalculoPeso)+'';
          }
          
          let exitoso = this.usercontroller.cambiarPeso(user);

          if(exitoso)
          {
           
            this.servicioUsuario.mostrarPeso(+user.peso, user.peso+' Kg');

            sessionStorage.setItem('rol',user.rol);
            sessionStorage.setItem('peso',user.peso);
          }
          return;
        
      }




      alert('Por favor, ingrese todos los campos antes de enviar la solicitud.')
  }
  cancel()
  {
    //this.viewAllusers();
    this._location.back();
  }

}
