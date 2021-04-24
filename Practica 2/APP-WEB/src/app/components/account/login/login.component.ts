import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


import { PruebaService } from "../../../services/Prueba/prueba.service";
import { userService } from "../../../services/UserService";
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  usercontroller = new userService(this.db);


  credenciales=
  {
    usuario: '',
    password:'',
  }

  
  constructor(private db: AngularFireDatabase, private router:Router, private pruebaService:PruebaService) { }

  ngOnInit(): void {
    this.usercontroller.sincronizar();
    this.usercontroller.get_Users();
  }

  


  irSignUp()
  {
    this.router.navigate(['./sign-up']);
  }

  login()
  {


    if(this.credenciales.usuario!=''&&this.credenciales.password!='')
    {
      
      this.usercontroller.get_User(this.credenciales.usuario);
      this.usercontroller.sincronizar();

      if(this.usercontroller.user != null)
      {
        if(this.usercontroller.user.password == this.credenciales.password)
        {
          sessionStorage.setItem('user',this.credenciales.usuario);
          sessionStorage.setItem('rol',this.usercontroller.user.rol);
          sessionStorage.setItem('peso',this.usercontroller.user.peso);

          this.router.navigate(['./atleta']);
          
          return;
        }
      }
      alert("Acceso denegado! Usuario o contraseña incorrectos.");
      return;
    }
    alert("Ingrese sus credenciales por favor");
  }

}
