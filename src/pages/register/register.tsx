import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import validationsRegister from "./validationsRegister";
import Style from "./register.module.css";
import React, { useState } from "react";
import {Box, FormControl, IconButton, Input, InputAdornment, InputLabel,TextField } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import CodigoVerificacion from "../verificacion/verificacion";
import Dialog from '@mui/material/Dialog'; // Dialog (se usa como un modal)
import DialogContent from '@mui/material/DialogContent'; // Contenido del modal de Material UI
import '../verificacion/verificacion.module.css';


const Register: React.FC = () => {
    
    const [showPassword, setShowPassword] = React.useState(false);
    const [isDialogOpen, setDialogOpen] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {event.preventDefault();};
    
    const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {event.preventDefault();};
    // Configurar el formulario de registro
    const { register: registerRegister, handleSubmit: handleSubmitRegister, formState: { errors: errorsRegister } } = useForm({
        resolver: zodResolver(validationsRegister), // Usar el esquema de validación para el registro
    });
    // Función para manejar el envío del formulario de registro
    const onSubmitRegister = (data: any) => {
        console.log(data); // Manejar datos del formulario de registro
    };
    
    //Funcion para que aparezca el dialog del codigo de verificacion
    const modalCodigoVerificacion=()=>{
        setDialogOpen(!isDialogOpen)
    }

    const handleCerrarForm = () => {
        setDialogOpen(false);
    };
    
    return (
    <div className={Style.screen}>
        <div className={Style.container}>
        {/* FORMULARIO DE REGISTRO */}
        <form className={Style.registerForm} onSubmit={handleSubmitRegister(onSubmitRegister)}>
            <h2>Registrarse</h2>
            {/* NOMBRE */}
            <Box
                component="form"
                sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
                noValidate
                autoComplete="off"
            ><TextField 
                id="standard-basic" 
                label="Nombre" 
                variant="standard"
                type="text" 
                {...registerRegister('nombre')} />
            </Box>
            {errorsRegister.nombre && typeof errorsRegister.nombre.message === 'string' && (<p className={Style.alerts}>{errorsRegister.nombre.message}</p>)}
            {/* EMAIL*/}
            <Box
                component="form"
                sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
                noValidate
                autoComplete="off"
            ><TextField 
                id="standard-basic" 
                variant="standard"
                label="Email"
                type="text" 
                {...registerRegister('email')} // Registrar el campo email
            />
            
            </Box>
            {errorsRegister.email && typeof errorsRegister.email.message === 'string' && (<p className={Style.alerts}>{errorsRegister.email.message}</p>)}
            {/* CONTRASEÑA */}
            <div >
                <div>
                <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
    <InputLabel htmlFor="standard-adornment-password">Contraseña</InputLabel>
    <Input
        id="standard-adornment-password"
        type={showPassword ? 'text' : 'password'}
        color="secondary"
        endAdornment={
            <InputAdornment position="end">
                <IconButton
                    aria-label={showPassword ? 'hide the password' : 'display the password'}
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    onMouseUp={handleMouseUpPassword}
                >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
            </InputAdornment>
        }
        {...registerRegister('contrasena')} // Registrar el campo contraseña
    />
</FormControl>
{errorsRegister.contrasena && typeof errorsRegister.contrasena.message === 'string' && (<p className={Style.alerts}>{errorsRegister.contrasena.message}</p>)}
                
            {/*CONFIRMACIÓN CONTRASEÑA*/}
            <div className={Style.container2}>
                <div>
                <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
    <InputLabel htmlFor="standard-adornment-confirmacion">Confirmar contraseña</InputLabel>
    <Input
        id="standard-adornment-confirmacion"
        type={showPassword ? 'text' : 'password'}
        color="secondary"
        endAdornment={
            <InputAdornment position="end">
                <IconButton
                    aria-label={showPassword ? 'hide the password' : 'display the password'}
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    onMouseUp={handleMouseUpPassword}
                >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
            </InputAdornment>
        }
        {...registerRegister('confirmacion')} // Registrar el campo contraseña
    />
</FormControl>
{errorsRegister.confirmacion && typeof errorsRegister.confirmacion.message === 'string' && (<p className={Style.alerts}>{errorsRegister.confirmacion.message}</p>)}
    </div>
            </div>
            {/*DIRECCIÓN DE ENVÍO*/} 
            <div className={Style.container2}>
            <Box
                component="form"
                sx={{ '& > :not(style)': { m: 1, width: '12ch' } }}
                noValidate
                autoComplete="off"
            ><TextField 
                id="standard-basic" 
                variant="standard"
                label="Dir envío"
                type="text" 
                {...registerRegister('envio')} // Registrar el campo nombre
            />
            {errorsRegister.envio && typeof errorsRegister.envio.message === 'string' && (<p className={Style.alerts}>{errorsRegister.envio.message}</p>)}
            </Box> 
                
            {/*TELÉFONO*/}
            <Box
                component="form"
                sx={{ '& > :not(style)': { m: 1, width: '12ch' } }}
                noValidate
                autoComplete="off"
            ><TextField 
                id="standard-basic" 
                variant="standard"
                label="Teléfono"
                type="text" 
                {...registerRegister('numeroTelefono')} // Registrar el campo nombre
            />
            </Box> 
            
            </div>
            {errorsRegister.numeroTelefono && typeof errorsRegister.numeroTelefono.message === 'string' && (<p className={Style.alertsTel}>{errorsRegister.numeroTelefono.message}</p>)}
            
            </div>
        </div>
            <button type="submit" className={Style.button} onClick={() => modalCodigoVerificacion()}>Registrar</button>
        </form>
    </div> 

    {/* Dialog para el formulario del codigo de verificacion */}
    <Dialog 
    open={isDialogOpen}
    onClose={() => setDialogOpen(false)} 
    PaperProps={{
        className: 'verif', // se aplican los estilos CSS de .verif
    }}
    >
        <DialogContent>
        <CodigoVerificacion onCerrar={handleCerrarForm}/>{/* Es el formulario del codigo de verificacion */}
        </DialogContent>
    </Dialog>
</div>       
);
};

export default Register;