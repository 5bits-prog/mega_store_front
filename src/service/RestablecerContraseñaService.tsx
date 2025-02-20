import axios from "axios";
import Notificaciones from "../components/notificaciones";
import { API_ROUTES } from "../Routes";
import { Sucursal } from "../contexts/SucursalContext";

const api = axios.create({
    baseURL: API_ROUTES.BASE,
})

export async function Codigo (email:any){
        const {data : respuesta} = await api.post(API_ROUTES.CODIGO, email ); 
        return respuesta;
}

export async function VerificarCodigo(data:any) {
        const {data : respuesta} = await api.post(API_ROUTES.VERIFICAR_CODIGO, data); 
        return respuesta;
    }
    
export async function Restablecer(data:any) {
        const {data : respuesta} = await api.post(API_ROUTES.RESTABLECER, data); 
        return respuesta;
    }
    
