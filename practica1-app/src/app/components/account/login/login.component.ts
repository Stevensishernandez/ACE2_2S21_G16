import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import { LoginService } from "../../services/login/login.service";

import { PruebaService } from "../../../services/Prueba/prueba.service";
import { User } from "../../../models/user";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {




  credenciales=
  {
    usuario: '',
    password:'',
  }

  usuarioRecibido='';
  passwordRecibida='';

  
  constructor(private router:Router, private pruebaService:PruebaService) { }

  ngOnInit(): void {

  }

  


  irSignUp()
  {
    this.router.navigate(['./sign-up']);
  }

  login()
  {
    
  }
  
  loginAtleta()
  {
      
    if(this.credenciales.usuario!=''&&this.credenciales.password!='')
    {
      if(this.usuarioRecibido!=this.credenciales.usuario)
      {
        if(this.passwordRecibida!=this.credenciales.password)
        {
          this.router.navigate(['./sign-up']);
        }
        alert("Acceso denegado! Usuario o contraseña incorrectos.");
      }
    }
    alert("Ingres sus credenciales por favor");
  }

  loginCoach()
  {
      
    if(this.credenciales.usuario!=''&&this.credenciales.password!='')
    {
      if(this.usuarioRecibido!=this.credenciales.usuario)
      {
        if(this.passwordRecibida!=this.credenciales.password)
        {
          this.router.navigate(['./sign-up']);
        }
      }
    }
  }
  
  
}
