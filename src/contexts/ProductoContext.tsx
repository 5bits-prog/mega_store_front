// Contexto para gestionar productos
import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { getProductos, newProducto, putProducto, deleteProducto, getProductoEspecifico, getHitorial, getProductosPaginacion } from "../service/ProductoService"; // Asegúrate de ajustar la ruta si es necesario
import { useNotification } from "./NotificacionContext";
import { Producto, ProductoGet } from "../pages/producto/interfazProducto";
import Notificaciones from "../components/notificaciones";

interface ProductoContextType {
    fetchProductos: (page: number, size: number, sort: string) => void;
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
    goToPage: (page: number) => void;
    totalPages:number;
    currentPage:number;
}



// Crear el contexto
const ProductosContext =  createContext<ProductoContextType | undefined>(undefined);

interface ProductoProviderProps {
    children: ReactNode;
}
// Proveedor del contexto

export const ProductoProvider: React.FC<ProductoProviderProps> = ({ children }) => {
    const [productos, setProductos] = useState<Producto[]>([]);
    const [totalPages, setTotalPages] = useState<number>(0); // Para almacenar el número total de páginas
    const [currentPage, setCurrentPage] = useState<number>(0); // Para llevar la página actual
    
    const [producto, setProducto] = useState<ProductoGet>();
    const [loading, setLoading] = useState<boolean>(false);
    const [historial, setHistorial] = useState([])
    const [error, setError] = useState(null);

    const {mostrarMensaje} = useNotification()
  
  
//GET
    const fetchProductos = async  (page = currentPage, size :number, sort = "id,asc") => {
      setLoading(true);
      try {
          const response = await getProductosPaginacion(page, size, sort);
          setProductos(response.data.content); 
          console.log('contex', response)
          setTotalPages(response.data.totalPages);  // Suponiendo que la API devuelve esta propiedad

          } catch (err: any) {
              
              console.error(err);
          } finally {
              setLoading(false);
          }
      };
  
  // Función para cambiar de página
  const goToPage = (page: number) => {
      setCurrentPage(page);
      fetchProductos(page, 12);
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
            Notificaciones.exito(`Prodcuto ${response.data.nombre} registrado`) //mensaje
            await fetchProductos(); //Recargamos las sucursales
        
            }catch(error:any){
                if (error) {
                    Notificaciones.error(error.response?.data.errors)
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
        Notificaciones.exito(`Producto ${response.data.nombre} modificado`) //mensaje
        await fetchProductos(); //Recargamos las sucursales
        }catch(error:any){
            if (error) {
                Notificaciones.error(error.response?.data.errors)
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
          console.log(objeto.id)
          const respuesta = await deleteProducto(id);
          if (respuesta.status !== 200) {
            throw new Error(`Error al eliminar el producto. Status: ${respuesta.status}`);
        }
          console.log("producto eliminado"); 
          fetchProductos();
          Notificaciones.exito('Producto eliminado con exito')
        } catch (error) {
          console.error('Error al eliminar el Producto:', error);
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
        goToPage,
        totalPages,
        currentPage,
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



