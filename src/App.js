import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import VentanaPrincipal from './layout/VentanaPrincipal';
import IniciarSesion from './login/IniciarSesion';
import NavBar from './layout/NavBar';
import PedidoCliente from './PedidcoClientes/PedidoCliente';
import Listausuarios from './Usuarios/Listausuarios';
<<<<<<< Updated upstream
import Crearusuario from './Usuarios/Crearusuario';
import EditUsuario from './Usuarios/EditUsuario';
=======
import Inventario from './Inventario/Inventario';
>>>>>>> Stashed changes


function App() {
  return (
    <div className="App">
      
      <Router>

      <Routes>
        <Route exact path="/" element={<IniciarSesion/>}/>
        <Route exact path="/vprincipal" element={<div><NavBar /><VentanaPrincipal /></div>} />
        <Route exact path="/vpedidocliente" element={<div><NavBar /><PedidoCliente /></div>} />
        <Route exact path="/vlcliente" element={<div><NavBar /><Listausuarios /></div>} />
<<<<<<< Updated upstream
        <Route exact path="/vaddcliente" element={<div><NavBar /><Crearusuario /></div>} />
        <Route exact path="/edituser/:id" element={<div><NavBar /><EditUsuario /></div>} />
=======
        <Route exact path="/vInventario" element={<div><NavBar /><Inventario /></div>} />
>>>>>>> Stashed changes
      </Routes>
      
    </Router>
      
    </div>
    
  );
}

export default App;
