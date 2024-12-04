import { Routes, Route } from 'react-router-dom';
import Home from '../pages/home/Home';



const AppsAbril = () => {
  return (
    <Routes>
      {/* AGREGAR LA RUTA Y EL COMPONENTE */}
      {/* Ejemplo con home, url 'http://localhost:5173/appsAbril/homeabril' */}
      <Route path="/homeabril" element={<Home />} />
     
    </Routes>
  );
};

export default AppsAbril;