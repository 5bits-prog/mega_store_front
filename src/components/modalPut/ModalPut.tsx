import styles from './ModalPut.module.css'
import Dialog from '@mui/material/Dialog'; // Dialog (se usa como un modal)
import DialogContent from '@mui/material/DialogContent'; // Contenido del modal de Material UI
import DialogActions from '@mui/material/DialogActions'; // Acciones como botones en el modal de Material UI
import Button from '@mui/material/Button'; // Botón de Material UI
import ZoomBoton from '../transitions/buttomzoom'; 
import { useEffect, useState } from 'react';

type Props={
    open:boolean;
    onClose: () => void;
}

const ModalPut = ({open, onClose}:Props)=>{
    // Estado para controlar la visibilidad del modal de producto
    const [isDialogOpen, setDialogOpen] = useState(open || false);

    useEffect(() => {
        setDialogOpen(open);
    }, [open]);



    const handleClose = () => {
        setDialogOpen(false);
        onClose(); 
    };
  return (
    <>
        <Dialog open={isDialogOpen} onClose={handleClose} fullWidth maxWidth="sm" className={styles.Dialog}>
        <DialogContent >
            <div> holaa</div>
        </DialogContent>
        <DialogActions >
        <Button onClick={handleClose}>

            <ZoomBoton />
        </Button>
        </DialogActions>
        </Dialog>
    </>
  );
}
export default ModalPut;