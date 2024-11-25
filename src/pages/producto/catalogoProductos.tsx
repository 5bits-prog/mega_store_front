import React from 'react';
import { Producto } from './interfazProducto';
import CardPrducto from '../../components/cardProducto/card';
import styles from './catalogoProductos.module.css'

interface CatalogoProductoProps {
    productos: Producto[]; // Usar la interfaz
}
const Productos = [
    {'nombre':'producto 1', 
        'descripcion':'producto lindo'
    },
    {'nombre':'producto 2', 
        'descripcion':'producto lindo'
    },
    {'nombre':'producto 3', 
        'descripcion':'producto lindo'
    },
    {'nombre':'producto 3', 
        'descripcion':'producto lindo'
    },
    {'nombre':'producto 3', 
        'descripcion':'producto lindo'
    },
    {'nombre':'producto 3', 
        'descripcion':'producto lindo'
    },
    {'nombre':'producto 3', 
        'descripcion':'producto lindo'
    },
    {'nombre':'producto 3', 
        'descripcion':'producto lindo'
    },
    {'nombre':'producto 3', 
        'descripcion':'producto lindo'
    },
    {'nombre':'producto 3', 
        'descripcion':'producto lindo'
    },
    {'nombre':'producto 3', 
        'descripcion':'producto lindo'
    },
    {'nombre':'producto 3', 
        'descripcion':'producto lindo'
    },
    {'nombre':'producto 3', 
        'descripcion':'producto lindo'
    },
]
const CatalogoProducto =()=> {
    return (
        <div className={styles.container}>
            <h2>Catálogo de Productos</h2>
            <div className={styles.listado}>
                {Productos.map((producto,idx)=>(
                    <CardPrducto key={idx} nombre={producto.nombre} descripcion={producto.descripcion}  ></CardPrducto>
                ))}
            </div>
        </div>
    );
};

export default CatalogoProducto;