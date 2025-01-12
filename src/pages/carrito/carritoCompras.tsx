//uso el context y la variable carrito (array de los productos)
//hacer componente de carrito (este), aplico context y de ahi trigo la variable carrito
//a esa variable la itero con un maps y ahi lo voy mostrando 
//en el userContext uso el metodo agregar a carrito y enviarle la informacion que pide del producto 
import { useCarrito } from '../../contexts/CarritoContext.tsx';
import style from './carritoCompras.module.css'
import BasicSelect from './Cantidad.tsx';
import { useEffect, useState } from 'react';

const CarritoCompras = () => {
    // Usar el contexto para acceder al carrito
    const { carrito, eliminarDeCarrito, total, productosTotales } = useCarrito();
    const [carritoVacio, setCarritoVacio] = useState(false)
    
    useEffect(()=>{
        if(carrito.length===0){
            setCarritoVacio(true)
        }
    },[carrito])

    const eliminar = (id:number) =>{
        eliminarDeCarrito(id)
    }

    const formatearPrecio = (precio: number): string => {
        return precio.toLocaleString('es-ES');
    };
    


    return (

        <div className={style.contGeneral}>
            <div className={style.contProductos}>
                <h2>TU CARRITO</h2>
                {carritoVacio ? 
                    <p>Carrito Vacio</p>
                    :
                        <>
                        {(carrito).map((producto) => (
                            
                            <div className={style.contProducto} key={producto.id}>
                                <div className={style.contImg}>
                                    <img src={producto.imagen} alt="foto producto" />
                                </div>
                                
                                <div className={style.contInfo}>
                                    <h1>{producto.nombre}</h1>
                                    <p>${formatearPrecio(producto.precio)}</p>
        
                                    <div className={style.contCantidad}>
                                        <BasicSelect cantidad={producto.cantidad} stockActual={10} idProducto={producto.id} ></BasicSelect>
                                    </div>
        
                                    <button className={style.botonDelete} onClick={()=> eliminar(producto.id)}>X</button>                       
                                </div>
                                
                            </div>
                        ))}
                        </>
                    }
                
                
            </div>
            <div className={style.contResumen}>
                <button className={style.botonPagar}>IR A PAGAR</button>
                
                <h1>RESUMEN DEL PEDIDO</h1>

                <div className={style.resumen}>
                    <h3>{productosTotales} Productos</h3>
                    <h2>Total ${formatearPrecio(total)}</h2>
                </div>
            </div>
            
        </div>
    );
};

export default CarritoCompras;