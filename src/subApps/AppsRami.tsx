import { Routes, Route} from 'react-router-dom';
import Nosotros from '../pages/nosotros/nosotros';
import ProductoEspecifico from '../pages/producto/ProductoEspecifico';
import { ProductoProvider } from '../contexts/ProductoContext';
import CarritoCompras from '../pages/carrito/carritoCompras';
import MercadoPago from '../pages/mercadoPago/MercadoPago';
import { VentaProvider } from '../contexts/VentaContext';


const AppsRami = () => {
  return (
    <Routes>
      
      <Route path="/nosotros" element={<Nosotros />} />
      
      <Route path="/carrito" 
          element={
          <VentaProvider>
            <CarritoCompras />
          </VentaProvider>} 
      />

      <Route path="productoEspecifico/:id" 
            element={
            <ProductoProvider>
              <ProductoEspecifico />
            </ProductoProvider>
            } 
      />
      <Route path='/mercadoPago' element={<MercadoPago/>} />
     
    </Routes>
  );
};

export default AppsRami;