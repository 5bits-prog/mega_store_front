import styles from './menuAdmin.module.css';
import AccordionUsage from './acordionRegistrar';
import { useEffect, useState } from 'react';
import DensityMediumIcon from '@mui/icons-material/DensityMedium';
import PersonIcon from '@mui/icons-material/Person';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/LoginContext';
import CarritoMenuAdmin from '../carritoBarraMenu/CarritoBarraMenu';
import Accordion2Usage from './acordionUsuario';
import { useCarrito } from '../../contexts/CarritoContext';



const Menu = () => {
    const{rol} = useAuth()
    const [rolG, setRol] = useState<string | null>(null);

    // Recupera el valor del rol desde localStorage
    useEffect(() => {
        const rolGuardado = localStorage.getItem("rol");
        setRol(rolGuardado); // Guarda el rol en el estado local
    }, [rol]);


    //estado para contrlar la visibilidad del Menu desplegable
    const [isMenuOpen, setMenuOpen] = useState(false);

    const [isMenu2Open, setMenu2Open] = useState(false);

    
    // Función para ir cambiando el estado del menú
    const toggleMenu = () => { //Función para abrir el desplegable
        setMenuOpen(!isMenuOpen);
    };

    const toggleMenu2 = () => { //Función para abrir el desplegable
        setMenu2Open(!isMenu2Open);
    };

    const closeMenu = () => { //función para cerrar el desplegable
        setMenuOpen(false);  // Cerrar menú cuando el mouse salga del ícono o del menú
    };

    const closeMenu2 = () => { //función para cerrar el desplegable
        setMenu2Open(false);  // Cerrar menú cuando el mouse salga del ícono o del menú
    };

    const navigate = useNavigate(); // Hook para navegar a otras rutas

    const handleNavigation = () => {
       navigate('/sesion'); // Navegar a la ruta especificada
    };
    const handleNavigationCarrito = () => {
       navigate('/appsRami/carrito'); // Navegar a la ruta especificada
    };
    const handleCatalogo=()=>{
        navigate('/catalogoProductos')
    }
    const handleHome=()=>{
        navigate('/home')
    }
    const handleNosotros=()=>{
        navigate('/nosotros')
    }

    const handleEstadisticas=()=>{
        navigate('/appsAbril/opcionesEstadisticas')
    }

   

    
    const location = useLocation();
    const isHome = location.pathname === '/home';
    

    return (
    <div className={styles.container1}>
        <div className={styles.header}>
            
            <img src='/logo.png' alt="Logo" width="100" height="60" /> {/* Ajusta el tamaño según sea necesario */}
            <div className={styles.container2}>
                {rolG=='4' ?
                    <button className={styles.options} onMouseEnter={toggleMenu}><DensityMediumIcon/>{/* Agrega el ícono dentro del botón */}
                    </button>
                :''}
                
            
            {/* Contenido del menú que se muestra/oculta según el estado */}
                {isMenuOpen && (
                    <a className={styles.dropdownContent} onMouseLeave={closeMenu}>
                    <AccordionUsage />
                    </a>   
                )}
            </div> 
            <h1  className={styles.title} onClick={()=>handleHome()}>{isHome ? 'MEGASTORE': 'PANEL DE ADMINISTRADOR'} </h1> 

            <div className={styles.components}>
                <a className={styles.seleccion2} onClick={handleNosotros} >About us</a>
                {rolG == '4'? 
                <>
                <a className={styles.seleccion2} onClick={handleCatalogo}>Productos</a>
                <a className={styles.seleccion2} onClick={handleEstadisticas}>Estadísticas</a>
                {/*<a className={styles.seleccion2} onClick={ ()=> cerrarSesion()}>Cerrar Sesion</a>*/}
                <a className={styles.seleccion2} onMouseEnter={toggleMenu2}> < PersonIcon /></a>
                <a className={styles.seleccion2} onClick={handleNavigationCarrito}> < CarritoMenuAdmin /></a>
                {/* Contenido del menú que se muestra/oculta según el estado */}
                {isMenu2Open && (
                    <a className={styles.dropdownContent2} onMouseLeave={closeMenu2}>
                    <Accordion2Usage />
                    </a>   
                )}
                </>
                :''}
                {/**Si no está logueado, no se muestran las opciones de perfil */}
                {rolG != '4'?
                <>
                    <a className={styles.seleccion2} onClick={handleNavigation}> < PersonIcon /></a>

                    <a className={styles.seleccion2} onClick={handleNavigationCarrito}> < CarritoMenuAdmin /></a>
                    </>
                :''}

            </div>

        </div>
        
    </div>
    );
};

export default Menu
