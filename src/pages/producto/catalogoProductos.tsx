import { Producto } from './interfazProducto';
import CardPrducto from '../../components/cardProductoAdmin/card';
import CardUser from '../../components/cardProductoUser/CardUser';
import styles from './catalogoProductos.module.css'
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import RegistrarProducto from '../../pages/producto/registrarProducto'; 
import Dialog from '@mui/material/Dialog'; // Dialog (se usa como un modal)
import DialogContent from '@mui/material/DialogContent'; // Contenido del modal de Material UI
import DialogActions from '@mui/material/DialogActions'; // Acciones como botones en el modal de Material UI
import Button from '@mui/material/Button'; // Botón de Material UI
import ZoomBoton from '../../components/transitions/buttomzoom';  
import { useProductos } from '../../contexts/ProductoContext';

interface CatalogoProductoProps {
    productos: Producto[]; // Usar la interfaz
}



const CatalogoProducto =()=> {
    const {productos,fetchProductos} = useProductos()
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
    useEffect (()=>{
        fetchProductos()
    },[])

    return (
        <div className={styles.container} style={{marginTop: isAdmin ? '75px' : '0'}}>
            <h2>CÁTALOGO DE PRODUCTOS </h2>

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
                {(productos || []).map((producto) => (

                    isAdmin ? (
                        <CardPrducto key={producto.id}  {...producto} />
                    ) : (
                        <CardUser key={producto.id}  {...producto}/>
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