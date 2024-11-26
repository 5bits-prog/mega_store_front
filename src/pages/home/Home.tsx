import style from './Home.module.css'
import CatalogoProducto from '../producto/catalogoProductos';

const Home = () =>{
    return(
        <div className={style.contGeneral}>
            <div className={style.imgHome}>ACTIVO</div>
            <CatalogoProducto></CatalogoProducto>
        
        </div>
    )
}
export default Home;