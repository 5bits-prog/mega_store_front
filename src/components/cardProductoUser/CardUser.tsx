import style from './CardUser.module.css'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useCarrito } from '../../contexts/CarritoContext.tsx';

type Props={
    id: number,
    nombre:string,
    descripcion:string,
    precio:number,
    foto: string,
}
const CardUser: React.FC<Props> = (props) => {
        const { agregarAlCarrito } = useCarrito(); // Obtén la función para agregar al carrito

        // Función para manejar el click en el carrito
        const handleAgregarAlCarrito = () => {
            agregarAlCarrito({
                id: props.id, // Genera un ID único para el producto
                nombre: props.nombre,
                precio: props.precio,
                cantidad: 1,
            });
        };
    return(
        <div className={style.contGeneral}>
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