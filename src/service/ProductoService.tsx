import axios from "axios";
import { API_ROUTES } from "../Routes";




const api = axios.create({
    baseURL: API_ROUTES.BASE,
})



export async function getProductos() {
        const {data : respuesta} = await api.get(API_ROUTES.GET_PRODUCTO); 
        return respuesta;
}

export async function newProducto(producto : FormData) {

    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('Token no disponible. El usuario no está autenticado.');
    }
    console.log('tokenn',token)
    const { data: respuesta } = await api.post(API_ROUTES.POST_PRODUCTO, producto, {
        headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Token ${token}`,
        },
    });
    return respuesta;
    
}

// export async function putMarca() {
//     const {data : respuesta} = await api.put(API_ROUTES.POST_MARCA, marca); 
//     return respuesta;
// }

// export const deleteMarca = async (id: string) => {
//     const response = await api.delete(API_ROUTES.DELETE_MARCA(id)); 
//     return response.data;
// }