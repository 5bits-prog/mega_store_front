import { Producto } from './interfazProducto';
import CardPrducto from '../../components/cardProductoAdmin/card';
import CardUser from '../../components/cardProductoUser/CardUser';
import styles from './catalogoProductos.module.css'
import { useLocation } from 'react-router-dom';

interface CatalogoProductoProps {
    productos: Producto[]; // Usar la interfaz
}
const Productos = [
    {'nombre':'Remera Negra 1', 
        'descripcion':'Tela liviana',
        'precio':12000
    },
    {'nombre':'Remera Negra 2', 
        'descripcion':'Tela liviana',
        'precio':12000
    },
    {'nombre':'Remera Negra 3', 
        'descripcion':'Tela liviana',
        'precio':12000
    },
    {'nombre':'producto 3', 
        'descripcion':'producto lindo',
        'precio':12000
    },
    {'nombre':'producto 3', 
        'descripcion':'producto lindo',
        'precio':12000
    },
    {'nombre':'producto 3', 
        'descripcion':'producto lindo',
        'precio':12000
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
    const isAdmin = location.pathname === '/catalogoProductos';

    return (
        <div className={styles.container}>
            <h2>| Catálogo de Productos |</h2>
            <div className={styles.listado}>
                {Productos.map((producto, idx) => (

                    isAdmin ? (
                        <CardPrducto key={idx} nombre={producto.nombre} descripcion={producto.descripcion} />
                    ) : (
                        <CardUser key={idx} nombre={producto.nombre} descripcion={producto.descripcion} precio={producto.precio} />
                    )
                    ))}
            </div>
        </div>
    );
};

export default CatalogoProducto;