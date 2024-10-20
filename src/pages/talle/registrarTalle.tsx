import React, {useState} from 'react';
//importamos los estilos
import style from "./registrarTalle.module.css";
//importamos los iconos utilizados desde mui
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
//importamos lo necesario para usar zod para validaciones
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
//importamos el esquema de validaciones de talle
import { validationsTalle } from './validationsTalle'
//Componete Get talles
import ListaTalles from "./getTalles"

//definimos los tipos que va a recibir el formulario
type Inputs={
    nombre:string;
    
}

const RegistrarTalle: React.FC = () => {
    const { 
        register,
        reset,
        setError, // Función para registrar los campos del formulario y sus validaciones
        handleSubmit, // Función que maneja el evento de envío del formulario
        formState: { errors } // Objeto que contiene el estado del formulario, incluyendo los errores de validación
    } = useForm<Inputs>({ // Inicializamos useForm con un tipo genérico 'Inputs' para tipar los datos del formulario
        resolver: zodResolver(validationsTalle), // Usamos zodResolver para integrar validaciones definidas en el esquema validationsTalle
    });

    const [refresh, setRefresh] = useState(false);


  // Función que maneja la consulta al back me
  const onSubmit = async (data: Inputs) => {
    try {
      // Enviamos la información al servidor mediante una llamada fetch
      const response = await fetch('http://localhost:8080/products/talle', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data), //convertimos los datos recibidos en .json
      });

      if (!response.ok) { //si hay un error
        const errorData = await response.json(); // Captura la respuesta del error
        console.log(errorData);

        if (errorData && errorData.errors) { //si existe un error desde el back
            setError('nombre', { 
            type: 'manual',
            message: errorData.errors,   //recuperamos el atributo errors del json, que es el que contiene el mensaje de error desde el back
          });
          
          alert(errorData.errors); // Muestra el mensaje de error en una alerta
        } else {
          alert('Error desconocido'); //si el error no coincide con ninguno del back, es error desconcido
        }
        return;
      }
      else{ //si no hay errores
        reset() //limpiamos el input
        alert("Talle registrado con éxito") //mensaje de éxito
        setRefresh(!refresh); //cambia el estado refresh 
      }
    } catch (errors) {
      const message = (errors as Error).message || 'Error desconocido';
      console.error('Error desconocido:', errors);
      alert('Ocurrió un error al registrar el talle: ' + message);
    }
  };
    
    return (
        <div className={style.body}>
          <form className= {style.form} onSubmit={handleSubmit(onSubmit)}>
                <h3 className={style.title}>Nuevo Talle</h3> 
                <div className={style.container}>
                <input className={style.size} type="text" placeholder="Talle" {...register('nombre')} />
                {
                errors.nombre?.message &&<p className={style.alerts}>{errors.nombre?.message}</p> //si hay errores los muestra por pantalla
                }
                </div>
                <button className={style.button} type="submit" >< ArrowForwardIcon />Registrar</button>       
            </form>
            <ListaTalles refresh={refresh}></ListaTalles>
        </div>
    );
};
export default RegistrarTalle;
