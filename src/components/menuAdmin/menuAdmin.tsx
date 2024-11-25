import styles from './menuAdmin.module.css';
import AccordionUsage from '../menu/acordion';
import { useState } from 'react';
{/*Importación de íconos utilizados desde mui*/}
import DensityMediumIcon from '@mui/icons-material/DensityMedium';
import PersonIcon from '@mui/icons-material/Person';
import Dialog from '@mui/material/Dialog'; // Dialog (se usa como un modal)
import DialogContent from '@mui/material/DialogContent'; // Contenido del modal de Material UI
import DialogActions from '@mui/material/DialogActions'; // Acciones como botones en el modal de Material UI
import Button from '@mui/material/Button'; // Botón de Material UI
import RegistrarProducto from '../../pages/producto/registrarProducto'; // Importación del formulario para registrar productos.
import ZoomBoton from '../transitions/buttomzoom';    


const Menu = () => {
    //estado para contrlar la visibilidad del Menu desplegable
    const [isMenuOpen, setMenuOpen] = useState(false);

    // Estado para controlar la visibilidad del modal de producto
    const [isDialogOpen, setDialogOpen] = useState(false);

    // Función para ir cambiando el estado del menú
    const toggleMenu = () => { //Función para abrir el desplegable
        setMenuOpen(!isMenuOpen);
    };
    const closeMenu = () => { //función para cerrar el desplegable
        setMenuOpen(false);  // Cerrar menú cuando el mouse salga del ícono o del menú
    };
     // Función para cerrar el menú
     const navigate = useNavigate(); // Hook para navegar a otras rutas
  
     const handleNavigation = () => {
       navigate('/sesion'); // Navegar a la ruta especificada
     };
  
    return (
    <div className={styles.container1}>
        <div className={styles.header}>
            <img src="logo.png" alt="Logo" width="100" height="60" /> {/* Ajusta el tamaño según sea necesario */}
            <div className={styles.container2}>
                <button className={styles.options} onMouseEnter={toggleMenu}><DensityMediumIcon/>{/* Agrega el ícono dentro del botón */}
                </button>{/* Botón de navegación */} 
            
            {/* Contenido del menú que se muestra/oculta según el estado */}
                {isMenuOpen && (
                    <div className={styles.dropdownContent}onMouseLeave={closeMenu}>
                    <AccordionUsage />
                    </div>   
                )}
            </div> 
            <h1 className={styles.title}>MegaStore - Panel de Administración</h1> 
            <div className={styles.components}>
                <div className={styles.seleccion1} onClick={handleNavigation}> < PersonIcon /></div>
                <div className={styles.seleccion2}>Productos</div>

                <div className={styles.seleccion2}>Sucursales</div>
                <div className={styles.seleccion2}>Estadísticas</div>
            </div>
        </div>
        {/* Dialog para el formulario de Registrar Producto */}
        <Dialog open={isDialogOpen} onClose={closeDialog} fullWidth maxWidth="sm">
                <DialogContent className={styles.dialog}>
                    <RegistrarProducto/>{/* Es el formulario para registrar un producto que se renderiza dentro del Dialog */}
                </DialogContent>
                <DialogActions className={styles.bottomborder}>
                <Button onClick={closeDialog}>
                    <ZoomBoton />
                </Button>
                </DialogActions>
        </Dialog>
    </div>
    );
};

export default Menu
