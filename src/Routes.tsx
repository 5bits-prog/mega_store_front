export const API_ROUTES = {
    //BASE
    BASE: "http://localhost:8080",
    //LOGIN
    LOGIN:"/auth/login",

    //MARCAS
    GET_MARCAS:'/products/marcas',
    POST_MARCA:'/products/marca',
    PUT_MARCA:'/products/marca',
    DELETE_MARCA: (id: string) => `/products/marca/${id}`,

    //SUCURSALES
    GET_SUCURSALES: '/products/sucursales',
    POST_SUCURSAL:'/products/sucursal',
    PUT_SUCURSAL:'/products/sucursal',
    DELETE_SUCURSAL: (id: string) => `/products/sucursal/${id}`,

    //COLOR
    GET_COLOR: '/products/colores',
    POST_COLOR:'/products/color',
    PUT_COLOR:'/products/color',
    DELETE_COLOR: (id: string) => `/products/color/${id}`,

     //TALLE
     GET_TALLE: '/products/talles',
     POST_TALLE:'/products/talle',
     PUT_TALLE:'/products/talle',
     DELETE_TALLE: (id: string) => `/products/talle/${id}`,

     //CATEGORIA
     GET_CATEGORIA: '/products/categorias',
     POST_CATEGORIA:'/products/categoria',
     PUT_CATEGORIA:'/products/categoria',
     DELETE_CATEGORIA: (id: string) => `/products/categoria/${id}`,

     //PRODUCTO
     POST_PRODUCTO :'/products/producto',
     GET_PRODUCTO:'/products/productos',
     PUT_PRODUCTO:'/products/producto',
     DELETE_PRODUCTO: (id: string) => `/products/producto/${id}`,
     GET_PRODUCTO_ESPECIFICO: (id: string) => `/products/producto/${id}`,
     HISTORIAL:(id: string) => `/products/historiales-precio/producto/${id}`,
     //ESTADISTICAS

     //PERFIL
     GET_DATOS_PERFIL:(id:string)=> `/auth/usuario/id/${id}`,
     PUT_DATOS_PERFIL: '/auth/usuario',
     
    //REGISTER
    POST_USUARIO:'/auth/usuario',
    REENVIAR_CODIGO:'/auth/usuario/reenviar-codigo',
    VERIFICAR:'/auth/usuario/verificar',

    //VENTA
    POST_VENTA:'/products/venta',
    
    //MOVIMIENTO DE STOCK
    MOVIMIENTO_STOCK: '/products/movimiento-stock',
    //El resto de URLS...

  };