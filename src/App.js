import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import VentanaPrincipal from './layout/VentanaPrincipal';
import IniciarSesion from './login/IniciarSesion';
import NavBar from './layout/NavBar';
import PedidoCliente from './PedidcoClientes/PedidoCliente';
import Listausuarios from './Usuarios/Listausuarios';
import Crearusuario from './Usuarios/Crearusuario';
import EditUsuario from './Usuarios/EditUsuario';
import Inventario from './Inventario/Inventario';
import Proveedores from './Proveedores/Proveedores';
import ListaProveedor from './Proveedores/ListaProveedor';
import EditProveedor from './Proveedores/EditProveedor';
import EditCliente from './Cliente/EditCliente';
import Clientes from './Cliente/Clientes';
import ListaCliente from './Cliente/ListaCliente';
import PedidoProveedor from './PedidoProveedor/PedidoProveedor';

function App() {
  return (
    <div className="App">
      
      <Router>

      <Routes>
        <Route exact path="/" element={<IniciarSesion/>}/>
        <Route exact path="/vprincipal" element={<div><NavBar /><VentanaPrincipal /></div>} />
        <Route exact path="/vpedidocliente" element={<div><NavBar /><PedidoCliente /></div>} />
        <Route exact path="/vlcliente" element={<div><NavBar /><Listausuarios /></div>} />
        <Route exact path="/vaddcliente" element={<div><NavBar /><Crearusuario /></div>} />
        <Route exact path="/edituser/:id" element={<div><NavBar /><EditUsuario /></div>} />
        <Route exact path="/vInventario" element={<div><NavBar /><Inventario /></div>} />
        <Route exact path="/vProveedores" element={<div><NavBar /><Proveedores /></div>} />
        <Route exact path="/vListaProveedor" element={<div><NavBar /><ListaProveedor /></div>} />
        <Route exact path="/editProveedor/:id_proveedor" element={<div><NavBar /><EditProveedor /></div>} />
        <Route exact path="/vCliente" element={<div><NavBar /><Clientes/></div>} />
        <Route exact path="/vListaCliente" element={<div><NavBar /><ListaCliente /></div>} />
        <Route exact path="/editCliente/:id_cliente" element={<div><NavBar /><EditCliente /></div>} />
        <Route exact path="/vpedidoproveedor" element={<div><NavBar /><PedidoProveedor /></div>} />
      </Routes>
      
    </Router>
      
    </div>
    
  );
}

export default App;
