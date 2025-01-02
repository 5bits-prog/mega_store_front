// Interfaz para producto, buena práctica
export interface Producto {
    id: number ,
    foto: string ;
    nombre: string;
    descripcion: string;
    precio: number;
    peso: number;
    stockMedio: number;
    stockMinimo: number;
    categoriaId: number;
    sucursales: number[];
    marcaId: number;
    talleId: number;
    colorId: number;
}
