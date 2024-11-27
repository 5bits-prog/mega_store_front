import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Style from "./todasCategorias.module.css"
import { useEffect, useState } from 'react';
import { Categoria, useCategoria } from '../../contexts/CategoriaContext';
import ModalPut, {BaseObjeto} from '../modalPut/ModalPut';


export default function CheckboxList() {
  const {categorias, fetchCategorias, eliminarCategoria, actualizarCategoria} =useCategoria()
  const [open, setOpen] = useState(false)
  const [objectSelect, setObjectSelect]= useState<BaseObjeto | null>(null)
 

  //GET
  useEffect(() => {
    fetchCategorias()
  }, []);

  const modalPut= (abrir:boolean) =>{
    setOpen(abrir)
  }

  const handleModalClose = () => {
    setOpen(false); // Actualiza el estado en el padre
  };
  
  const handleClick = (data: Categoria)=>{
    setObjectSelect({
      id: Number(data.id), // Convierte a number
      nombre: data.nombre,
      fechaEliminacion: data.fechaDeEliminacion || '',
    });
    modalPut(true)
  };
  
  const handleConfirmarEdicion = (objectEditadar: Categoria) => {
    actualizarCategoria(objectEditadar); // Llamamos a la función de actualización desde el modal
  };

  const handleEliminar = (objectEliminar: Categoria) =>{
      eliminarCategoria(objectEliminar)
  }


  return (

    <List className={Style.list}>

      {(categorias ?? [1,2,3]).map ((categoria, idx) => {

        const labelId = `checkbox-list-label-${idx}`;

        return (
          <div className={Style.container}>
              <ListItem
            key={idx}
            disablePadding
            className={Style.contCategorias}
          > 
              <ListItemText id={labelId} primary={`${categoria.nombre}`} className={Style.item} onClick={()=>handleClick (categoria)}/>
          </ListItem>
          </div>
          
        );
      })}
      <ModalPut open={open} onClose={handleModalClose} objeto={objectSelect} onConfirm={handleConfirmarEdicion} onDelete={handleEliminar}  titulo='CATEGORIA'/>
    </List>
  );
}