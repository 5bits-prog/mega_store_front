import axios from "axios";
import { API_ROUTES } from "../Routes";
import { Categoria } from "../contexts/CategoriaContext";

const api = axios.create({
    baseURL: API_ROUTES.BASE,
})

export async function getCategorias(){
        const {data : respuesta} = await api.get(API_ROUTES.GET_CATEGORIA); 
        return respuesta;
}

export async function newCategoria(data :Categoria) {
    const {data : respuesta} = await api.post(API_ROUTES.POST_CATEGORIA, data); 
    return respuesta;   
}

export async function putCategoria(data : Categoria) {
    const {data : respuesta} = await api.put(API_ROUTES.PUT_CATEGORIA, data); 
    return respuesta;
}

export const deleteCategoria = async (id: string) => {
    const response = await api.delete(API_ROUTES.DELETE_CATEGORIA(id)); 
    return response.data;
} 