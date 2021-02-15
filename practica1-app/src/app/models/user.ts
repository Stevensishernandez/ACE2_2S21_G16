export interface User{

    nombres:string;
    apellidos:string;
    edad: number;
    sexo: number;
    peso: number;
    estatura: number;

    usuario: string;
    password: string;

}

export interface UserBasicList {
  usuario: string;
  nombres: string;
}

export interface Sexo {
    value: number;
    viewValue: string;
  }

export interface Rol {
    value: number;
    viewValue: string;
  }

export interface PerfilElement {
  title:string,
  name:string
}

export const ELEMENT_PERFIL: PerfilElement[] = [
    {title: 'Nombres', name: ''},
    {title: 'Apellidos', name: ''},
    {title: 'Edad', name: ''},
    {title: 'Sexo', name: ''},
    {title: 'Peso', name: ''},
    {title: 'Estatura', name: ''},
  ];
  