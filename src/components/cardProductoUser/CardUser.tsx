import style from './CardUser.module.css'
import img1 from '../cardProductoAdmin/imagenes/remeraNegra.png'
type Props={
    nombre:string,
    descripcion:string,
    precio:number,
}
const CardUser =(props:Props)=>{
    return(
        <div className={style.contGeneral}>
            <img src={img1} alt="producto1" className={style.imgProducto} />
            <div className={style.contTexto}>
                <p>${props.precio}</p>
                <h1>{props.nombre} <span>{props.descripcion}</span> </h1>                
            </div>
        </div>
    )
}
export default CardUser