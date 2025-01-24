import axios from "axios";
import { API_ROUTES } from "../Routes";
import { Perfil } from "../contexts/PerfilContext";

const api = axios.create({
    baseURL: API_ROUTES.BASE,
})

export async function getDatosPerfil(id: string) {
        const {data : respuesta} = await api.get(API_ROUTES.GET_DATOS_PERFIL(id)); 
        return respuesta;
}

export async function updateDatosPerfil(datosPerfil: Perfil) {
    const { data: respuesta } = await api.put(API_ROUTES.PUT_DATOS_PERFIL, datosPerfil); 
    return respuesta;
  }
  