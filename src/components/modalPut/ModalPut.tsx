import styles from './ModalPut.module.css'
import Dialog from '@mui/material/Dialog'; // Dialog (se usa como un modal)
import DialogContent from '@mui/material/DialogContent'; // Contenido del modal de Material UI
import DialogActions from '@mui/material/DialogActions'; // Acciones como botones en el modal de Material UI
import Button from '@mui/material/Button'; // Botón de Material UI
import ZoomBoton from '../transitions/buttomzoom'; 
import { useEffect, useState } from 'react';


export type Objeto = {
    id: number;
    nombre: string;
    fechaEliminacion?: string | null;
    descripcion?:string | null
  };
  
  type Props = {
    open: boolean;
    onClose: () => void;
    objeto: Objeto | null; // Si no hay marca seleccionada, puede ser null
  };

const ModalPut = ({open, onClose, objeto}:Props)=>{
    // Estado para controlar la visibilidad del modal de producto
    const [isDialogOpen, setDialogOpen] = useState(open || false);
    const [objectoSelect, setObjetoSelect] = useState(objeto || null);

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
            <div> {objectoSelect ? objectoSelect.nombre :'no hay objeto'} </div>
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