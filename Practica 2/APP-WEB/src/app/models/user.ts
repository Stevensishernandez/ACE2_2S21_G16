export interface User{
  apellido?: string;
  edad?: string;
  estatura?: string;
  nombre?: string;
  password?: string;
  peso?: string;
  rol?: string;
  sexo?: string;
  key?: string;
}

export interface UserBasicList {
  usuario: string;
}

export interface Sexo {
    value: string;
    viewValue: string;
  }

export interface Rol {
    value: string;
    viewValue: string;
  }

export interface PerfilElement {
  title:string,
  name:string
}

export let ELEMENT_PERFIL: PerfilElement[] = [
    {title: 'Usuario', name: ''},
    {title: 'Peso', name: ''},
    {title: 'Unidad de medida', name: ''},
  ];
  