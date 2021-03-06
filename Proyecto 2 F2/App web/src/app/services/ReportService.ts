import { Injectable } from '@angular/core';
import {AngularFireDatabase, AngularFireList, snapshotChanges} from '@angular/fire/database';
import {Router} from '@angular/router';
import {User} from '../models/user';
import {map} from 'rxjs/operators';
import {Activo} from '../models/Activo';
import { DatePipe } from '@angular/common';
import {Registro} from '../models/Registro';

@Injectable({
  providedIn: 'root'
})


// tslint:disable-next-line:class-name
export class reportService{
  // cambiosRealTime
  public cambiosRealTime: Array<Registro>;
  public cambiosTop10: Array<Registro>;

  public cambiosRealTimeMin: Array<Registro>;
  public cambiosTop10Min: Array<Registro>;
  // La variable activo contiene siempre el usuario activo, su pulsacion, oxigino y tiempo
  public activo: Activo = {  envio: '', fecha: '', user: ''};
  public datepipe: DatePipe = new DatePipe('en-US');
  constructor(private db: AngularFireDatabase) {
  }

  async sincronizar(): Promise<void> {
    await this.delay(1000);
  }
  // metodo que trae un arreglo de todos los registros del usuario, el reporte se basa en la fecha que se ingrese
  // tslint:disable-next-line:typedef
  get_AllDataUserMin(fecha: string, user: string, limite: number){
    if (fecha == null){
      this.datepipe = new DatePipe('en-US');
      const date = new Date();
      fecha = this.datepipe.transform(date, 'yyyy-MM-dd');
      console.log('entre:' + fecha);
    }
    if (user === null){
      user = this.activo.user;
    }
    return new Promise((resolve, reject) => {
      this.db.database.ref('reportes/' + user + '/' + fecha).limitToLast(limite).on('value', (snapshot) => {
        const temp = snapshot.val();
        this.cambiosRealTimeMin = [];
        resolve(snapshot.val());
        const StringJson = JSON.stringify(temp);
        const ObjectJson = JSON.parse(StringJson);
        for (const key in ObjectJson) {
          if (ObjectJson.hasOwnProperty(key)) {
            const nuevoRegistro = {} as Registro;
            nuevoRegistro.horaexacta = key;
            nuevoRegistro.cadena = ObjectJson[key];
            this.cambiosRealTimeMin.push(nuevoRegistro);
          }
        }
        console.log(this.cambiosRealTimeMin);
      });
    });
  }


  get_AllDataUser(fecha: string, user: string){
    console.log('xxxx:' + fecha);
    if (fecha == null){
      this.datepipe = new DatePipe('en-US');
      const date = new Date();
      fecha = this.datepipe.transform(date, 'yyyy-MM-dd');
      console.log('entre:' + fecha);
    }
    if (user === null){
      user = this.activo.user;
    }
    this.cambiosRealTime = [];
    return new Promise((resolve, reject) => {
      this.db.database.ref('reportes/' + user + '/' + fecha).on('value', (snapshot) => {
        const temp = snapshot.val();
        resolve(snapshot.val());
        const StringJson = JSON.stringify(temp);
        const ObjectJson = JSON.parse(StringJson);

        for (const key in ObjectJson) {
          if (ObjectJson.hasOwnProperty(key)) {
            const nuevoRegistro = {} as Registro;
            nuevoRegistro.horaexacta = key;
            nuevoRegistro.cadena = ObjectJson[key];
            this.cambiosRealTime.push(nuevoRegistro);
          }
        }
      });
    });
  }

  // Para llamar este metodo se debe primero invocar getAllUserData
  // tslint:disable-next-line:typedef
  getTop10User(){
      this.cambiosTop10 = this.cambiosRealTime.slice(Math.max(this.cambiosRealTime.length - 10, 0));
  }

  getTop10UserMin(){
    this.cambiosTop10 = this.cambiosRealTimeMin;
}

  //

  // Get_Cambio cambia todo el tiempo la variable activo de tipo Activo
  // tslint:disable-next-line:typedef
  async get_Cambio(insertar: boolean){
    return new Promise((resolve, reject) => {
      this.db.database.ref('activo/').on('value', (snapshot) => {
        const u = snapshot.val();
        resolve(snapshot.val());
        const StringJson = JSON.stringify(u);
        const ObjcetJson = JSON.parse(StringJson);
        if (ObjcetJson.fecha !== this.activo.fecha){
          this.activo = ObjcetJson;
          this.activo.user = this.activo.user.replace('"', '').replace('"', '').replace(' ', '');
          this.activo.envio = this.activo.envio.replace('"', '').replace('"', '').replace(' ', '');
          if(insertar)
          {
            this.insertOnReport(this.activo);
          }
          console.log(this.activo)
        }
        try {
          this.getTop10UserMin();
        }catch (e){
          console.log('Error sacando el top 10');
        }
      });
    });
  }

  async insertOnReport(newActivo: Activo): Promise<void>{
    this.datepipe = new DatePipe('en-US');
    const fecha = new Date();
    const dateString = this.datepipe.transform(fecha, 'yyyy-MM-dd');
    console.log('datastring' +  dateString);
    const timeString = this.datepipe.transform(fecha, 'hh-mm-ss');
    console.log('timestring' + timeString);
    await this.db.database.ref('reportes/' + newActivo.user + '/' + dateString + '/').update({
      [timeString]: newActivo.envio
    });
  }

  // tslint:disable-next-line:typedef
  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

}
