// Interfaz para producto, buena práctica
export interface Producto {
    nombre: string;
    descripcion: string;
    precio: number;
    peso: number;
    categoria: string;
    sucursal: string;
    marca: string;
    talle: string;
    color: string;
    stockActual: number;
    stockMedio: number;
    stockMinimo: number;
    foto: string; 
}
