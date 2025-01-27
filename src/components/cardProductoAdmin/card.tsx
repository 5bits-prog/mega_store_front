import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import style from './card.module.css';
import EditIcon from '@mui/icons-material/Edit';
import Dialog from '@mui/material/Dialog'; // Dialog (se usa como un modal)
import DialogContent from '@mui/material/DialogContent'; // Contenido del modal de Material UI
import DialogActions from '@mui/material/DialogActions'; // Acciones como botones en el modal de Material UI
import Button from '@mui/material/Button'; // Botón de Material UI
import { useState } from 'react';
import ZoomBoton from '../../components/transitions/buttomzoom';  
import ModificarProducto from '../../pages/producto/modificarProducto';
import DeleteIcon from '@mui/icons-material/Delete';
import { ProductoGet } from '../../pages/producto/interfazProducto';
import { useProductos } from '../../contexts/ProductoContext';
import HistoryIcon from '@mui/icons-material/History';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from "@mui/material/styles";

export default function CardPrducto(props:ProductoGet) {
const {eliminarProducto, obtenerHistorial, loading, historial }= useProductos()
const [isDialogOpen, setDialogOpen] = useState(false);
const [isMenuOpen, setMenuOpen] = useState(false);
const [openHistorial, setOpenHistorial] = useState(false)

const modalProducto=()=>{
        setDialogOpen(!isDialogOpen)
}
    // Función para ir cambiando el estado del menú
const toggleMenu = () => { //Función para abrir el desplegable
        setMenuOpen(!isMenuOpen);
};

const eliminar = (producto:ProductoGet) =>{
    eliminarProducto(producto)
}

const formatearPrecio = (precio: number): string => {
    return precio.toLocaleString('es-ES');
};

function formatearFecha(fechaISO : any) {
    // Convertir la fecha ISO a un objeto Date
    const fecha = new Date(fechaISO);

    // Extraer los valores de día, mes y año
    const dia = String(fecha.getDate()).padStart(2, '0');
    const mes = String(fecha.getMonth() + 1).padStart(2, '0'); // Los meses son 0-indexados
    const anio = fecha.getFullYear();

    // Devolver la fecha en formato dd/mm/yyyy
    return `${dia}/${mes}/${anio}`;
}
const fecha = formatearFecha(props.fechaCreacion);

const handleHistorial =(id:any)=>{
    id= String(id)
    obtenerHistorial(id)
    setOpenHistorial(true)
}
const closeHistorial=()=>{
    setOpenHistorial(false)
}

const SmallIconButton = styled(IconButton)(({ theme }) => ({
   color: theme.palette.grey[600], // Color gris
   padding:"5px",
   marginBottom:"50px",

    
   // Asegúrate de usar flexbox dentro del botón
    
   
    "& svg": {
      fontSize: "1.4rem", // Tamaño del ícono
      
    },
  }));

return (
    <>
    <Card sx={{ maxWidth: 300, fontSize:"1rem"}} className={style.card} key={props.id} >
        <CardHeader className={style.header}
            
            
            action={
                <>  <SmallIconButton onClick={() => modalProducto()}>
                <EditIcon />
              </SmallIconButton>

                    <SmallIconButton onClick={() =>eliminar(props) }>
                       <DeleteIcon />
                    </SmallIconButton>

                    <SmallIconButton onClick={() =>handleHistorial(props.id) }>
                        
                        {!loading ? <HistoryIcon /> 
                            : 
                            <Stack spacing={2} direction="row" alignItems="left">
                               
                            </Stack>
                        }   
                        
                    </SmallIconButton>

                </>
                }
            title={props.nombre} 
            subheader={
                <>
                {fecha}<br />
                  ${formatearPrecio(props.precio ?? 0)} 
                </>
              }
                         
        />

        <div className={style.content} tabIndex={0}>

            <div className={style.front}>
                
                    <div className={style.imagen} >
                        <img src={props.foto} alt="" />
                    </div>

            </div>

            <div className={style.back}>
                <div className={style.backContent}>
                    
                    <div className={style.contDescripGeneral}>
                        Descripcion <br /> {props.descripcion}
                    </div>

                    <div className={style.contStockGeneral}> 
                        STOCK
                        <div className={style.contStock}>
                            <table className={style.tabla}>
                                <thead>
                                    <tr>
                                    <th>Actual Total </th>
                                    <th>Medio</th>
                                    <th>Minimo</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                    <td>{props.stockActual}</td>
                                    <td>{props.stockMedio}</td>
                                    <td>{props.stockMinimo}</td>
                                    </tr>
                                </tbody>
                            </table>
                            
                        </div>
                    </div>

                    

                    <div className={style.contInfoGeneral}>
                        INFORMACIÓN
                        <table className={style.tabla}>
                                <thead>
                                    <tr>
                                    <th>Categoria</th>
                                    <th>Marca</th>
                                    <th>Color</th>
                                    <th>Talle</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                    <td>{props.categoriaId}</td>
                                    <td>{props.marcaId}</td>
                                    <td>{props.colorId}</td>
                                    <td>{props.talleId} </td>
                                    </tr>
                                </tbody>
                        </table>
                    </div>

                    <div className={style.contSucurlGeneral}>
                        Sucursales
                        <div className={style.contSucurl}>
                            <table className={style.tablaSucursal}>

                                <thead>
                                    <tr>
                                    {(props.sucursales || []).map((sucursal, index) => (
                                        <th key={index}>{sucursal.nombreSucursal}</th>
                                    ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                    {(props.sucursales || []).map((sucursal, index) => (
                                        <td key={index}>{sucursal.cantidad}</td>
                                    ))}
                                    </tr>
                                </tbody>
                            </table>
                        
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Card>

    <Dialog open={isDialogOpen} onClose={toggleMenu} fullWidth maxWidth="sm">
    <DialogContent >
        <ModificarProducto producto={props} />{/* Es el formulario para registrar un producto que se renderiza dentro del Dialog */}
    </DialogContent>
    <DialogActions >
    <Button onClick={modalProducto}>
        <ZoomBoton />
    </Button>
    </DialogActions>
    </Dialog>

    {/*MODAL HISTORIAL */}

    {openHistorial && !loading ? 

        <div className={style.historial}>
                {/* Encabezado con el botón */}
                <div className={style.historialHeader}>

                    <h1>Historial de {props.nombre}</h1>

                    <IconButton color="primary" className={style.botonClose} onClick={() => closeHistorial()}>
                        <CloseIcon />
                    </IconButton>
                </div>

                {/* Contenido desplazable */}
                <div className={style.historialContent}>
                    {(historial || []).map((item) => (
                        <p key={item.id}>
                            {formatearFecha(item.fecha)} - ${formatearPrecio(item.precio)}
                        </p>
                    ))}
                </div>
        </div>
        :
        ''
    }
  
    </>

   
);
}
