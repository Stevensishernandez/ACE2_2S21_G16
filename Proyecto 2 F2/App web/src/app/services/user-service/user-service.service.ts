import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  usuarioActivo: string;
  usuarioActivoLabel: string;

  mostrar: boolean;

  constructor() {
    this.mostrar = false;
  }

  public mostrarAtleta(usuario: string)
  {
    this.usuarioActivoLabel = usuario + ' (modo supervisión)';
    this.usuarioActivo = usuario;
    this.mostrar = true;
  }

  public inspeccionarme(usuario: string)
  {
    this.usuarioActivoLabel = usuario;
    this.usuarioActivo = usuario;
    this.mostrar = false;
  }
}
