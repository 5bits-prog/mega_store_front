import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Style from '../../components/categorias/todasCategorias.module.css';
import { useEffect, useState } from 'react';
import { useTalle, Talle } from '../../contexts/TalleContext';
import { BaseObjeto } from '../../components/modalPut/ModalPut';
import ModalPut from '../../components/modalPut/ModalPut';


export default function CheckboxList() {
  const {talles, fetchTalles,actualizarTalle,eliminarTalle} =useTalle()
  const [open, setOpen] = useState(false)
  const [objectSelect, setObjectSelect]= useState<BaseObjeto | null>(null)
 

  //GET
  useEffect(() => {
    fetchTalles()
  }, []);

  const modalPut= (abrir:boolean) =>{
    setOpen(abrir)
  }

  const handleModalClose = () => {
    setOpen(false); // Actualiza el estado en el padre
  };
  
  const handleClick = (data: Talle)=>{
    setObjectSelect({
      id: Number(data.id), // Convierte a number
      nombre: data.nombre,
      fechaEliminacion: data.fechaDeEliminacion || '',
    });
    modalPut(true)
  };
  
  const handleConfirmarEdicion = (objectEditadar: Talle) => {
    actualizarTalle(objectEditadar); // Llamamos a la función de actualización desde el modal
  };

  const handleEliminar = (objectEliminar: Talle) =>{
      eliminarTalle(objectEliminar)
  }

  return (

    <List className={Style.list}>

      {(talles ?? [1,2,3]).map ((talle, idx) => {

        const labelId = `checkbox-list-label-${idx}`;

        return (
          <div className={Style.container}>
            <ListItem
            key={idx}
            disablePadding
            className={Style.contCategorias}
          > 
              <ListItemText id={labelId} primary={`${talle.nombre}`} className={Style.item} onClick={()=>handleClick (talle)}/>
          </ListItem>
          </div>
          
        );
      })}
      <ModalPut open={open} onClose={handleModalClose} objeto={objectSelect} onConfirm={handleConfirmarEdicion} onDelete={handleEliminar}  titulo='TALLE'/>
    </List>
  );
}