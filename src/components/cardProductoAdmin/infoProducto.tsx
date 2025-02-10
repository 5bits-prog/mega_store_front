// src/components/ModalProducto.tsx
import React from 'react';
import { Dialog, DialogActions, DialogContent, Button } from '@mui/material';
import style from './infoProducto.module.css'; 
import { Sucursal } from '../../pages/producto/interfazProducto';

interface Props extends Sucursal {
  // Añadir aquí cualquier otra propiedad necesaria
}

interface InfoProductoProps {
  open: boolean;
  producto: {
    descripcion: string;
    stockActual: number;
    stockMedio: number;
    stockMinimo: number;
    categoriaId: number;
    marcaId: number;
    colorId: number;
    talleId: number;
    sucursales?: Sucursal[];
  };
  onClose: () => void;
}

const InfoProducto: React.FC<InfoProductoProps> = ({ open, producto, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent>
        <div className={style.container}>
            <h2 className={style.titulazo}>INFORMACIÓN DEL PRODUCTO</h2>
              <div className={style.contDescripGeneral}>
                <div className={style.titles}>DESCRIPCIÓN</div>  
                  {producto.descripcion}
                    <div className={style.titles}>STOCK</div>
                      <table className={style.tabla}>
                        <thead>
                          <tr>
                            <th scope="col">Actual</th>
                            <th scope="col">Medio</th>
                            <th scope="col">Mínimo</th>
                          </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{producto.stockActual ?? "N/A"}</td>
                          <td>{producto.stockMedio ?? "N/A"}</td>
                          <td>{producto.stockMinimo ?? "N/A"}</td>
                        </tr>
                      </tbody>
                    </table>
                    <div className={style.titles}>INFORMACIÓN</div>
                      <table className={style.tabla}>
                        <thead>
                          <tr>
                            <th>Categoría</th>
                            <th>Marca</th>
                            <th>Color</th>
                            <th>Talle</th>
                          </tr>
                        </thead>
                      <tbody>
                        <tr>
                          <td>{producto.categoriaId}</td>
                          <td>{producto.marcaId}</td>
                          <td>{producto.colorId}</td>
                          <td>{producto.talleId}</td>
                        </tr>
                      </tbody>
                    </table>
                  <div className={style.titles}>STOCK POR SUCURSAL</div>
                  {(producto.sucursales ?? []).map((sucursal, index) => (
                  <div key={index}>
                    <strong>{sucursal.nombreSucursal}</strong>: {sucursal.cantidad}
                  </div>
                ))}
              </div>
           
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">Cerrar </Button>
      </DialogActions>
    </Dialog>
  );
};

export default InfoProducto;

        