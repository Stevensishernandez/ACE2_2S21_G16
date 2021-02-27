import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Location} from '@angular/common';
import { Rol,Sexo,User } from "../../../models/user";
import { PerfilElement, ELEMENT_PERFIL } from "../../../models/user";

import { userService } from "../../../services/UserService";
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  mostrar:boolean;
  mostrarTabla:boolean;

  usercontroller = new userService(this.db);

  displayedColumns: string[] = ['title', 'name'];
  dataSource = ELEMENT_PERFIL;
  
  usuario: string;

  constructor(private db: AngularFireDatabase, private router:Router,private _location: Location) { 
    this.mostrarTabla = false;
    this.mostrar =true;
  }

  ngOnInit(): void {

    this.usuario = sessionStorage.getItem('user');
    this.iniciar();
      
  }

  async iniciar()
  {
    if(this.usuario == null)
    {
      this.router.navigate(['']);
      return;
    }

      this.usercontroller.get_User(this.usuario);
      this.usercontroller.sincronizar();
      console.log(this.usercontroller.user)
    

      this.usercontroller.get_User(this.usuario);
      this.usercontroller.sincronizar();

      await this.delay(2000);

      console.log(this.usercontroller.user)
      
      this.usercontroller.get_User(this.usuario);
      this.usercontroller.sincronizar();

      this.dataSource[0].name = this.usercontroller.user.nombre;
      this.dataSource[1].name = this.usercontroller.user.apellido;
      this.dataSource[2].name = this.usercontroller.user.edad;
      this.dataSource[3].name = this.usercontroller.user.sexo;
      this.dataSource[4].name = this.usercontroller.user.peso;
      this.dataSource[5].name = this.usercontroller.user.estatura;

      this.mostrar = false;
      this.mostrarTabla = true;
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  cancel()
  {
    this._location.back();
  }
}
