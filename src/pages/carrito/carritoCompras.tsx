//uso el context y la variable carrito (array de los productos)
//hacer componente de carrito (este), aplico context y de ahi trigo la variable carrito
//a esa variable la itero con un maps y ahi lo voy mostrando 
//en el userContext uso el metodo agregar a carrito y enviarle la informacion que pide del producto 
import { useCarrito } from '../../contexts/CarritoContext.tsx';

const CarritoCompras: React.FC = () => {
    // Usar el contexto para acceder al carrito
    const { carrito } = useCarrito();

    // Renderizar el mensaje si el carrito está vacío
    if (carrito.length === 0) {
        return <p>El carrito está vacío</p>;
    }

    return (
        <div>
            <h2>Productos en tu carrito</h2>
            <ul>
                {carrito.map((producto) => (
                    <li key={producto.id}>
                        <p>Producto: <strong>{producto.nombre}</strong></p>
                        <p>Precio: ${producto.precio}</p>
                        <p>Cantidad: {producto.cantidad}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CarritoCompras;