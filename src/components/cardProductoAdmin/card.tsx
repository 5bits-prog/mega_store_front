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
import MoreVertIcon from '@mui/icons-material/MoreVert';
import style from './card.module.css'
import remeraNegra from './imagenes/remeraNegra.png'

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
type Props={
    nombre:string,
    descripcion:string,
}
export default function CardPrducto(props:Props) {
const [expanded, setExpanded] = React.useState(false);

const handleExpandClick = () => {
    setExpanded(!expanded);
};

return (
    <Card sx={{ maxWidth: 345 }} className={style.card}>
    <CardHeader
        avatar={
        <Avatar sx={{ bgcolor: "#a27eea" }} aria-label="recipe">
            Ro
        </Avatar>
        }
        action={
        <IconButton aria-label="settings">
            <MoreVertIcon />
        </IconButton>
        }
        title={props.nombre}
        subheader="September 14, 2016"
    />
    <CardMedia
        className={style.imagen}
        component="img"
        image= {remeraNegra}
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
        <Typography sx={{ marginBottom: 2 }}>
        
        </Typography>
        <Typography sx={{ marginBottom: 2 }}>
        
        </Typography>
        <Typography sx={{ marginBottom: 2 }}>
            
        </Typography>
        <Typography>
            
        </Typography>
        </CardContent>
    </Collapse>
    </Card>
);
}
