import { Injectable } from '@angular/core';
import { AngularFirestoreCollection } from '@angular/fire/firestore';

import { User } from "../../models/user";


import {reportService} from '../ReportService';
import {AngularFireDatabase} from '@angular/fire/database';
import {Activo} from '../../models/Activo';
import {Registro} from '../../models/Registro';

@Injectable({
  providedIn: 'root'
})
export class PruebaService {


  users:any [] = [];
  private usersCollection:AngularFirestoreCollection<User>;



  usuarioActual: any;
  fecha: string;
  reportcotroller = new reportService(this.db);
  listaRegistroUsuario: any;
  listaTop10Usuario: any;

  public prueba;

  constructor(private db: AngularFireDatabase) {
  }
  
  public setPrueba(prueba)
  {
    this.prueba = prueba;
    //console.log('prueba:',prueba)
  }
  
}
