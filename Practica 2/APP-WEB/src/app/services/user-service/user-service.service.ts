import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  usuarioActivo: string;
  usuarioActivoLabel: string;
  pesoLabel: string = '0 Kg';
  public peso: number;
  mostrar: boolean;

  public cronometroHabilitado:boolean;

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

  public mostrarPeso(peso:number, pesoLable: string)
  {
    this.peso = peso;
    this.pesoLabel = pesoLable;
  }
}
