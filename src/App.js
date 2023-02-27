import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import VentanaPrincipal from './layout/VentanaPrincipal';
import IniciarSesion from './login/IniciarSesion';
import NavBar from './layout/NavBar';
import PedidoCliente from './PedidcoClientes/PedidoCliente';


function App() {
  return (
    <div className="App">
      
      <Router>

      <Routes>
        <Route exact path="/" element={<IniciarSesion/>}/>
        <Route exact path="/vprincipal" element={<div><NavBar /><VentanaPrincipal /></div>} />
        <Route exact path="/vpedidocliente" element={<div><NavBar /><PedidoCliente /></div>} />
      </Routes>
      
    </Router>
      
    </div>
    
  );
}

export default App;
