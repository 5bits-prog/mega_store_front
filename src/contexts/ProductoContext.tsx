// Contexto para gestionar productos
import React, { createContext, ReactNode, useContext, useState } from "react";
import { getProductos, newProducto } from "../service/ProductoService"; // Asegúrate de ajustar la ruta si es necesario
import { useNotification } from "./NotificacionContext";
import { Producto } from "../pages/producto/interfazProducto";

interface ProductoContextType {
    fetchProductos: () => void;
    postProducto: (producto: FormData) => void;
    productos: Producto[];
    loading: boolean;
    error: string | null;
}



// Crear el contexto
const ProductosContext =  createContext<ProductoContextType | undefined>(undefined);

interface ProductoProviderProps {
    children: ReactNode;
}
// Proveedor del contexto

export const ProductoProvider: React.FC<ProductoProviderProps> = ({ children }) => {
    const [productos, setProductos] = useState<Producto[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState(null);
    const {mostrarMensaje} = useNotification()

    const fetchProductos = async () => {
        setLoading(true);
        setError(null); // Limpiamos el error antes de la llamada
        try {
            const response = await getProductos();
            setProductos(response.data); 
             
        } catch (err: any) {
             console.error(err);
        } finally {
             setLoading(false);
        }
    };

//POST
    const postProducto = async (producto: FormData) => {
        try{
            setLoading(true)
            const response = await newProducto(producto) //post
            mostrarMensaje(`Prodcuto ${response.data.nombre} registrada`) //mensaje
            await fetchProductos(); //Recargamos las sucursales
        
            }catch(error:any){
                if (error) {
                    mostrarMensaje(error.response?.data.errors)
                    console.log(error.response?.data.errors);  // Accediendo a 'errors'
                  } else {
                    console.error("Error desconocido", error);
                  }
            }finally{
                setLoading(false)
            }
          }

    return (
    <ProductosContext.Provider
      value={{
        productos,
        loading,
        error,
        fetchProductos,
        postProducto,
      }}
    >
      {children}
    </ProductosContext.Provider>
  );
};

// Hook personalizado para usar el contexto
export const useProductos = (): ProductoContextType => {
  const context = useContext(ProductosContext);
  if (!context) {
    throw new Error("useProductos debe usarse dentro de un ProductoProvider");
  }
  return context;
};



