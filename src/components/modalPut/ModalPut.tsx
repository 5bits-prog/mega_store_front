import styles from './ModalPut.module.css'
import Dialog from '@mui/material/Dialog'; // Dialog (se usa como un modal)
import DialogContent from '@mui/material/DialogContent'; // Contenido del modal de Material UI
import DialogActions from '@mui/material/DialogActions'; // Acciones como botones en el modal de Material UI
import Button from '@mui/material/Button'; // Botón de Material UI
import ZoomBoton from '../transitions/buttomzoom'; 
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import { useEffect, useState } from 'react';


export interface BaseObjeto {
  id: number | string; // Puede ser número o string según tus datos.
  nombre: string;
  fechaEliminacion?: string | null;
}
;
  
  type Props<T extends BaseObjeto> = {
    open: boolean;
    onClose: () => void;
    objeto: T | null; // Si no hay marca seleccionada, puede ser null
  };

const ModalPut = <T extends BaseObjeto>({ open, onClose, objeto }: Props<T>) =>{

    // Estado para controlar la visibilidad del modal de producto
    const [isDialogOpen, setDialogOpen] = useState(open || false);
    const [objectoSelect, setObjetoSelect] = useState(objeto || null);
    const [confirmarPut, setConfirmarPut] = useState(false)

    useEffect(() => {
        setDialogOpen(open);
        setObjetoSelect(objeto)
    }, [open]);

    const handleClose = () => {
        setDialogOpen(false);
        onClose(); 
    };

    const confirmar = (data: boolean) =>{
        setConfirmarPut(data)
    }
    
  return (
    <>
        <Dialog open={isDialogOpen} onClose={handleClose} fullWidth maxWidth="xs"  >
        <DialogContent className={styles.Dialog}>

            <div className={styles.contInfo}> 
              {objectoSelect ?  
              ( 
                <>
                <h2>MARCA</h2>
                <input
                  type="text"
                  value={objectoSelect.nombre}
                  readOnly={!confirmarPut}
                  className={confirmarPut ? `${styles.linea}`: ''}
                  onChange={(e) => {
                    if (confirmarPut) {
                      setObjetoSelect({
                        ...objectoSelect,
                        nombre: e.target.value,
                      });
                    }

                  }}
                />
                </>
              )
              :
              (
                <h1>no hay objeto</h1>
              )}
            </div>

        </DialogContent>

          <DialogActions className={styles.contBotones}>

          <Button>
              <DeleteIcon className={styles.botones} ></DeleteIcon>
          </Button>

          <Button  >
            {confirmarPut ? 
            (<CheckIcon className={styles.botones} onClick={()=> confirmar(false)}></CheckIcon>)
            :
            (<CreateIcon className={styles.botones} onClick={()=> confirmar(true)} ></CreateIcon>)}
          </Button>

          <Button onClick={handleClose}>
              <ZoomBoton />
          </Button>

          
        </DialogActions>
        </Dialog>
    </>
  );
}
export default ModalPut;