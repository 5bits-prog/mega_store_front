
export const validarCampoRequerido = (valor: string): string => {
    return valor.trim() === '' ? 'Este campo es obligatorio*' : '';
};

export const validarAlfanumerico = (valor: string): string => {
    if (valor.trim() === '') return ''; // Permite valores vacíos
    const regex = /^[a-zA-Z0-9\s]+$/;
    return regex.test(valor) ? '': 'Solo se permiten letras y numeros';
};

export const validarLongitudCaracteres = (valor: string): string => {
     // Si el campo está vacío, no mostrar ningún mensaje de error
    if (valor.trim() === '') return '';

    const regex = /^[A-Za-z0-9 ]{1,100}$/;
    return regex.test(valor) ? '' : 'Debe tener entre 1 y 100 caracteres'; 
};
 


export const desformatearPrecio = (valor: string): string => {
    // Elimina puntos (separadores de miles) y reemplaza comas decimales por puntos
    return valor.replace(/\./g, '').replace(',', '.');
};

// Función para validar si un número es positivo y tiene hasta dos decimales
export const validarDecimalPositivo = (valor: string): string => {
    // Desformatea el valor ingresado
    const valorSinFormato = desformatearPrecio(valor);
    const regex = /^[0-9]+(\.[0-9]{1,2})?$/; // Solo permite hasta dos decimales

    // Convierte el valor sin formato en un número
    const numberValue = parseFloat(valorSinFormato);

    // Verifica si el valor es mayor que 0 y si sigue el formato correcto
    return !regex.test(valorSinFormato) || numberValue <= 0
        ? 'Debe ser un número positivo entero o con hasta dos decimales'
        : ''; // Si pasa la validación, no muestra error
};


export const validarEnteroPositivo = (valor: string): string => {
     // Si el campo está vacío, no mostrar ningún mensaje de error
    if (valor.trim() === '') return '';
    
    const regex = /^[0-9]+$/; // Solo permite números enteros positivos o 0
    if (!regex.test(valor)) {
        return 'Debe ser un número positivo o cero';
    }

    return '';
};

export const validarStockMedio = (stockMedio: string, stockMinimo: string): string => {
        const stockMedioNum = parseInt(stockMedio, 10);
        const stockMinimoNum = parseInt(stockMinimo, 10);

        console.log('Stock Medio:', stockMedioNum, 'Stock Mínimo:', stockMinimoNum);

        if (isNaN(stockMedioNum) || isNaN(stockMinimoNum)) {
            return 'Valores inválidos'; // Manejo de datos no numéricos
        }
    
        if (stockMedioNum <= stockMinimoNum) {
            console.log('Error porque el stock medio no es mayor que el mínimo');
            return 'El stock medio debe ser mayor que el stock mínimo';
        }
    
        return ''; // Sin errores
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

// Función para validar que el precio sea un número positivo con 2 decimales como máximo
export const validarPrecio = (valor: string): string => {
    const regex = /^\d{1,3}(?:\.\d{3})*(?:,\d{2})?$/; // Acepta precios con formato con separadores de miles
    return regex.test(valor) ? '' : 'Debe ser un precio válido';
};

// Función para dar formato visual al precio
export const formatearNumero = (valor: string): string => {
    // Eliminar cualquier carácter no numérico
    const soloNumeros = valor.replace(/[^\d]/g, '');
    if (!soloNumeros) return ''; // Si no hay número válido, devuelve vacío

    // Convertir a número entero y dividirlo para calcular con decimales
    const numero = parseInt(soloNumeros, 10);

    // Convertir a cadena con formato correcto (dividir en dos decimales)
    const decimalFormateado = (numero / 100).toFixed(2);

    // Dividir la parte entera y la decimal
    const [entero, decimal] = decimalFormateado.split('.');

    // Agregar puntos para la parte entera en el formato de miles
    const enteroConPuntos = entero.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    
    // Devolver la cadena completa con el formato adecuado
    return `${enteroConPuntos},${decimal}`;
};  

//ESPECIFICACIONES
//(!!) convierte cualquier valor en un booleano, por eso !!errores.nombre devuleve un booleano
//!!'' → false
//!!'error' → true
//FORMATEO DE PRECIO
export const formatPrice = (price: string): string => {
    // Intenta convertir el string a un número
    const numericPrice = parseFloat(price.replace(',', '.')); // Reemplaza ',' con '.' si el input tiene coma como separador decimal
  
    // Valida si la conversión fue exitosa
    if (isNaN(numericPrice)) {
      return "Precio no válido"; // Mensaje de error si el string no es un número
    }
  
    // Formatea el número
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
    }).format(numericPrice);
  };