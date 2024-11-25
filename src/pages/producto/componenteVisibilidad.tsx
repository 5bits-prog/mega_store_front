import { useState } from 'react';
import RegistrarProducto from './registrarProducto';
import CatalogoProducto from './catalogoProductos';
import { Producto } from './interfazProducto';


const MainComponent = () => {
    const [productos, setProductos] = useState<Producto[]>([]); // Estado para los productos

    // Función para agregar un nuevo producto
    const agregarProducto = (producto: Producto) => {
        setProductos([...productos, producto]); // Actualiza el array de productos
        console.log('Producto agregado:', producto);
        console.log('Productos actuales:', productos);
    };
    console.log('Renderizando MainComponent, productos:', productos);
    console.log(productos)
    return (
        <div>
            {/* Registrar Producto siempre visible */}
            <RegistrarProducto agregarProducto={agregarProducto} />

            {/* Muestra el catálogo si hay productos en el array */}
            {productos.length > 0 && (
                <CatalogoProducto productos={productos} />
            )}
        </div>
    );
};

export default MainComponent;

