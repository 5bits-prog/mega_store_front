import axios from "axios";
import { API_ROUTES } from "../Routes";
import { Marca } from "../contexts/MarcaContext";

const api = axios.create({
    baseURL: API_ROUTES.BASE,
})


export async function getMarcas() {
        const {data : respuesta} = await api.get(API_ROUTES.GET_MARCAS); 
        return respuesta;
}

export async function newMarca(marca: Marca) {
    const {data : respuesta} = await api.post(API_ROUTES.POST_MARCA, marca); 
    return respuesta;
    
}