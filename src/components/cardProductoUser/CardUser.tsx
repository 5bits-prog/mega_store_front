import style from './CardUser.module.css'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useCarrito } from '../../contexts/CarritoContext.tsx';
import { ProductoGet } from '../../pages/producto/interfazProducto.tsx';
import { useNavigate } from "react-router-dom";

const CardUser: React.FC<ProductoGet> = (props) => {
        const { agregarAlCarrito } = useCarrito(); // Obtén la función para agregar al carrito
        const navigate = useNavigate()
        
        // Función para manejar el click en el carrito
        const handleAgregarAlCarrito = () => {
            agregarAlCarrito({
                id: props.id, // Genera un ID único para el producto
                nombre: props.nombre,
                precio: props.precio || 0,
                cantidad: 1,
            });
        };

        const openProducto = (producto: ProductoGet) => {
            navigate(`/appsRami/productoEspecifico/${producto.id}`);
        };

    return(
        <div className={style.contGeneral} onDoubleClick={() => openProducto(props)}>

            <img src={props.foto} alt="Remera Negra" className={style.imgProducto} />
            <div className={style.contTexto}>
                <h1>{props.nombre}</h1>
                <p>${props.precio}</p>   
                <span> {props.descripcion}</span>         
            </div>
            <div className={style.contCarrito}>
            <ShoppingCartIcon className={style.carritoIcon} onClick={handleAgregarAlCarrito}/>
            </div>
        </div>
    )
};
export default CardUser