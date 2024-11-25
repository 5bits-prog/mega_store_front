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
    stockActual: string | number;
    stockMedio: string |  number;
    stockMinimo:  string | number;
    foto: string; 
}
