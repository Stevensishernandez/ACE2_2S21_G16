import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Location} from '@angular/common';
import { Rol,Sexo,User } from "../../../models/user";

import { AngularFireDatabase } from '@angular/fire/database';
import { userService } from "../../../services/UserService";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  usercontroller = new userService(this.db);

  roles: Rol[] = [
    {value: 'A',viewValue:'Atleta'},
    {value: 'C',viewValue:'Coach'},
  ];

  sexos: Sexo[] = [
    {value: 'M',viewValue:'Masculino'},
    {value: 'F',viewValue:'Femenino'},
  ];


  rol_seleccionado = '';
  sexo_seleccionado = '';


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
  

  constructor(private db: AngularFireDatabase, private router:Router,private _location: Location) { }

  ngOnInit(): void {
  }

  irLogin()
  {
    this.router.navigate(['']);
  }
  signUp()
  {
    const user = {} as User;

    if(this.usuario.usuario != '' && this.usuario.apellidos != '' && this.usuario.edad != '' 
      && this.sexo_seleccionado != '' && this.usuario.peso != '' && this.usuario.estatura != ''
      && this.usuario.usuario != '' && this.usuario.password != '' && this.rol_seleccionado != ''
      && this.usuario.nombres != '')
      {
        if(this.usuario.password == this.c_password)
        {
          user.sexo = this.sexo_seleccionado;
          user.peso = this.usuario.peso;
          user.estatura = this.usuario.estatura;
          user.edad = this.usuario.edad;
          user.apellido = this.usuario.apellidos;
          user.password = this.usuario.password;
          user.key = this.usuario.usuario;
          user.nombre = this.usuario.nombres;
          user.rol = this.rol_seleccionado;

          //console.log(user)
          this.usercontroller.insertUser(user);

          this.router.navigate(['']);


          return;
        }
        alert('Las contraseñas no coinciden.')
        return;
      }

      alert('Por favor, ingrese todos los campos antes de enviar la solicitud.')
  }
  cancel()
  {
    //this.viewAllusers();
    this._location.back();
  }

  viewAllusers(): void{
    this.usercontroller.get_Users();
    this.usercontroller.sincronizar();
    console.log(this.usercontroller.users);
  }

}
