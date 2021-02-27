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

  
  constructor(private db: AngularFireDatabase) {
  }
  
  

  getUpdate(usuario: any): any{
    this.reportcotroller.get_Cambio();
    // si la caja donde se ingresa la fecha esta null se asume que es la fecha de hoy.
    this.reportcotroller.get_AllDataUser(this.fecha, usuario);
    this.usuarioActual = JSON.stringify(this.reportcotroller.activo as Activo);
    this.listaRegistroUsuario = JSON.stringify(this.reportcotroller.cambiosRealTime);
    this.listaTop10Usuario = JSON.stringify(this.reportcotroller.cambiosTop10);
    return this.reportcotroller.cambiosTop10;
  }
  
  public getUsers():Promise<any>{
    return this.usersCollection.get().toPromise();
   }
  
}
