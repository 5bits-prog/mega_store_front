import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

export default function AccordionUsage() {
  const entidades = [
    {"nombre": "Marca", "ruta": "/registrarMarca"},
    {"nombre": "Sucursal", "ruta": "/registrarSucursal"},
    {"nombre": "Color", "ruta": "/registrarColor"},
    {"nombre": "Talle", "ruta": "/registrarTalle"},
    {"nombre": "Categoría", "ruta": "/registrarCategoria"},
  ]
  const navigate = useNavigate(); // Hook para navegar a otras rutas
  
  const handleNavigation = (ruta: string) => {
    navigate(ruta); // Navegar a la ruta especificada
  };

  return (
    <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
          sx={{ // Color de fondo
            color: 'black',  // Color del texto
            padding: '10px',
            textAlign:'center',
          }}
        >
          REGISTRAR
        </AccordionSummary>
        {entidades.map((entidad,idx)=>(
          
           <AccordionDetails key={idx} sx={{ color:'white',backgroundColor: 'white', padding: '10px', textAlign:'center', '&:hover': {
                backgroundColor: '#c99af3'} }}>
            <Button onClick={() => handleNavigation(entidad.ruta)}
            sx={{
                color: 'BLACK',  // Color del texto del botón
                transition: 'background-color 0.3s',
                display: 'block',  // Hace que el botón ocupe toda la línea disponible
                width: '100%',
                '&:hover': {
             // Color al pasar el ratón sobre el botón
                  color: 'WHITE'  // Cambia el color del texto cuando el ratón está sobre el botón
                }
              }}>
            {entidad.nombre}
            
            </Button>
          </AccordionDetails>
        ))}
        
      </Accordion>
    </div>
  );
}
