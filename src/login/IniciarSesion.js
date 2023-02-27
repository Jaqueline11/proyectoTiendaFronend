import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

export default function IniciarSesion() {
  const navigate = useNavigate();
  const [mostrarContrasena, setMostrarContrasena] = useState(false);

  const toggleMostrarContrasena = () => {
    setMostrarContrasena(!mostrarContrasena);
  };

  return (
    <div className="container  py-5">
      <div className="col-md-4 border rounded p-4 mt-2 shadow vh-75 mx-auto">
        <h2 className="text-center m-4"> Iniciar sesión</h2>
        <form>
          <div className="mb-3">
            <label htmlFor="usuario" className="titulo-label" >Usuario:</label>
            <br />
            <input
              type="text"
              id="usuario"
              className="form-control"
              placeholder="Ingrese su usuario"
            />
          </div><br />
          <div className="mb-3">
            <label htmlFor="contrasena" className="titulo-label" >Contraseña:</label>
            <br />
            <div className="input-group">
              <input
                type={mostrarContrasena ? 'text' : 'password'}
                id="contrasena"
                className="form-control"
               
              />
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={toggleMostrarContrasena}
              >
                <FontAwesomeIcon
                  icon={mostrarContrasena ? faEyeSlash : faEye}
                  className={mostrarContrasena ? 'ojo-cerrado' : ''}
                />
              </button>
            </div>
          </div>
          <br />
          <h5 className="text-center m-4">
            <button
              className="boton-color"
              onClick={() => navigate("/vprincipal")}
            >
              Ingresar
            </button>
          </h5>
        </form>
      </div>
    </div>
  );
}
