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
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('Token no disponible. El usuario no está autenticado.');
    }

    const { data: respuesta } = await api.post(
        API_ROUTES.POST_MARCA,
        marca,
        {
            headers: {
                Authorization: `Token ${token}`,
            },
        }
    );

    return respuesta;
}


export async function putMarca(marca: Marca) {
   
    const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('Token no disponible. El usuario no está autenticado.');
        }
        
        const {data : respuesta} = await api.put(API_ROUTES.POST_MARCA, marca ,{
            headers: {
                Authorization: `Token ${token}`,
            },  
        }); 
        return respuesta;
    }
    

export const deleteMarca = async (id: string) => {
    const response = await api.delete(API_ROUTES.DELETE_MARCA(id)); 
    return response.data;
}