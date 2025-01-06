import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import RegistrarMarca from './pages/marca/registrarMarca'; 
import Footer from './components/footer/footer'; 
import MenuAdmin from './components/menuAdmin/menuAdmin';  
import RegistrarSucursal from'./pages/sucursal/registrarSucursal'; 
import RegistrarTalle from'./pages/talle/registrarTalle'; 
import RegistrarColor from'./pages/color/registrarColor'; 
import RegistrarCategoria from'./pages/categoria/registrarCategoria'; 
import Login from'./pages/login/login'; 
import Home from './pages/home/Home';
import Sesion from'./pages/sesion/sesion'; 
import CatalogoProducto from './pages/producto/catalogoProductos';
import { AuthProvider } from './contexts/LoginContext';
import { NotificationProvider } from './contexts/NotificacionContext';
import { MarcaProvider } from './contexts/MarcaContext';
import { SucursalProvider } from './contexts/SucursalContext';
import { ColorProvider } from './contexts/ColorContext';
import { TalleProvider } from './contexts/TalleContext';
import { CategoriaProvider } from './contexts/CategoriaContext';
import { ProductoProvider } from './contexts/ProductoContext';
import Nosotros from './pages/nosotros/nosotros';
import './App.css'
import AppsRami from './subApps/AppsRami'; //  apps rami
import AppsRo from './subApps/AppsRo'; //apps ro
import AppsAbril from './subApps/AppsAbril'; //apps abril
import { CarritoProvider } from './contexts/CarritoContext';

export function App() {
  return (
    <NotificationProvider>
      <Router>
          <AuthProvider>
            <CarritoProvider>
            <div className='contenedorDeTodo'>
              <MenuAdmin/> 
                <Routes>
                  
                <Route path="/appsRami/*" element={<AppsRami />} />
                <Route path="/appsRo/*" element={<AppsRo />} />
                <Route path="/appsAbril/*" element={<AppsAbril />} />

                  <Route path="/registrarMarca"
                  element={
                    <MarcaProvider>
                      <RegistrarMarca />
                    </MarcaProvider>
                  } 
                  />

                  <Route path="/registrarSucursal" 
                  element={
                    <SucursalProvider>
                      <RegistrarSucursal />
                    </SucursalProvider>
                  } />

                  <Route path="/registrarTalle" 
                  element={
                    <TalleProvider>
                      <RegistrarTalle />
                    </TalleProvider>
                  } />

                  <Route path="/registrarColor" 
                  element={
                    <ColorProvider>
                    <RegistrarColor />
                    </ColorProvider>
                  } />

                  <Route path="/registrarCategoria" 
                  element={
                    <CategoriaProvider>
                      <RegistrarCategoria />
                    </CategoriaProvider>
                  } />
                  <Route path="/login" element={<Login />} />
                  <Route path="/sesion" element={<Sesion />} />

                  <Route
                    path="/catalogoProductos"
                    element={
                      
                      <MarcaProvider>
                          <SucursalProvider>
                            <ColorProvider>
                              <TalleProvider>
                                <CategoriaProvider>
                                  <ProductoProvider>
                                    <CatalogoProducto />
                                  </ProductoProvider> 
                                </CategoriaProvider>
                              </TalleProvider>
                            </ColorProvider>
                          </SucursalProvider>
                      </MarcaProvider>
                    }
                  />

                  <Route
                    path="/home"
                    element={
                      <ProductoProvider>
                        <Home />
                      </ProductoProvider>
                    }
                  />

                  <Route path="/" element={<Navigate to="/home" />} />
                  <Route path="/nosotros" element={<Nosotros />} />

                </Routes>
              <Footer/>

            </div>
            </CarritoProvider>
            
          </AuthProvider>
        </Router>
      </NotificationProvider>
  );
}

export default App;



