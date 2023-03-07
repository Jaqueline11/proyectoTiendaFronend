import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { useNavigate,Link } from "react-router-dom";

export default function NavBar() {
  const navigate = useNavigate();
  function cerrarsesion() {
    localStorage.setItem('token', '');
    navigate('/');

  }
  
  
  return (
    <div>
        <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">TIENDA</a>

    
    
    <div class="dropdown">
      <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
        CAMPOS
      </button>
      <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
      <li><a class="dropdown-item" href="#">INVENTARIO</a></li>
        <li><a class="dropdown-item" href="/vlcliente">EMPLEADOS</a></li>
        <li><a class="dropdown-item" href="#">CLIENTES</a></li>
        <li><a class="dropdown-item" href="#">PROVEEDORES</a></li>
      </ul>
    </div>
    <div class="dropdown">
      <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false">
        REGISTROS
      </button>
      <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton2">
        <li><a class="dropdown-item" href="/vpedidocliente">PEDIDOS CLIENTES</a></li>
        <li><a class="dropdown-item" href="#">PEDIDOS PROVEEDORES</a></li>
      </ul>
    </div>
    <div class="dropdown">
      <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton3" data-bs-toggle="dropdown" aria-expanded="false">
        REPORTES
      </button>
      <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton3">
        <li><a class="dropdown-item" href="/">REPORTE PEDIDOS</a></li>
      </ul>
    </div>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
  <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
    <button onClick={cerrarsesion}>Cerrar Sesion</button>
  </ul>
</div>

  </div>
</nav>

    </div>
  );
}
