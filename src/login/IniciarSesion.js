import React from 'react'
import { useNavigate } from "react-router-dom";

export default function IniciarSesion() {
    const navigate = useNavigate();
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
            <h2 className="text-center m-4"> Iniciar sesión</h2>
            <form>
            <div className="mb-3">
              <br></br>
              <input
                type="text"
                id="usuario"
                className="form-control"
                placeholder="Ingrese su usuario"
              />
            </div>       
            <div className="mb-3">
              <br></br>
              <input
                type="password"
                id="contrasena"
                className="form-control"
                placeholder="Ingrese su contraseña"
              />
            </div>
            <br></br>
            <button type="submit" className="btn btn-outline-primary" onClick={() => navigate("/vprincipal")} >
              Ingresar
            </button>
            
            <br></br><br></br>
            </form>
          </div>
  
        </div>
  
      </div>
  
      
    )
}
