import { Routes, Route} from 'react-router-dom';
import Nosotros from '../pages/nosotros/nosotros';


const AppsRami = () => {
  return (
    <Routes>
      
      <Route path="/nosotros" element={<Nosotros />} />
     
    </Routes>
  );
};

export default AppsRami;