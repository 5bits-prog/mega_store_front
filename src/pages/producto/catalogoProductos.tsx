import React from 'react';
import { Producto } from './interfazProducto';
import CardPrducto from '../../components/cardProductoAdmin/card';
import CardUser from '../../components/cardProductoUser/CardUser';
import styles from './catalogoProductos.module.css'
import { useLocation } from 'react-router-dom';

interface CatalogoProductoProps {
    productos: Producto[]; // Usar la interfaz
}
const Productos = [
    {'nombre':'producto 1', 
        'descripcion':'producto lindo',
        'precio':1200
    },
    {'nombre':'producto 2', 
        'descripcion':'producto lindo',
        'precio':1200
    },
    {'nombre':'producto 3', 
        'descripcion':'producto lindo',
        'precio':1200
    },
    {'nombre':'producto 3', 
        'descripcion':'producto lindo',
        'precio':1200
    },
    {'nombre':'producto 3', 
        'descripcion':'producto lindo',
        'precio':1200
    },
    {'nombre':'producto 3', 
        'descripcion':'producto lindo',
        'precio':1200
    },
    {'nombre':'producto 3', 
        'descripcion':'producto lindo',
        'precio':1200
    },
    {'nombre':'producto 3', 
        'descripcion':'producto lindo',
        'precio':1200
    },
    {'nombre':'producto 3', 
        'descripcion':'producto lindo',
        'precio':1200
    },
    {'nombre':'producto 3', 
        'descripcion':'producto lindo',
        'precio':1200
    },
    {'nombre':'producto 3', 
        'descripcion':'producto lindo',
        'precio':1200
    },
    {'nombre':'producto 3', 
        'descripcion':'producto lindo',
        'precio':1200
    },
]



const CatalogoProducto =()=> {
    const location = useLocation();
    const isHome = location.pathname === '/home';

    return (
        <div className={styles.container}>
            <h2>Catálogo de Productos</h2>
            <div className={styles.listado}>
                {Productos.map((producto, idx) => (
                    isHome ? (
                        <CardUser key={idx} nombre={producto.nombre} descripcion={producto.descripcion} precio={producto.precio} />
                    ) : (
                        <CardPrducto key={idx} nombre={producto.nombre} descripcion={producto.descripcion} />
                    )
                    ))}
            </div>
        </div>
    );
};

export default CatalogoProducto;