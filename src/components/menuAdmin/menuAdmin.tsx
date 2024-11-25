{/*Importación de estilos*/}
import styles from './menuAdmin.module.css';
{/*Importación del acordeón para el desplegable*/}
import AccordionUsage from '../menu/acordion';

import { useState } from 'react';
{/*Importación de íconos utilizados desde mui*/}
import DensityMediumIcon from '@mui/icons-material/DensityMedium';
import PersonIcon from '@mui/icons-material/Person';
import { useNavigate } from 'react-router-dom';






const Menu = () => {
    //estado para contrlar la visibilidad del Menu desplegable
    const [isMenuOpen, setMenuOpen] = useState(false);

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
                <button className={styles.options} onMouseEnter={toggleMenu}  > < DensityMediumIcon />  {/* Agrega el ícono dentro del botón */}</button>{/* Botón de navegación */} 
            
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

        <main className={styles.mainContent}> 
            
        </main>

       
    </div>
    );
};

export default Menu
