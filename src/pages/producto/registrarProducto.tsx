import style from './registrarProducto.module.css';
import React, { useState } from 'react';
import { TextField, Button, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { validarAlfanumerico, validarDecimalPositivo, validarEnteroPositivo, validarCampoRequerido, validarCampoSeleccionado, validarImagenProducto } from './validationsProducto';
import { Producto } from './interfazProducto';


interface RegistrarProductoProps {
    agregarProducto: (producto: any) => void; // Define la función como prop

}

const RegistrarProducto = () => {
    // Estados para almacenar las selecciones del formulario
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [precio, setPrecio] = useState('');
    const [peso, setPeso] = useState('');
    const [categoria, setCategoria] = useState('');
    const [sucursal, setSucursal] = useState('');
    const [marca, setMarca] = useState('');
    const [talle, setTalle] = useState('');
    const [color, setColor] = useState('');
    const [stockActual, setStockActual] = useState('');
    const [stockMedio, setStockMedio] = useState('');
    const [stockMinimo, setStockMinimo] = useState('');
    const [foto, setFoto] = useState<File | null>(null);  // Estado para almacenar la imagen
    const [preview, setPreview] = useState<string | null>(null);  // Estado para la previsualización 
    const [fileName, setFileName] = useState('');  // Para mostrar el nombre del archivo seleccionado
    const [errores, setErrores] = useState({
        nombre: '',
        descripcion: '',
        precio: '',
        peso: '',
        stockActual: '',
        stockMedio: '',
        stockMinimo: '',
        categoria: '',
        foto: '',
    });

    // Listas de opciones para las categorías, sucursales, marcas, talles y colores (simuladas)
    const categorias = ['Jean', 'Remera', 'Pollera', 'Musculosa'];
    const sucursales = ['Sucursal 1', 'Sucursal 2', 'Sucursal 3'];
    const marcas = ['Marca A', 'Marca B', 'Marca C'];
    const talles = ['XS', 'S', 'M', 'L', 'XL'];
    const colores = ['Rojo', 'Azul', 'Verde', 'Negro'];
    const [producto, setProducto] = useState<Producto>({
        nombre: '',
        descripcion: '',
        precio: 1,
        peso: 1,
        categoria: '',
        sucursal: '',
        marca: '',
        talle: '',
        color: '',
        stockActual: 0,
        stockMedio:0,
        stockMinimo:0,
        foto: ''
    });
    // Función para el envío del formulario
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        // Validaciones
        const errores = {
            nombre: validarCampoRequerido(nombre) || validarAlfanumerico(nombre),
            descripcion: validarAlfanumerico(descripcion),
            precio: validarCampoRequerido(precio) || validarDecimalPositivo(precio),
            peso: validarCampoRequerido(peso) || validarDecimalPositivo(peso),
            stockActual: validarEnteroPositivo(stockActual),
            stockMedio: validarEnteroPositivo(stockMedio),
            stockMinimo: validarEnteroPositivo(stockMinimo),
            categoria: validarCampoSeleccionado(categoria),
            foto: validarImagenProducto(foto), // Valida la imagen del producto
        };
        setErrores(errores);

        // Chequear si hay errores
        const sinErrores = Object.values(errores).every(error => error === '');

        if (sinErrores) {
            const nuevoProducto = {
                nombre,
                descripcion,
                precio,
                peso,
                categoria,
                sucursal,
                marca,
                talle,
                color,
                stockActual,
                stockMedio,
                stockMinimo,
                foto: URL.createObjectURL(foto!),  // Crear URL temporal de la foto
            };
            //agregarProducto(nuevoProducto); // Aquí se llama a la función agregarProducto

            // Limpiar los campos del formulario
            setNombre('');
            setDescripcion('');
            setPrecio('');
            setPeso('');
            setCategoria('');
            setSucursal('');
            setMarca('');
            setTalle('');
            setColor('');
            setStockActual('');
            setStockMedio('');
            setStockMinimo('');
            setFoto(null);
            setPreview(null);
            setFileName('');
        } else {
            console.log('Errores en el formulario');
        }

        // Lógica para enviar los datos al backend y si no hay errores sigue.
        console.log({ nombre, descripcion, categoria, sucursal, marca, talle, color, stockActual, stockMedio, stockMinimo, foto });
    };

    // Función para manejar la carga de imagen y la previsualización
    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];  // Obtenemos el primer archivo seleccionado
        if (file) {
            setFoto(file);  //Se guarda el archivo en el estado
            setFileName(file.name); //Se guarda el nombre del archivo

            // FileReader: para mostrar la previsualización de la imagen
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string);  //Se guarda el resultado de la lectura como previsualización
            };
            reader.readAsDataURL(file);  // Lee el archivo como una URL de datos
        }
    };

    return (
        <div className={style.container}>
            <h1>Registrar Producto</h1>
            <form className={style.form} onSubmit={handleSubmit}>
                {/* Campo para ingresar el nombre del producto */}
                <TextField
                    className={style.input}
                    label="Nombre"
                    variant="outlined"
                    fullWidth
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    error={!!errores.nombre}
                    helperText={errores.nombre}
                    margin="normal"
                />
                {/* Campo para ingresar la descripción del producto */}
                <TextField
                    className={style.input}
                    label="Descripción"
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                    error={!!errores.descripcion}
                    helperText={errores.descripcion}
                    margin="normal"
                />
                <TextField
                    className={style.input}
                    label="Precio"
                    value={precio}
                    onChange={(e) => setPrecio(e.target.value)}
                    error={!!errores.precio}
                    helperText={errores.precio}
                    margin="normal"
                />
                <TextField
                    className={style.input}
                    label="Peso en gramos"
                    value={peso}
                    onChange={(e) => setPeso(e.target.value)}
                    error={!!errores.peso}
                    helperText={errores.peso}
                    margin="normal"
                />
                {/* Select para Categoría */}
                <FormControl fullWidth margin="normal">
                    <InputLabel className={style.input} id="categoria-label">Categoría</InputLabel>
                    <Select
                        labelId="categoria-label"
                        value={categoria}
                        onChange={(e) => setCategoria(e.target.value)}
                        label="Categoría"
                    >
                        {categorias.map((cat, index) => (
                            <MenuItem key={index} value={cat}>
                                {cat}
                            </MenuItem>
                        ))}
                    </Select>
                    {errores.categoria && <p className={style.error}>{errores.categoria}</p>}
                </FormControl>

                {/* Select para Sucursal */}
                <FormControl fullWidth margin="normal">
                    <InputLabel className={style.input} id="sucursal-label">Sucursal</InputLabel>
                    <Select
                        labelId="sucursal-label"
                        value={sucursal}
                        onChange={(e) => setSucursal(e.target.value)}
                        label="Sucursal"
                    >
                        {sucursales.map((suc, index) => (
                            <MenuItem key={index} value={suc}>
                                {suc}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                {/* Select para Marca */}
                <FormControl fullWidth margin="normal">
                    <InputLabel className={style.input} id="marca-label">Marca</InputLabel>
                    <Select
                        labelId="marca-label"
                        value={marca}
                        onChange={(e) => setMarca(e.target.value)}
                        label="Marca"
                    >
                        {marcas.map((m, index) => (
                            <MenuItem key={index} value={m}>
                                {m}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                
                {/* Select para Talle */}
                <FormControl fullWidth margin="normal">
                    <InputLabel className={style.input} id="talle-label">Talle</InputLabel>
                    <Select
                        labelId="talle-label"
                        value={talle}
                        onChange={(e) => setTalle(e.target.value)}
                        label="Talle"
                    >
                        {talles.map((t, index) => (
                            <MenuItem key={index} value={t}>
                                {t}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                {/* Select para Color */}
                <FormControl fullWidth margin="normal">
                    <InputLabel className={style.input} id="color-label">Color</InputLabel>
                    <Select
                        labelId="color-label"
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                        label="Color"
                    >
                        {colores.map((c, index) => (
                            <MenuItem key={index} value={c}>
                                {c}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                {/*campo para el stock actual*/}
                <TextField
                    className={style.input}
                    label="Stock Actual"
                    value={stockActual}
                    onChange={(e) => setStockActual(e.target.value)}
                    error={!!errores.stockActual}
                    helperText={errores.stockActual}
                    margin="normal"
                />

                {/*campo para el stock medio*/}
                <TextField
                    className={style.input}
                    label="Stock Medio"
                    value={stockMedio}
                    onChange={(e) => setStockMedio(e.target.value)}
                    margin="normal"
                />
                {/*campo para el stock mínimo*/}
                <TextField
                    className={style.input}
                    label="Stock Mínimo"
                    value={stockMinimo}
                    onChange={(e) => setStockMinimo(e.target.value)}
                    margin="normal"
                />

                 {/* Campo personalizado para subir archivo */}
        <FormControl fullWidth error={!!errores.foto} margin="normal">
            <input
                type="file"
                accept="image/jpeg, image/png" // Solo .jpg o .jpeg y .png
                id="file-upload"
                style={{ display: 'none' }}  // Ocultamos el input original
                onChange={handleImageChange}
            />
            <label htmlFor="file-upload">
            <Button 
            sx={{
            alignItems:'center',
            backgroundColor: '#c49dd7', // Color lila
            color: 'white',
            '&:hover': {
            backgroundColor: '#b284c4', // Color lila más oscuro al pasar el mouse
            },
            }}
            variant="contained"
            component="span"  // Actúa como disparador del input
            >
            {fileName || 'Cargar imagen'}
                    </Button>
                    </label>
                    {errores.foto && <p className={style.error}>{errores.foto}</p>}
            </FormControl>

            {/* Previsualización de la imagen seleccionada */}
            {preview && (
                <div>
                    <img src={preview} alt="Previsualización" style={{ maxHeight: '200px', marginTop: '10px' }} />
                </div>
            )}
                <Button 
                type="submit" 
                variant="contained" 
                onClick={()=> handleSubmit}
                
                sx={{
                    backgroundColor: '#c49dd7',  // Color lila de fondo
                    color: 'white',  // Color del texto
                    fontWeight: 'bold',
                    padding: '10px',
                    borderRadius: '5px',
                    textTransform: 'uppercase',
                    '&:hover': {
                      backgroundColor: '#b284c4',  // Lila más oscuro al hacer hover
                    }
                }} 

                >
                Registrar Producto
                </Button >
            </form>
        </div>
    );
};

export default RegistrarProducto