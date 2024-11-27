import axios from "axios";
import { API_ROUTES } from "../Routes";
import { Sucursal } from "../contexts/SucursalContext";

const api = axios.create({
    baseURL: API_ROUTES.BASE,
})

export async function getSucursales (){
        const {data : respuesta} = await api.get(API_ROUTES.GET_SUCURSALES, ); 
        return respuesta;
}

export async function newSucursal(sucursal: Sucursal) {
    const {data : respuesta} = await api.post(API_ROUTES.POST_SUCURSAL, sucursal); 
    return respuesta;
    
}

export async function putSucursal(sucursal: Sucursal) {
    const {data : respuesta} = await api.put(API_ROUTES.PUT_SUCURSAL, sucursal); 
    return respuesta;
}

export const deleteSucursal = async (id: string) => {
    const response = await api.delete(API_ROUTES.DELETE_SUCURSAL(id)); 
    return response.data;
}