import { Producto } from './interfazProducto';
import CardPrducto from '../../components/cardProductoAdmin/card';
import CardUser from '../../components/cardProductoUser/CardUser';
import styles from './catalogoProductos.module.css'
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import RegistrarProducto from '../../pages/producto/registrarProducto'; 
import Dialog from '@mui/material/Dialog'; // Dialog (se usa como un modal)
import DialogContent from '@mui/material/DialogContent'; // Contenido del modal de Material UI
import DialogActions from '@mui/material/DialogActions'; // Acciones como botones en el modal de Material UI
import Button from '@mui/material/Button'; // Botón de Material UI

import ZoomBoton from '../../components/transitions/buttomzoom';  

interface CatalogoProductoProps {
    productos: Producto[]; // Usar la interfaz
}

const Productos = [
    {
        id: 1,
        nombre: 'Remera Negra 1',
        descripcion: 'Tela liviana',
        precio: 12000,
    },
    {
        id: 2,
        nombre: 'Remera Negra 2',
        descripcion: 'Tela liviana',
        precio: 12000,
    },
    {
        id: 3,
        nombre: 'Remera Negra 3',
        descripcion: 'Tela liviana',
        precio: 12000,
    },
    {
        id: 4,
        nombre: 'producto 3',
        descripcion: 'producto lindo',
        precio: 12000,
    },
    {
        id: 5,
        nombre: 'producto 3',
        descripcion: 'producto lindo',
        precio: 12000,
    },
    {
        id: 6,
        nombre: 'producto 3',
        descripcion: 'producto lindo',
        precio: 12000,
    },
    {
        id: 7,
        nombre: 'producto 3',
        descripcion: 'producto lindo',
        precio: 1200,
    },
    {
        id: 8,
        nombre: 'producto 3',
        descripcion: 'producto lindo',
        precio: 1200,
    },
    {
        id: 9,
        nombre: 'producto 3',
        descripcion: 'producto lindo',
        precio: 1200,
    },
    {
        id: 10,
        nombre: 'producto 3',
        descripcion: 'producto lindo',
        precio: 1200,
    },
]


const CatalogoProducto =()=> {
    const location = useLocation();
    const isAdmin = location.pathname === '/catalogoProductos';
    const isProducto = location.pathname === '/catalogoProductos';

    const [isDialogOpen, setDialogOpen] = useState(false);
    const [isMenuOpen, setMenuOpen] = useState(false);

    const modalProducto=()=>{
        setDialogOpen(!isDialogOpen)
    }
    // Función para ir cambiando el estado del menú
    const toggleMenu = () => { //Función para abrir el desplegable
        setMenuOpen(!isMenuOpen);
    };

    return (
        <div className={styles.container}>
            <h2>| Catálogo de Productos |</h2>

            {isProducto && 
            <div className={styles.contBotonProductoNew}> 
                <Button onClick={() => modalProducto()}
                sx={{
                    color: 'BLACK',  // Color del texto del botón
                    transition: 'background-color 0.3s',
                    display: 'block',  // Hace que el botón ocupe toda la línea disponible
                    width: '100%',
                    '&:hover': {
                // Color al pasar el ratón sobre el botón
                        color: 'BLACK'  // Cambia el color del texto cuando el ratón está sobre el botón
                    }
                    }}>
                    Nuevo
                </Button>
            </div>}
            

            <div className={styles.listado}>
                {Productos.map((producto) => (

                    isAdmin ? (
                        <CardPrducto key={producto.id} nombre={producto.nombre} descripcion={producto.descripcion} />
                    ) : (
                        <CardUser key={producto.id} nombre={producto.nombre} descripcion={producto.descripcion} precio={producto.precio} id={producto.id} />
                    )
                    ))}
            </div>

            {/* Dialog para el formulario de Registrar Producto */}
            <Dialog open={isDialogOpen} onClose={toggleMenu} fullWidth maxWidth="sm">
                    <DialogContent >
                        <RegistrarProducto/>{/* Es el formulario para registrar un producto que se renderiza dentro del Dialog */}
                    </DialogContent>
                    <DialogActions >
                    <Button onClick={modalProducto}>

                        <ZoomBoton />
                    </Button>
                    </DialogActions>
            </Dialog>
        </div>
    );
};

export default CatalogoProducto;