import React, { useState } from 'react';
import axios from 'axios'
import { useNavigate,Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

export default function IniciarSesion() {
  const navigate = useNavigate();
  const [mostrarContrasena, setMostrarContrasena] = useState(false);
  const [usuario, setUsername] = useState('');
  const [contrasena, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [esAdmin, setEsAdmin] = useState(false);

  const toggleMostrarContrasena = () => {
    setMostrarContrasena(!mostrarContrasena);
  };

  function handleSubmit(e) {
    e.preventDefault();
    // Validar campos de formulario antes de enviar
    if (!usuario || !contrasena) {
      setError('Por favor ingrese su usuario y contraseña');
      setTimeout(() => {
        setError("");
    }, 2000);
      return;
    } else {
      const logins = {
        usuario: usuario,
        contra: contrasena
      };

      const fetchData = async () => {
        const response = await axios.post("http://localhost:8080/api/usuarios/login", logins)
            .then(response => {
              if(response!=null || response!=""){  
              console.log(response.data.token);
                localStorage.setItem('token', response.data.token);
                if(usuario=="administrador"){
                  navigate("/vprincipal")
                  console.log("Es admin")
                }else{
                  navigate("/vprincipal")
                  console.log("no es admin")
                }
              }else{
                setError("Usuario o contraseña incorrecta");
                setTimeout(() => {
                  setError("");
              }, 2000);
              }
                

            })
            .catch(error => {
                console.log(error);
                setError("Usuario o contraseña incorrecta");
                setTimeout(() => {
                  setError("");
              }, 2000);
            });
    };
    fetchData();

    return async () => {
        // Realiza cualquier limpieza necesaria
    };



        

    }
  }
  return (
    
    <form onSubmit={handleSubmit}>
      {error && (
                <div className="alert alert-danger text-center" role="alert">
                    {error}
                </div>
            )}
      
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
                onChange={(event) => setUsername(event.target.value)}
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
                  onChange={(event) => setPassword(event.target.value)}
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
                onClick={handleSubmit}
              >
                Ingresar
              </button> <br></br><br></br>
              <Link>¿Olvidaste tu contraseña?</Link>
            </h5>
            
          </form>
        </div>
      </div>
    </form>
  );
}
