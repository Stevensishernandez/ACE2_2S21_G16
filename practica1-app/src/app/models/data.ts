export interface PeriodicElement {
    fechaHora: string;
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

export const ELEMENT_SUPERVISAR: PeriodicElementSupervisar[] = [
    {fechaHora: '23-02-2021', oxigeno: 20, ritmo: 20, temperatura: 20},
];

export const simboloOxigeno = ' %';
export const simboloTemperatura = ' °';
export const simboloRitmo = 'latidos/segundo';
