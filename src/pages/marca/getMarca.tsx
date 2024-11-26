import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Style from '../../components/categorias/todasCategorias.module.css';
import { useEffect, useState} from 'react';
import { useMarca } from '../../contexts/MarcaContext';
import ModalPut from '../../components/modalPut/ModalPut';

    

export default function CheckboxList() {
  const {marcas, fetchMarcas } = useMarca();
  const [open, setOpen] = useState(false)
  
  useEffect(()=>{
    fetchMarcas()
  },[])

  const modalPut= (abrir:boolean) =>{
    setOpen(abrir)
  }
  const handleModalClose = () => {
    setOpen(false); // Actualiza el estado en el padre
  };
  
  return (
    
    <List className={Style.list}>

      {(marcas ?? [1,2,3]).map ((marca, idx) => {

        const labelId = `checkbox-list-label-${idx}`;

        return (
          <>
          <ListItem
            key={marca.id}
            disablePadding
            className={Style.contCategorias}
          > 
              <ListItemText id={labelId} primary={`${marca.nombre}`} className={Style.item} onClick={()=> modalPut(true)}>
              </ListItemText>
          </ListItem>
          
          </>
        );
      })}
      <ModalPut open={open} onClose={handleModalClose} />
    </List>

  );
}