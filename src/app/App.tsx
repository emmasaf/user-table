import Footer from '../features/footer/Footer';
import Navbar from '../features/navbar/Menu';
import './styles/App.css';
import { Route, Routes } from 'react-router-dom'
import {routesArray} from '../entities/routesArray'

function App() {
  return (
    <div className="App">
     <Navbar/>
     <Routes>
          {routesArray.map(({ id, component, path }) => {
            return (
              <Route key={id} path={path} Component={component}/>
            )
          })}
      </Routes>
     {/* <Footer/> */}
    </div>
  );
}

export default App;
