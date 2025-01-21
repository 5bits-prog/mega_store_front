import { Routes, Route } from 'react-router-dom';
import Home from '../pages/home/Home';
import Estadisticas from '../pages/estadisticas/estadisticasVentasBarra';
import OpcionesEstadisticas from '../pages/estadisticas/opciones';
import Perfil from '../pages/perfil/perfil';




const AppsAbril = () => {
  return (
    <Routes>
      {/* AGREGAR LA RUTA Y EL COMPONENTE */}
      {/* Ejemplo con home, url 'http://localhost:5173/appsAbril/homeabril' */}
      <Route path="/homeabril" element={<Home />} />
      <Route path="/estadisticas" element={<Estadisticas />} />
      <Route path="/opcionesEstadisticas" element={<OpcionesEstadisticas />} />
      <Route path="/perfil" element={<Perfil />} />
    
     
    </Routes>
  );
};

export default AppsAbril;