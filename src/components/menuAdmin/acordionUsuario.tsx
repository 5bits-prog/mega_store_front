import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/LoginContext';
import Swal from 'sweetalert2';


export default function Accordion2Usage() {

  const{rol, logout} = useAuth()
  
  const [rolG, setRol] = useState<string | null>(null);
  
  // Recupera el valor del rol desde localStorage
  useEffect(() => {
    const rolGuardado = localStorage.getItem("rol");
    setRol(rolGuardado); // Guarda el rol en el estado local
  }, [rol]);

  //Función para cerrar sesión
  const cerrarSesion=()=>{
    Swal.fire({
      title: '¿Estás seguro?',
      text: "Se cerrará tu sesión actual.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#a27eea',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, cerrar sesión',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        setRol(null);
        logout();
        Swal.fire({
          text: "Se ha cerrado la sesión",
          confirmButtonText: 'ok', // Texto del botón de confirmación
          confirmButtonColor: '#a27eea', 
          timer: 3000, // Tiempo para que se cierre automáticamente (en milisegundos)
          timerProgressBar: true, // Muestra una barra de progreso
        }
          
        );
      }
    });
  };
  
  const navigate = useNavigate(); // Hook para navegar a otras rutas
  
  //función para manejo de rutas
  const handleNavigation = (ruta: string) => {
    navigate(ruta); // Navegar a la ruta especificada
  };
  
  //se definen las entidades del menú desplegable
  const entidades = [
    { id: 1, nombre: "mi Perfil", onClick:() => handleNavigation("/appsAbril/perfil")}, //redirecciona al perfil del usuario
    { id: 2 , onClick: cerrarSesion, icon:<LogoutIcon  sx={{ color: 'black' ,fontSize: 30  }} />  }, //sirve para cerrar sesión
  ];
  
  return (
    <div>
      <Accordion expanded>
        {entidades.map((entidad)=>(
        <AccordionDetails key={entidad.id} sx={{ color:'white',backgroundColor: 'white', padding: '15px', textAlign:'center', '&:hover': {backgroundColor: '#c99af3'} }}>
        <Button 
          sx={{
            color: 'BLACK',  // Color del texto del botón
            transition: 'background-color 0.3s',
            display: 'block',  // Hace que el botón ocupe toda la línea disponible
            width: '100%',                
            '&:hover': {color: 'WHITE'}// Cambia el color del texto cuando el ratón está sobre el botón
          }}
          startIcon={entidad.icon} //inicializa el icono de la entidad
          onClick={entidad.onClick} //cuando se hace click se llama al atributo asignado en la entidad
          > 
          {entidad.nombre}
        </Button>
        </AccordionDetails>
        ))}
      </Accordion>
    </div>
  );
}