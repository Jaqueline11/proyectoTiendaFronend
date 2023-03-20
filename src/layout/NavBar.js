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
  const iniciales=localStorage.getItem('ini');
  const [nombre, setNombre]=useState("");


  
  console.log(iniciales)


  function cerrarsesion() {
    localStorage.setItem('token', '');
    localStorage.setItem('ini', '');
    localStorage.setItem('nombre', '');
    navigate('/');

  }


  return (
    <div>
      <nav class="navbar navbar-expand-lg navbar-dark bg-custom">
        <div class="container-fluid">
          <a class="navbar-brand" href="/vprincipal">TIENDA</a>

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

    </div >
  );
}
