
export const validarCampoRequerido = (valor: string): string => {
    return valor.trim() === '' ? 'Este campo es obligatorio*' : '';
};

export const validarAlfanumerico = (valor: string): string => {
    if (valor === '') return ''; // Permite valores vacíos
    const regex = /^[a-zA-Z0-9\s]+$/;
    return !regex.test(valor) ? 'Solo se permiten caracteres alfanuméricos' : '';
};

export const validarDecimalPositivo = (valor: string): string => {
    // Elimina los puntos (separadores de miles) si los hay
    const valorSinPuntos = valor.replace(/\./g, '');
    const regex = /^[0-9]+(\.[0-9]{1,2})?$/; // Solo permite hasta dos decimales

    // Convierte el valor sin puntos en un número
    const numberValue = parseFloat(valorSinPuntos);

    // Verifica si el valor es mayor que 0 y si sigue el formato correcto
    return !regex.test(valorSinPuntos) || numberValue <= 0 
        ? 'Debe ser un número positivo entero o hasta dos decimales' 
        : '';  // Si pasa la validación, no muestra error
};



export const validarEnteroPositivo = (valor: string): string => {
    const regex = /^[0-9]+$/;
    const numberValue = parseInt(valor, 10); // Asegura que conviertas a entero
    return !regex.test(valor) || numberValue <= 0 
        ? 'Debe ser un número entero positivo' 
        : '';
};

export const validarStock = (valor: string): number => {
    // Si el campo está vacío, devolver 0
    if (valor.trim() === '') {
        return 0;
    }

    const stockNumerico = parseInt(valor, 10);
    // Verificar si el valor es un número válido, de lo contrario, devolver 0
    return isNaN(stockNumerico) ? 0 : stockNumerico;
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

export const formatearNumero = (valor: string): string => {
  // Eliminar caracteres no numéricos
    const soloNumeros = valor.replace(/[^\d]/g, '');

    //Convertir a número y luego a cadena formateada
    const numeroFormateado = (parseInt(soloNumeros, 10) / 100)
        .toFixed(2) // Fija dos decimales
        .replace(/\B(?=(\d{3})+(?!\d))/g, '.') // Agrega puntos para miles
        .replace(/(\d+)(,\d{2})$/, '$1,$2'); // Cambia el punto decimal a coma en la posición adecuada

    return numeroFormateado;
};


//ESPECIFICACIONES
//(!!) convierte cualquier valor en un booleano, por eso !!errores.nombre devuleve un booleano
//!!'' → false
//!!'error' → true
