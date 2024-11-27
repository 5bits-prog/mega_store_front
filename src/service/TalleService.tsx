import axios from "axios";
import { API_ROUTES } from "../Routes";
import { Talle } from "../contexts/TalleContext";

const api = axios.create({
    baseURL: API_ROUTES.BASE,
})

export async function getTalles(){
        const {data : respuesta} = await api.get(API_ROUTES.GET_TALLE); 
        return respuesta;
}

export async function newTalle(data :Talle) {
    const {data : respuesta} = await api.post(API_ROUTES.POST_TALLE, data); 
    return respuesta;   
}

export async function putTalle(data : Talle) {
    const {data : respuesta} = await api.put(API_ROUTES.PUT_TALLE, data); 
    return respuesta;
}

export const deleteTalle = async (id: string) => {
    const response = await api.delete(API_ROUTES.DELETE_TALLE(id)); 
    return response.data;
} 