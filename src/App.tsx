import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegistrarMarca from './pages/marca/registrarMarca'; 
import Footer from './components/footer/footer'; 
//import Menu from './components/menu/menu'; 
import MenuAdmin from './components/menuAdmin/menuAdmin';  
import RegistrarSucursal from'./pages/sucursal/registrarSucursal'; 
import RegistrarTalle from'./pages/talle/registrarTalle'; 
import RegistrarColor from'./pages/color/registrarColor'; 
import RegistrarCategoria from'./pages/categoria/registrarCategoria'; 
import Login from'./pages/login/login'; 
import Register from'./pages/register/register'; 
import Sesion from'./pages/sesion/sesion'; 



export function App() {
  return (
  <Router>
    <MenuAdmin/> 
      <Routes>
        <Route path="/registrarMarca" element={<RegistrarMarca />} />
        <Route path="/registrarSucursal" element={<RegistrarSucursal />} />
        <Route path="/registrarTalle" element={<RegistrarTalle />} />
        <Route path="/registrarColor" element={<RegistrarColor />} />
        <Route path="/registrarCategoria" element={<RegistrarCategoria />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/sesion" element={<Sesion />} />
        
      </Routes>
      
    <Footer/>
  </Router>
        
      
    
  );
}

export default App;



