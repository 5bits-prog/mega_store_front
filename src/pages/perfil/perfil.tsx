import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Style from "./perfil.module.css";
import ImageAvatars from '../../components/avatar/fotoPerfil';
import { useRef, useState } from 'react';
import { InputAdornment } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

const Perfil: React.FC = () => {

  //FUNCION PARA MOSTRAR EL BOTÓN DE SUBIR ARCHIVO

  const [mostrarBoton, setMostrarBoton] = useState(false); // Estado inicial oculto

  const handleMostrarBoton = () =>{
    setMostrarBoton(true);
  }
  
  //FUNCION PARA ASIGNAR UN BOTON A UN INPUT DE TIPO FILE

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubirArchivo = () => {
    fileInputRef.current!.click(); // '!' indica que no es null
  };

  const [imagenPerfil, setImagenPerfil] = useState<string | null>(null);

  // FUNCION PARA MANEJAR EL CAMBIO DE ARCHIVO
  const manejarSeleccionDeArchivo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const archivo = e.target.files?.[0]; // Obtiene el primer archivo seleccionado

    if (archivo) {
      // Usamos FileReader para convertir el archivo en una URL que podemos usar en src de img
      const reader = new FileReader();
      reader.onloadend = () => {
        // Una vez cargado el archivo, actualizamos el estado con la URL
        setImagenPerfil(reader.result as string);
      };
      reader.readAsDataURL(archivo); // Leemos el archivo como URL de imagen
    }
  };
 
    return (
      <div className={Style.screen}>
        <div className={Style.container}>
          <h1>MI PERFIL</h1>
          <ImageAvatars src={imagenPerfil || "/broken-image.jpg"} alt="Foto perfil" width="140px" height="140px" />
          <a className={Style.image} onClick={handleMostrarBoton} >Editar imagen</a>
          <div className={mostrarBoton ? Style.mostrar : Style.ocultar}>
            <input type="file" id="seleccionarArchivo" className={Style.inputFile}ref={fileInputRef}  onChange={manejarSeleccionDeArchivo} accept="image/*"></input>
            <button onClick={handleSubirArchivo} className={Style.buttonFile}> Seleccionar Archivo</button>
          </div>
        <form>
          <Box component="form" sx={{ '& .MuiTextField-root': { m: 1, width: '35ch'} }} noValidate autoComplete="off">
            {/*Input nombre */}
            <div className={Style.input}>
              <TextField label="Nombre" defaultValue="Juan Perez" variant="standard"  slotProps={{input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <EditIcon />
                  </InputAdornment>
                ),
              },
            }}
          />
            </div>
            {/*Input mail */}
            <div className={Style.input}>
              <TextField label="Correo electrónico" defaultValue="Juanperez@gmail.com"variant="standard" slotProps={{input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <EditIcon />
                  </InputAdornment>
                ),
              },
            }}
          />
            </div>
            {/*Input direccion envio */}
            <div className={Style.input}>
              <TextField label="Dirección de envío" defaultValue="Concejal Paradela 1317" variant="standard"slotProps={{input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <EditIcon />
                  </InputAdornment>
                ),
              },
            }}
          />
            </div>
            {/*Input nro tel */}
            <div className={Style.input}>
              <TextField label="Nro teléfono" defaultValue="6564851157"variant="standard"slotProps={{input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <EditIcon />
                  </InputAdornment>
                ),
              },
            }}
          />
            </div>
          </Box>
          <button type="submit" className={Style.button}>Guardar</button>
        </form>
      </div>
    </div>
  );
}
export default Perfil;