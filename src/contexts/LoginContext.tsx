import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { LoginData, LogionService } from "../service/LoginService";
import { useNotification } from "./NotificacionContext";
import { useNavigate } from "react-router-dom";
import { AxiosError } from 'axios';

// Define el tipo para el contexto
interface AuthContextType {
  user: string | null; // Puedes reemplazar 'string' con un tipo más específico si tienes un objeto de usuario
  login: (username: LoginData) => void;
  logout: () => void;
  rol:string | null;
  nombre:string | null;
  loading:boolean;
}

// Crea el contexto con un valor inicial vacío
const AuthContext = createContext<AuthContextType | undefined>(undefined);


// Define el provider
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<string | null>(null);
  const [rol, setRol] = useState('')
  const [nombre, setNombre]= useState('')
  const navigate = useNavigate();
  const {mostrarMensaje } = useNotification();
  const [loading, setLoading] = useState<boolean>(false);

  const login = async (username: LoginData) => {
    try{
        setLoading(true)
        const response = await LogionService(username) //le paso los datos del usuario al service
        setUser(response)
        setRol(response.data.rol_id)
        setNombre(response.data.usuario_nombre)
        localStorage.setItem('rol', response.data.rol_id);
        localStorage.setItem('nombre', response.data.usuario_nombre);
        // mostrarMensaje('Sesion iniciada ')
        navigate("/home");
    }catch(error: unknown){
        if (error instanceof AxiosError) {
            mostrarMensaje(error.response?.data.errors)
            console.log(error.response?.data.errors);  // Accediendo a 'errors'
          } else {
            console.error("Error desconocido", error);
          }
    }finally{
        setLoading(false)
    }
  };

  const logout = () => {
    setUser(null);
    setRol('')
    localStorage.setItem('rol', 'null');
    localStorage.removeItem('rol');  // Elimina el valor de 'rol' de localStorage
    localStorage.removeItem('nombre');
    navigate("/home");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, rol, nombre, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para usar el contexto de autenticación
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context;
};