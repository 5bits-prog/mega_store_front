import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { getMarcas, newMarca } from '../service/MarcaService'; // Importamos el servicio
import { useNotification } from "./NotificacionContext";

export interface Marca {
  id?: string;
  nombre: string;
  fechaDeEliminacion?: string;       
}

interface MarcaContextType {
    fetchMarcas: () => void;
    postMarca: (marca:Marca) => void;
    marcas: Marca[];
    loading: boolean;
    error: string | null;
}

const MarcaContext = createContext<MarcaContextType | undefined>(undefined);

interface MarcaProviderProps {
  children: ReactNode;
}

export const MarcaProvider: React.FC<MarcaProviderProps> = ({ children }) => {
  const [marcas, setMarcas] = useState<Marca[]>([]); // Estado para almacenar las marcas
  const [loading, setLoading] = useState<boolean>(false); // Estado de carga
  const [error, setError] = useState<string | null>(null); // Estado de error
  const {mostrarMensaje}= useNotification()

  //GET
  const fetchMarcas = async () => {
    setLoading(true);
    setError(null); // Limpiamos el error antes de la llamada
    try {
      const response = await getMarcas();
      setMarcas(response.data); 

    } catch (err: any) {
      setError('Error al cargar las marcas'); 
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMarcas(); // Cargamos las marcas cuando el componente se monta
  }, []);

  //POST
  const postMarca= async(marca:Marca)=>{
    try{
        setLoading(true)
        const response = await newMarca(marca) //post
        mostrarMensaje(`Marca ${response.data.nombre} registrada`) //mensaje
        await fetchMarcas(); //Recargamos las marcas
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
    <MarcaContext.Provider value={{ marcas, fetchMarcas, loading, error, postMarca }}>
      {children}
    </MarcaContext.Provider>
  );
};

// Hook para usar el contexto de marcas en otros componentes
export const useMarca = () => {
  const context = React.useContext(MarcaContext);
  if (!context) {
    throw new Error("useMarca debe ser usado dentro de un MarcaProvider");
  }
  return context;
};