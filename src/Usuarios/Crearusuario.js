import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from "react-router-dom";


export default function Crearusuario() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [mostrarContrasena, setMostrarContrasena] = useState(false);
  const [mostrarContrasena2, setMostrarContrasena2] = useState(false);
  const [rcontra, setRcontra] = useState(null);
  const [usuarioexiste,setUsuarioexiste]=useState(null);
  const { id } = useParams();

  const [user, setUser] = useState({
    usuario: null,
    contra: null,
    persona: {
      nombre: null,
      apellido: null,
      cedula: null,
      direccion: null,
      genero: null
    }
  });
  console.log(id);

  const Registrar = async (event) => {
    event.preventDefault();
    const cedulaValida = /^\d{10}$/.test(user.persona.cedula);
    var val;
    await axios.get('http://localhost:8080/api/usuarios/validarusuario', {
      params: {
        usuario: user.usuario,

      }
    })
      .then(response => {
        console.log(response.data);
        if (response.data == true) {
          val = response.data;
        } else {
          val = response.data;
        }

      })


    if (val == false) {
      if (user.contra == rcontra) {
        if (user.usuario != null && user.persona.cedula != null && user.persona.direccion != null && user.persona.nombre != null && user.persona.apellido != null && user.persona.genero != null && rcontra != null) {
          if (cedulaValida == true) {
            const result = await axios.post("http://localhost:8080/api/usuarios/crearusuario", user);
            console.log(result.data);
            navigate('/vlcliente')
          } else {
            setError("Cedula incorrecta");
            setTimeout(() => {
              setError("")
            }, 2000);
          }

        } else {
          setError("Datos incompletos");
          setTimeout(() => {
            setError("")
          }, 2000);
        }
      } else {
        setError("CONTRASEÑAS NO COINCIDEN");
        setTimeout(() => {
          setError("")
        }, 2000);
      }
    } else {
      setError("NOMBRE DE USUARIO NO DISPONIBLE");
      setTimeout(() => {
        setError("")
      }, 2000);
    }

  }

  function cancelar() {
    navigate('/vlcliente');
  }

  const toggleMostrarContrasena = () => {
    setMostrarContrasena(!mostrarContrasena);
  };
  const toggleMostrarContrasena2 = () => {
    setMostrarContrasena2(!mostrarContrasena2);
  };
  const handleCedulaChange = (event) => {
    const nuevaCedula = event.target.value;
    setUser((prevState) => ({
      ...prevState,
      persona: {
        ...prevState.persona,
        cedula: nuevaCedula,
      },
    }));
  };

  const handlenombreChange = (event) => {
    const nuevaCedula = event.target.value;
    setUser((prevState) => ({
      ...prevState,
      persona: {
        ...prevState.persona,
        nombre: nuevaCedula,
      },
    }));
  };

  const handleapellidoChange = (event) => {
    const nuevaCedula = event.target.value;
    setUser((prevState) => ({
      ...prevState,
      persona: {
        ...prevState.persona,
        apellido: nuevaCedula,
      },
    }));
  };

  const handledireccionChange = (event) => {
    const nuevaCedula = event.target.value;
    setUser((prevState) => ({
      ...prevState,
      persona: {
        ...prevState.persona,
        direccion: nuevaCedula,
      },
    }));
  };
  const handlegeneroChange = (event) => {
    const nuevaCedula = event.target.value;
    setUser((prevState) => ({
      ...prevState,
      persona: {
        ...prevState.persona,
        genero: nuevaCedula,
      },
    }));
  };



  return (

    <div className="container" style={{ marginTop: "50px" }}>
      {error && (
        <div className="alert alert-danger text-center" role="alert">
          {error}
        </div>
      )}
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4"> Registro de Usuario</h2>
          <form onSubmit={(e) => Registrar(e)}>
            <div>
              <br></br>
              Cédula:
              <input
                placeholder="Ingrese su cedula"
                value={user.persona.cedula}
                onChange={handleCedulaChange}
                style={{ marginLeft: "20px", marginRight: "5px", width: "160px" }}
                type="number"
                maxLength={10}
                onInput={(e) => {
                  e.target.value = e.target.value.slice(0, 10)
                }} />
              Dirección:
              <input
                placeholder="Ingrese la direccion"
                value={user.persona.direccion}
                onChange={handledireccionChange}
                style={{ marginLeft: "10px", marginTop: "3px", width: "160px" }} />
              <br />
              Nombre: 
              <input
                style={{ marginLeft: "10px", marginRight: "5px", marginTop: "3px", width: "160px" }}
                placeholder="Ingrese el nombre"
                value={user.persona.nombre}
                onChange={handlenombreChange} />
              Apellido:
              <input
                placeholder="Ingrese el apellido"
                value={user.persona.apellido}
                onChange={handleapellidoChange}
                style={{ marginLeft: "18px", marginTop: "3px", width: "160px" }} />
              <br />
              Género:
              <select
                value={user.persona.genero}
                onChange={handlegeneroChange}
                style={{ marginLeft: "17px", marginTop: "3px", width: "160px" }} >
                <option value="">Seleccione</option>
                <option value="MASCULINO">Masculino</option>
                <option value="FEMENINO">Femenino</option>
                <option value="OTRO">Otro</option>
              </select>
              <br></br>
              <label style={{ marginLeft: "100px", marginTop: "10px" }}>Usuario:</label>
              <input
                placeholder="Ingrese el usuario"
                value={user.usuario}
                onChange={(e) => setUser({ ...user, usuario: e.target.value })}
                style={{ marginLeft: "5px", marginTop: "10px" }} />
              <br />
              <label style={{ marginLeft: "75px" }}>Contraseña:</label>
              <input
                value={user.contra}
                onChange={(e) => setUser({ ...user, contra: e.target.value })}
                type={mostrarContrasena ? 'text' : 'password'}
                style={{ width: "34%", marginLeft: "5px", marginTop: "3px" }}
              />
              <button
                type="button"
                onClick={toggleMostrarContrasena}
              >
                <FontAwesomeIcon
                  icon={mostrarContrasena ? faEyeSlash : faEye}
                  className={mostrarContrasena ? 'ojo-cerrado' : ''}
                />
              </button>
              <br></br>
              <label style={{ marginLeft: "21px" }}>Repetir Contraseña:</label>
              <input
                value={rcontra}
                onChange={(e) => setRcontra(e.target.value)}
                type={mostrarContrasena2 ? 'text' : 'password'}
                style={{ width: "34%", marginLeft: "5px", marginTop: "3px" }}
              />
              <button
                type="button"
                onClick={toggleMostrarContrasena2}
              >
                <FontAwesomeIcon
                  icon={mostrarContrasena2 ? faEyeSlash : faEye}
                  className={mostrarContrasena2 ? 'ojo-cerrado' : ''}
                />
              </button>
              <br /><br />
              <button style={{ marginLeft: "170px" }} type="submit" className="btn btn-outline-primary" >GUARDAR</button>
              <button style={{ marginLeft: "20px" }} className="btn btn-danger mx-2" onClick={cancelar}>CANCELAR</button>



            </div>
          </form>
        </div>

      </div>

    </div>
  )
}
