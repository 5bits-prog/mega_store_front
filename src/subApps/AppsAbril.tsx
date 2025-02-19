import { Routes, Route } from 'react-router-dom';
import Home from '../pages/home/Home';
import EstadisticasVentas from '../pages/estadisticas/estadisticasVentas';
import EstadisticasClientes from '../pages/estadisticas/estadisticasClientes';
import OpcionesEstadisticas from '../pages/estadisticas/opciones';
import Perfil from '../pages/perfil/perfil';




const AppsAbril = () => {
  return (
    <Routes>
      {/* AGREGAR LA RUTA Y EL COMPONENTE */}
      {/* Ejemplo con home, url 'http://localhost:5173/appsAbril/homeabril' */}
      <Route path="/homeabril" element={<Home />} />
      <Route path="/estadisticasVentas" element={<EstadisticasVentas />} />
      <Route path="/estadisticasClientes" element={<EstadisticasClientes />} />
      <Route path="/opcionesEstadisticas" element={<OpcionesEstadisticas />} />
      <Route path="/perfil" element={<Perfil />} />
    
     
    </Routes>
  );
};

export default AppsAbril;