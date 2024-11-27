export const API_ROUTES = {
    //BASE
    BASE: "http://localhost:8080",
    //LOGIN
    LOGIN:"/auth/login",

    //MARCAS
    GET_MARCAS:'/products/marcas',
    POST_MARCA:'/products/marca',
    PUT_MARCA:'/products/marca',
    DELETE_MARCA: (id: number) => `/products/marca/${id}`,
    //El resto de URLS...

  };