import { Producto } from './interfazProducto';
import CardProducto from '../../components/cardProductoAdmin/listaProductos';
import CardUser from '../../components/cardProductoUser/CardUser';
import BarraBusqueda from '../../components/busqueda/barrabusqueda';
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
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useMovimientoStock } from '../../contexts/MovimientoStockContext';

interface CatalogoProductoProps {
    productos: Producto[]; // Usar la interfaz
}

const CatalogoProducto =()=> {
    const {productos,fetchProductos,productosFiltrados} = useProductos()
    const {loading} = useMovimientoStock()
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
    useEffect(() => {
        // Verifica la ruta
        const isHome = location.pathname === '/home';
        const isCatalogoProductos = location.pathname === '/catalogoProductos';
    
        
        // Si estás en home y productos está vacío, haz el fetch
        if (isHome && productos.length === 0) {
            console.log(productos)
            fetchProductos();
            console.log('home',isHome)
        }
    
        // Si estás en catalogoProductos, siempre haz el fetch
        if (isCatalogoProductos) {
            fetchProductos();
        }
    }, [location.pathname, productos.length, loading]);

    return (
        
        <div className={styles.container} style={{marginTop: isAdmin ? '75px' : '0'}}>
            {isProducto && 
            <button className={styles.button} onClick={() => modalProducto()}><AddCircleIcon /></button>}
                {isAdmin ? (
                        <div>
                        <h2>ADMINISTRACIÓN DE PRODUCTOS </h2>
                        {(productos || []).map((producto) => (
                        <CardProducto key={producto.id}  {...producto} />
                        ))}
                        </div>
                    ) : (
                        <div className={styles.listado}>
                        <h2>CATÁLOGO DE PRODUCTOS </h2>
                        <BarraBusqueda></BarraBusqueda>
                        {(productosFiltrados.length > 0 ? productosFiltrados : productos).map((producto) => (
                        <CardUser key={producto.id} {...producto} />
                    ))}
                        </div>
                    )}

            {/* Dialog para el formulario de Registrar Producto */}
            <Dialog open={isDialogOpen} onClose={toggleMenu} fullWidth maxWidth="sm">
                    <DialogContent>
                        <RegistrarProducto/>{/* Es el formulario para registrar un producto que se renderiza dentro del Dialog */}
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={modalProducto}>
                        <ZoomBoton />
                    </Button>
                    </DialogActions>
            </Dialog>
        </div>
    );
};
export default CatalogoProducto;