import {z} from 'zod'
const validationsRegister=z.object({
  //definimos las validaciones para talle
    nombre:z
      .string()
      .min(1, { message: 'Nombre no puede estar vacío.' })
      .max(100,{message: 'Nombre no puede superar los 100 caracteres'})
      .regex(/^[A-Za-z0-9áéíóúÁÉÍÓÚ\s]+$/,{ message: 'Nombre contiene caracteres no permitidos.' })
      .regex(/^(?!.*\s{2,}).*$/, { message: "Nombre no puede contener espacios consecutivos"})
      .refine((val) => !(val.length === 1 && val === ' '), { message: 'Nombre no puede estar vacío.' }) ,
    email:z
      .string()
      .email({message:"Formato inválido de email"})
      .regex(/^(?!.*\s{2,}).*$/, { message: "Email no puede contener espacios consecutivos"})
      .refine((val) => !(val.length === 1 && val === ' '), { message: 'Email no puede estar vacío.' }) ,
    contrasena:z
      .string()
      .min(1, { message: 'Contraseña no puede estar vacío.' })
      .max(100,{message: 'Contraseña no puede superar los 100 caracteres'})
      .regex(/^[A-Za-z0-9áéíóúÁÉÍÓÚ\s]+$/,{ message: 'Contraseña contiene caracteres no permitidos.' })
      .regex(/^(?!.*\s{2,}).*$/, { message: "Contraseña no puede contener espacios consecutivos"})
      .refine((val) => !(val.length === 1 && val === ' '), { message: 'Contraseña no puede estar vacío.' }) ,
    envio:z
      .string()
      .max(100, { message: 'No debe superar los 100 caracteres.' }),
    numeroTelefono:z
     .string()
     .regex(/^\+?[0-9]+$/, { message: 'Teléfono debe ser un número' })
     .min(8, { message: 'Debe tener al menos 8 dígitos.' })
     .max(15,{message: 'No debe superar los 15 dígitos'}),
     
    confirmacion:z
      .string()
      .min(1, { message: 'Confirmación no puede estar vacío.' })
      .max(100, { message: 'Contraseña no debe superar los 100 caracteres.' })
    }).superRefine((data, ctx) => {
      // Guardar el valor de la contraseña en una variable para mayor claridad
      const contrasena = data.contrasena;
      const confirmacion = data.confirmacion;
      // Validar si coinciden
      if (contrasena !== confirmacion) {
        ctx.addIssue({
          code: 'custom',
          path: ['confirmacion'],
          message: 'No coincide con la contraseña.',
      });
    }
   
}); 
export default validationsRegister