import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from "react-router-dom";

export default function EditUsuario() {
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [mostrarContrasena, setMostrarContrasena] = useState(false);
    const [mostrarContrasena2, setMostrarContrasena2] = useState(false);
    const [rcontra, setRcontra] = useState(null);
    const [user, setUser] = useState({
        id_usuarios: null,
        usuario: null,
        contra: null,
        persona: {
            id: null,
            nombre: null,
            apellido: null,
            cedula: null,
            direccion: null,
            genero: null
        }
    });
    const id = useParams();

    const Registrar = async (e) => {
        e.preventDefault();
        const cedulaValida = /^\d{10}$/.test(user.persona.cedula);

        if (user.contra == rcontra) {
            if (user.usuario != null && user.persona.cedula != null && user.persona.direccion != null && user.persona.nombre != null && user.persona.apellido != null && user.persona.genero != null && rcontra != null) {
                if (cedulaValida == true) {
                    if (window.confirm('¿Estas seguro que quieres editar el usuario?')) {
                        e.preventDefault();

                        await axios.put(`http://localhost:8080/api/usuarios/modificausuario/${id.id}`, user, {

                        }).then(response => {
                            console.log(response);
                        })
                            .catch(error => {
                                console.log(error);
                            });
                            navigate('/vlcliente')
                    } else {
                        console.log(user)
                    }
                } else {
                    setError("Cedula Invalida");
                    setTimeout(() => {
                        setError("")
                    }, 2000);
                }
            } else {
                setError("Datos Incompletos");
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

    const CargarDatos = async () => {
        const result = await axios.get(`http://localhost:8080/api/usuarios/getusuario/${id.id}`);
        setUser({
            ...result.data,
            contra:''
        });
        
    };

    useEffect(() => {

        CargarDatos();

    }, []);
    return (
        <div className="container" style={{ marginTop: "50px" }}>
            {error && (
                <div className="alert alert-danger text-center" role="alert">
                    {error}
                </div>
            )}
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                    <h2 className="text-center m-4"> Modificar Usuario</h2>
                    <form onSubmit={(e) => Registrar(e)}>
                        <div>
                            <br></br>
                            Cedula:
                            <input
                                placeholder="Ingrese su cedula"
                                value={user.persona.cedula}
                                onChange={handleCedulaChange}
                                style={{ marginLeft: "20px", marginRight: "5px", width: "160px" }}
                                type="number"
                                maxLength={10}
                                onInput={(e) => {
                                    e.target.value = e.target.value.slice(0, 10)
                                }}
                                readOnly />
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
                                readOnly
                                onChange={handlenombreChange} />
                            Apellido:
                            <input
                                placeholder="Ingrese el apellido"
                                value={user.persona.apellido}
                                readOnly
                                onChange={handleapellidoChange}
                                style={{ marginLeft: "18px", marginTop: "3px", width: "160px" }} />
                            <br />
                            Genero:
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
                                style={{ marginLeft: "5px", marginTop: "10px" }}
                                readOnly
                                />
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
                            <button style={{ marginLeft: "20px" }} className="btn btn-outline-primary" onClick={cancelar}>CANCELAR</button>



                        </div>
                    </form>
                </div>

            </div>

        </div>
    )
}
