export interface PeriodicElement {
    fechaHora: string;
    dato: number;
}

export interface PeriodicElementDistancia {
    fechaHora: string;
    numEntrenamiento:number;
    numRepeticion:number;
    dato: number;
}


export interface PeriodicElementSupervisar {
    fechaHora: string;
    oxigeno: number;
    ritmo: number;
    temperatura: number
}


  
export const ELEMENT_OXIGENO: PeriodicElement[] = [
        {fechaHora: '23-02-2021', dato: 20},
    ];

export const ELEMENT_RITMO: PeriodicElement[] = [
    {fechaHora: '23-02-2021', dato: 20},
];

export const ELEMENT_TEMPERATURA: PeriodicElement[] = [
    {fechaHora: '23-02-2021', dato: 20},
];

export let ELEMENT_SUPERVISAR: PeriodicElementSupervisar[] = [
];


export const simboloOxigeno = ' %';
export const simboloTemperatura = ' °C';
export const simboloRitmo = ' bpm';
export const simboloVelocidad = ' m/s';
export const simboloDistancia = ' m';
export const simboloTiemo = ' s';



//Reportes..------------------------------
export interface PeriodicElementEnt {
    fechaHora: string;
    repeticiones:number;
    entrenamiento:any;
    aprobacion:string;
}



export interface PeriodicElementSem {
    fechaHora: string;
    promedio:number;
    maximo:number;
    minimo: number;
}

export interface PeriodicElementVelocidad {
    fechaHora: any;
    entrenamiento:any;
    repeticion:any;
    promedio:number;
}

export const ELEMENT_ENTRENAMIENTOS: PeriodicElementEnt[] = [
    {fechaHora: '23-02-2021',entrenamiento:1,repeticiones: 2, aprobacion: '✔'},
    {fechaHora: '23-02-2021',entrenamiento:2,repeticiones: 4, aprobacion: '✘'},
];

export const ELEMENT_REPETICIONES: PeriodicElementSem[] = [
    {fechaHora: '23-02-2021',promedio: 2, maximo: 3,minimo:1},
];

export const ELEMENT_VELOCIDAD: PeriodicElementVelocidad[] = [
    {fechaHora: '23-02-2021', entrenamiento:1,repeticion:1,promedio:1},
];

export const ELEMENT_DISTANCIA: PeriodicElementDistancia[] = [
    {fechaHora: '23-02-2021',numEntrenamiento:1,numRepeticion:1, dato:1},
];

