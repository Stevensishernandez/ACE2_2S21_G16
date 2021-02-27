import { Component, OnInit, ViewChild } from '@angular/core';
import {Location} from '@angular/common';
import { PeriodicElementSupervisar,ELEMENT_SUPERVISAR } from "../../../models/data";
import { User,ELEMENT_PERFIL } from "../../../models/user";


import { AngularFireDatabase } from '@angular/fire/database';

import {userService} from '../../../services/UserService';

@Component({
  selector: 'app-supervisar-atleta',
  templateUrl: './supervisar-atleta.component.html',
  styleUrls: ['./supervisar-atleta.component.css']
})
export class SupervisarAtletaComponent implements OnInit {

  mostrar: boolean;
  mostrarTabla: boolean;
  usercontroller = new userService(this.db);

 
  //Elementos para tabla de datos de perfil
  displayedColumnsPerfil: string[] = ['title', 'name'];

  dataSourcePerfil = ELEMENT_PERFIL;

  usuarioSeleccionado;

  usuario=
  {
    nombres:'',
    apellidos:'',
    edad:'',
    sexo: '',
    peso: '',
    estatura: '',
  }

  constructor(private db: AngularFireDatabase,private _location: Location) { 
    this.usuarioSeleccionado = sessionStorage.getItem('userSelect');
    this.mostrarTabla = false;
    this.mostrar = true;
  }



  ngOnInit(): void {
    this.iniciar();
  }

  async iniciar()
  {
      for(let dato of this.dataSourcePerfil)
      {
        dato.name = '';
      }

      this.usercontroller.get_User(this.usuarioSeleccionado);
      this.usercontroller.sincronizar();
      console.log(this.usercontroller.user)
    

      this.usercontroller.get_User(this.usuarioSeleccionado);
      this.usercontroller.sincronizar();
      
      await this.delay(2000);
     
    
      console.log(this.usercontroller.user)
      
      this.usercontroller.get_User(this.usuarioSeleccionado);
      this.usercontroller.sincronizar();

      this.dataSourcePerfil[0].name = this.usercontroller.user.nombre;
      this.dataSourcePerfil[1].name = this.usercontroller.user.apellido;
      this.dataSourcePerfil[2].name = this.usercontroller.user.edad;
      this.dataSourcePerfil[3].name = this.usercontroller.user.sexo;
      this.dataSourcePerfil[4].name = this.usercontroller.user.peso;
      this.dataSourcePerfil[5].name = this.usercontroller.user.estatura;

      this.mostrar = false;
      this.mostrarTabla = true;
    }

    actualizarHistorial()
    {
      alert("hola");
    }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }


  
  
  cancel()
  {
    sessionStorage.removeItem('userSelect');
    this._location.back();
  }
}
