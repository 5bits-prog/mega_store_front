
export const validarCampoRequerido = (valor: string): string => {
    return valor.trim() === '' ? 'Este campo es obligatorio' : '';
};

export const validarAlfanumerico = (valor: string): string => {
    if (valor === '') return ''; // Permite valores vacíos
    const regex = /^[a-zA-Z0-9\s]+$/;
    return !regex.test(valor) ? 'Solo se permiten caracteres alfanuméricos' : '';
};

export const validarDecimalPositivo = (valor: string): string => {
    const regex = /^[0-9]+(\.[0-9]{1,2})?$/;
    const numberValue = parseFloat(valor);
    return !regex.test(valor) || numberValue <= 0 ? 'Debe ser un número positivo entero o hasta dos decimales' : '';
};

export const validarEnteroPositivo = (valor: string): string => {
    const regex = /^[0-9]+$/;
    const numberValue = parseInt(valor, 10); // Asegura que conviertas a entero
    return !regex.test(valor) || numberValue <= 0 
        ? 'Debe ser un número entero positivo' 
        : '';
};


//Validacion para las opciones a seleccionar (categoría)
export const validarCampoSeleccionado = (valor: string): string => {
    return valor === '' ? 'Debe seleccionar una categoría' : '';
};

//Validaciones para la carga de imagen
export const validarImagenProducto = (archivo: File | null): string => {
    if (!archivo) {
        return 'Debe seleccionar una imagen';
    }

    const validExtensions = ['image/jpeg', 'image/png'];
    const maxSize = 5 * 1024 * 1024; // 5 MB en bytes

    if (!validExtensions.includes(archivo.type)) {
        return 'Formato no permitido. Solo se aceptan archivos .jpg y .png';
    }

    if (archivo.size > maxSize) {
        return 'El archivo es demasiado grande. El tamaño máximo es de 5 MB';
    }
    return ''; // Si no hay errores
};


//ESPECIFICACIONES
//(!!) convierte cualquier valor en un booleano, por eso !!errores.nombre devuleve un booleano
//!!'' → false
//!!'error' → true
