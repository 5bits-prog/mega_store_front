// Contexto para gestionar productos
import React, { createContext, ReactNode, useContext, useState } from "react";
import { getProductos, newProducto, putProducto, deleteProducto, getProductoEspecifico, getHitorial } from "../service/ProductoService"; // Asegúrate de ajustar la ruta si es necesario
import { useNotification } from "./NotificacionContext";
import { Producto, ProductoGet } from "../pages/producto/interfazProducto";

interface ProductoContextType {
    fetchProductos: () => void;
    postProducto: (producto: FormData) => void;
    modificarProducto:(producto:Producto)=>void;
    eliminarProducto:(producto:ProductoGet)=>void;
    fetchProductoEspe:(id: string)=>void;
    obtenerHistorial:(id: string)=>void;
    productos: Producto[];
    loading: boolean;
    error: string | null;
    producto?: ProductoGet;
    historial:any[];
}



// Crear el contexto
const ProductosContext =  createContext<ProductoContextType | undefined>(undefined);

interface ProductoProviderProps {
    children: ReactNode;
}
// Proveedor del contexto

export const ProductoProvider: React.FC<ProductoProviderProps> = ({ children }) => {
    const [productos, setProductos] = useState<Producto[]>([]);
    const [producto, setProducto] = useState<ProductoGet>();
    const [loading, setLoading] = useState<boolean>(false);
    const [historial, setHistorial] = useState([])
    const [error, setError] = useState(null);
    const {mostrarMensaje} = useNotification()
//GET
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

//GET ESPECIFICO
    const fetchProductoEspe = async (id: string) => {

      setLoading(true);
      setError(null); // Limpiamos el error antes de la llamada
      try {
          const response = await getProductoEspecifico(id);
          setProducto(response.data); 
          console.log(producto)

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
  //PUT
  const modificarProducto = async (producto: Producto) => {
    try{
        setLoading(true)
        const response = await putProducto(producto) //post
        mostrarMensaje(`Prodcuto ${response.data.nombre} modificado`) //mensaje
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

  //DELETE
  const eliminarProducto = async (objeto: ProductoGet) => {
    try {
          const id = String(objeto.id)
          const respuesta = await deleteProducto(id);
          console.log(respuesta.data); 
          fetchProductos();
          mostrarMensaje('Producto eliminado con exito')
        } catch (error) {
          console.error('Error al eliminar la Sucursal:', error);
        }
    } 
    //GET HISTORIAL
    const obtenerHistorial = async (id: string) => {

      setLoading(true);
      setError(null); // Limpiamos el error antes de la llamada
      try {
          const response = await getHitorial(id);
          setHistorial(response.data); 

      } catch (err: any) {
          console.error(err);
      } finally {
          setLoading(false);
      }
    };

    return (
    <ProductosContext.Provider
      value={{
        productos,
        loading,
        error,
        producto,
        historial,
        fetchProductos,
        postProducto,
        modificarProducto,
        eliminarProducto,
        fetchProductoEspe,
        obtenerHistorial,
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



