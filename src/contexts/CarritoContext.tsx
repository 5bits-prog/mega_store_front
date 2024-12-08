import React, { createContext, useContext, useState } from 'react';

//producto que se va a añadir en el carrito
type Producto = {
    id?: number;
    nombre: string;
    precio: number;
    cantidad: number;
};

const CarritoContext = createContext<{
    carrito: Producto[];
    agregarAlCarrito: (producto: Producto) => void;
} | null>(null);

//Proveedor del contexto
export const CarritoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [carrito, setCarrito] = useState<Producto[]>([]);

    //Función para agregar un producto al carrito
    const agregarAlCarrito = (producto: Producto) => {
        setCarrito((prev) => {
            const existe = prev.find((item) => item.id === producto.id);
            if (existe) {
                // Si ya está en el carrito, incrementa la cantidad
                return prev.map((item) =>
                    item.id === producto.id
                        ? { ...item, cantidad: item.cantidad + 1 }
                        : item
                );
            }
            // Si no está, agrégalo
            return [...prev, { ...producto, cantidad: 1 }];
        });
    };

    return (
        <CarritoContext.Provider value={{ carrito, agregarAlCarrito }}>
            {children}
        </CarritoContext.Provider>
    );
};

// Hook para usar el carrito desde cualquier componente
export const useCarrito = () => {
    const context = useContext(CarritoContext);
    if (!context) {
        throw new Error('useCarrito debe usarse dentro de un CarritoProvider');
    }
    return context;
};
