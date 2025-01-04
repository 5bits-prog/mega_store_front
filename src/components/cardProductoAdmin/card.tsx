import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
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
import { Producto } from '../../pages/producto/interfazProducto';
import { useProductos } from '../../contexts/ProductoContext';

interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
const { expand, ...other } = props;
return <IconButton {...other} />;
})(({ theme }) => ({
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
}),
variants: [
    {
    props: ({ expand }) => !expand,
    style: {
        transform: 'rotate(0deg)',
    },
    },
    {
    props: ({ expand }) => !!expand,
    style: {
        transform: 'rotate(180deg)',
    },
    },
],
}));

export default function CardPrducto(props:Producto) {
const [expanded, setExpanded] = React.useState(false);
const {eliminarProducto}= useProductos()

const handleExpandClick = () => {
    setExpanded(!expanded);
};

const [isDialogOpen, setDialogOpen] = useState(false);
const [isMenuOpen, setMenuOpen] = useState(false);

const modalProducto=()=>{
        setDialogOpen(!isDialogOpen)
}
    // Función para ir cambiando el estado del menú
const toggleMenu = () => { //Función para abrir el desplegable
        setMenuOpen(!isMenuOpen);
};
const eliminar = (producto: Producto) =>{
    eliminarProducto(producto)
}
return (
    <>
    <Card sx={{ maxWidth: 345 }} className={style.card} key={props.id}>
    <CardHeader
        avatar={
        <Avatar sx={{ bgcolor: "#a27eea" }} aria-label="recipe">
            Ro
        </Avatar>
        }
        action={
            <>
            <IconButton color="primary" onClick={() => modalProducto()}>
                <EditIcon />
            </IconButton>

            <IconButton color="primary" onClick={() =>eliminar(props) }>
                <DeleteIcon />
            </IconButton>
            </>
        }
        title={props.nombre}
        subheader="September 14, 2016"
    />
    <CardMedia
        className={style.imagen}
        component="img"
        image= {props.foto}
        alt="Remera"
        color='red'
    />
    <CardContent>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {props.descripcion}
        </Typography>
    </CardContent>

    <CardActions disableSpacing>
        <ExpandMore
        expand={expanded}
        onClick={handleExpandClick}
        aria-expanded={expanded}
        aria-label="show more"
        >
        <ExpandMoreIcon />
        </ExpandMore>
    </CardActions>

    <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
        <Typography sx={{ marginBottom: 2 }}>Detalle:</Typography>
        <Typography sx={{ marginBottom: 2 }}> </Typography>
    
        </CardContent>
    </Collapse>
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
    </>
);
}
