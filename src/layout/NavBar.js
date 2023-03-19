import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBox, faUsers, faUser, faTruck, faShoppingCart, faShippingFast, faChartBar, faColumns, faFileAlt, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import './Estilo.css';
import axios from 'axios';

export default function NavBar() {
  const navigate = useNavigate();
  const admin = localStorage.getItem('rol');
  const usuario=localStorage.getItem('user');
  const [iniciales, setIniciales]=useState("")
  const [nombre, setNombre]=useState("");
  
  const loadUser = async () => {
    const result = await axios.get(`http://localhost:8080/api/usuarios/getusuario/${usuario}`);
    console.log(result.data)
    const n=result.data.persona.nombre+' '+ result.data.persona.apellido;
    setNombre(n);
    const nombres = result.data.persona.nombre;
    const apellidos = result.data.persona.apellido;
    const iniciales = nombres.charAt(0) + apellidos.charAt(0);
    setIniciales(iniciales);
};
loadUser();

  function cerrarsesion() {
    localStorage.setItem('token', '');
    navigate('/');

  }


  return (
    <div>
      <nav class="navbar navbar-expand-lg navbar-dark bg-custom">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">TIENDA</a>

          <div class="dropdown">
            <button style={{ marginRight: "10px" }} class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
              <FontAwesomeIcon icon={faColumns} />
              CAMPOS
            </button>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">


              <li><a class="dropdown-item" href="/vInventario"><FontAwesomeIcon icon={faBox} /> INVENTARIO</a></li>

              {admin == "admin" ?
                <li><a class="dropdown-item" href="/vlcliente"><FontAwesomeIcon icon={faUsers} /> EMPLEADOS</a></li>
                : null}

              <li><a class="dropdown-item" href="/vListaCliente"><FontAwesomeIcon icon={faUser} /> CLIENTES</a></li>

              <li><a class="dropdown-item" href="/vlistaproveedor"><FontAwesomeIcon icon={faTruck} /> PROVEEDORES</a></li>

            </ul>
          </div>
          <div class="dropdown">
            <button style={{ marginRight: "10px" }} class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false">
              <FontAwesomeIcon icon={faFileAlt} /> REGISTROS
            </button>

            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton2">
              <li><a class="dropdown-item" href="/vpedidocliente"><FontAwesomeIcon icon={faShoppingCart} /> PEDIDOS CLIENTES</a></li>
              <li><a class="dropdown-item" href="/vpedidoproveedor"><FontAwesomeIcon icon={faShippingFast} /> PEDIDOS PROVEEDORES</a></li>

            </ul>
          </div>
          <div class="dropdown">
            <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton3" data-bs-toggle="dropdown" aria-expanded="false">
              <FontAwesomeIcon icon={faChartBar} /> REPORTES
            </button>

            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton3">
              <li><a class="dropdown-item" href="reportesp"><FontAwesomeIcon icon={faChartBar}/> REPORTE PEDIDOS</a></li>
              <li><a class="dropdown-item" href="reportes"><FontAwesomeIcon icon={faChartBar} />REPORTE CLIENTE</a></li>

            </ul>
          </div>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav ms-auto mb-2 mb-lg-0">

              <div className="menu-containers">
                <div className="user-initialss">{iniciales}</div>
                <div className="dropdown-menus">
                  <button onClick={cerrarsesion} style={{width:"100px"}} >
                    <FontAwesomeIcon icon={faSignOutAlt} /> Cerrar Sesión
                  </button>
                </div>
              </div>



            </ul>
          </div>

        </div>

      </nav >
      {nombre}

    </div >
  );
}
