import { Routes, Route} from 'react-router-dom';
import Nosotros from '../pages/nosotros/nosotros';
import ProductoEspecifico from '../pages/producto/ProductoEspecifico';
import { ProductoProvider } from '../contexts/ProductoContext';
import CarritoCompras from '../pages/carrito/carritoCompras';


const AppsRami = () => {
  return (
    <Routes>
      
      <Route path="/nosotros" element={<Nosotros />} />
      <Route path="/carrito" element={<CarritoCompras />} />
      <Route path="productoEspecifico/:id" 
            element={
            <ProductoProvider>
              <ProductoEspecifico />
            </ProductoProvider>
            } 
      />
     
    </Routes>
  );
};

export default AppsRami;