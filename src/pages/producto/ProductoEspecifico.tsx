import { ProductoGet } from "./interfazProducto"
import { useProductos } from "../../contexts/ProductoContext"
import { useEffect } from "react"
import { useParams } from "react-router-dom";
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import style from './ProductoEspecifico.module.css'


const ProductoEspecifico = () => {
    const { id } = useParams();
    const {fetchProductoEspe, producto, loading}= useProductos()
    console.log(producto)
    useEffect(()=>{
        fetchProductoEspe(String(id))
    },[])

  return (
    <div className={style.contGeneral}>
        <div className={style.contIzq}>

          <div className={style.contImg}>
            {!loading ? 
                <img src={producto?.foto} alt="foto" /> 
                :
                <Stack spacing={2} direction="row" alignItems="center">
                  <CircularProgress size="3rem" />
                </Stack>
            }
            
          </div>
        </div>

        <div className={style.contDer}>

            <div className={style.contTitulo}>
                <h2>
                  NIKE
                  {/* {producto?.marcaId} */}
                  </h2> 

                <h1>{producto?.nombre}</h1> 
                <h3> ${producto?.precio}</h3>
            </div>
            <hr />
            <div className={style.contInfo}>
              <h2>STOCK</h2>
              <h3> {producto?.stockActual === 0 ? 'Sin stock' : producto?.stockActual} </h3>

              <h2>TALLE</h2>
              <h3>{producto?.talleId}</h3> 

              <h2>COLOR</h2>
              <h3> {producto?.colorId}</h3> 

              <h2> DESCRIPCIÓN</h2>
              <h3>{producto?.descripcion}</h3> 

            </div>

        </div>
    </div>
  )
}

export default ProductoEspecifico

