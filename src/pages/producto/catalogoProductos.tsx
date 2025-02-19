import { Producto } from './interfazProducto';
import CardProducto from '../../components/cardProductoAdmin/listaProductos';
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
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useMovimientoStock } from '../../contexts/MovimientoStockContext';
import img from '../home/imagenes/fotoCargaProductos.webp'



interface CatalogoProductoProps {
    productos: Producto[]; // Usar la interfaz
}



const CatalogoProducto =()=> {
    const {productos,fetchProductos, goToPage, totalPages, currentPage} = useProductos()
    const {loading} = useMovimientoStock()
    const location = useLocation();
    const isAdmin = location.pathname === '/catalogoProductos';
    const isProducto = location.pathname === '/catalogoProductos';

    const [isDialogOpen, setDialogOpen] = useState(false);
    const [isMenuOpen, setMenuOpen] = useState(false);
    // const [currentPage, setCurrentPage] = useState(0); 

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
            fetchProductos(currentPage, 12, "id,asc"); // Paginación por defecto con 5 productos por página
        }
    
        // Si estás en catalogoProductos, siempre haz el fetch
        if (isCatalogoProductos) {
            fetchProductos(currentPage, 12, "id,asc");
        }
    }, [location.pathname, productos.length, loading]);
    

    // Función para manejar el cambio de página
    const handlePageChange = (newPage: number) => {
        goToPage(newPage); // Usamos la función goToPage para navegar a la nueva página
    }

    return (
        
        <div className={styles.container} style={{marginTop: isAdmin ? '75px' : '0px'}}>

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
                            <div className={styles.fondo}>
                                <h1>CATÁLOGO DE PRODUCTOS </h1>
                            </div>
                            
                            {(productos || []).map((producto) => (
                            <CardUser key={producto.id}  {...producto}/>
                            ))}
                        </div>
                    )}
            
            {/* Paginación */}
            {totalPages > 1 && (
                <div className={styles.pagination}>
                    <button 
                        disabled={currentPage === 0} 
                        onClick={() => handlePageChange(currentPage - 1)}>
                        Anterior
                    </button>
                    <span>Página {currentPage + 1} de {totalPages}</span>
                    <button 
                        disabled={currentPage === totalPages - 1} 
                        onClick={() => handlePageChange(currentPage + 1)}>
                        Siguiente
                    </button>
                </div>
            )}
                   
            

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