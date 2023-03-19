import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from "react-router-dom";


export default function Proveedores() {
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const { id } = useParams();
    const [user, setUser] = useState({
        nombre_comercial: null,
        celular: null,
        estado:true,
        persona: {
            nombre: null,
            apellido: null,
            cedula: null,
            direccion: null,
            genero: null
        }
    });
    console.log(id);


    /** */
    axios.interceptors.request.use(
        config => {
            const token = localStorage.getItem('token');
            if (token == "") {
                setError("Token No encontrado");

                setTimeout(() => {
                    navigate('/')
                }, 2000);

            }

            if (token) {
                config.headers['Authorization'] = `Bearer ${token}`;
            }
            return config;
        },
        error => Promise.reject(error)

    );
    /** */

    const Registrar = async (event) => {
        event.preventDefault();
        const cedulaValida = /^\d{10}$/.test(user.persona.cedula);
        console.log(user)
        if (user.persona.cedula != null && user.persona.direccion != null && user.persona.nombre != null && user.persona.apellido != null && user.persona.genero != null && user.nombre_comercial != null && user.celular != null) {
            if (cedulaValida == true) {
                const result = await axios.post("http://localhost:8080/api/proveedor/crearproveedor", user);
                console.log(result.data);
                
                navigate('/vListaProveedor')
            } else {
                setError("Cedula incorrecta");
                setTimeout(() => {
                    setError("")
                }, 2000);
            }

        }else {
            setError("Datos incompletos");
            setTimeout(() => {
              setError("")
            }, 2000);
          }


        }

        function cancelar() {
            navigate('/vListaProveedor');
        }


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
            if (/^[a-zA-Z\s]+$/.test(event.target.value) ||event.target.value === '') {
            setUser((prevState) => ({
                ...prevState,
                persona: {
                    ...prevState.persona,
                    nombre: nuevaCedula,
                },
            }));
        }
        };

        const handleapellidoChange = (event) => {
            const nuevaCedula = event.target.value;
            if (/^[a-zA-Z\s]+$/.test(event.target.value) ||event.target.value === '') {
            setUser((prevState) => ({
                ...prevState,
                persona: {
                    ...prevState.persona,
                    apellido: nuevaCedula,
                },
            }));
        }
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

            <div className="container" style={{ marginTop: "50px" }} >
                {error && (
                    <div className="alert alert-danger text-center" role="alert">
                        {error}
                    </div>
                )}
                <div className="row">
                    <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                        <h2 className="text-center m-4"> Registro de Proveedor</h2>
                        <form onSubmit={(e) => Registrar(e)}>
                            <div>
                                <br></br>
                                Cédula:
                                <input
                                    placeholder="Ingrese su cédula"
                                    value={user.persona.cedula}
                                    onChange={handleCedulaChange}
                                    style={{ marginLeft: "20px", marginRight: "20px", width: "180px" }}
                                    type="number"
                                    maxLength={10}
                                    onInput={(e) => {
                                        e.target.value = e.target.value.slice(0, 10)
                                    }} />
                                Dirección:
                                <input
                                    placeholder="Ingrese la dirección"
                                    value={user.persona.direccion}
                                    onChange={handledireccionChange}
                                    style={{ marginLeft: "10px", marginTop: "3px", width: "180px" }} />
                                <br />
                                Nombre:
                                <input
                                    style={{ marginLeft: "10px", marginRight: "20px", marginTop: "20px", width: "180px" }}
                                    placeholder="Ingrese el nombre"
                                    type="text" 
                                    value={user.persona.nombre}
                                    onChange={handlenombreChange} />
                                Apellido:
                                <input
                                    placeholder="Ingrese el apellido"
                                    type="text" 
                                    value={user.persona.apellido}
                                    onChange={handleapellidoChange}
                                    style={{ marginLeft: "18px", marginTop: "3px", width: "180px" }} />
                                <br />
                                Género:
                                <select
                                    value={user.persona.genero}
                                    onChange={handlegeneroChange}
                                    style={{ marginLeft: "17px", marginTop: "20px", width: "180px" }} >
                                    <option value="">Seleccione</option>
                                    <option value="MASCULINO">Masculino</option>
                                    <option value="FEMENINO">Femenino</option>
                                    <option value="OTRO">Otro</option>
                                </select>
                                <br></br>
                                <label style={{ marginLeft: "100px", marginTop: "10px" }}>Nombre del comercial:</label>
                                <input
                                    placeholder="Nombre del comercial"
                                    value={user.nombre_comercial}
                                    onChange={(e) => setUser({ ...user, nombre_comercial: e.target.value })}
                                    style={{ marginLeft: "5px", marginTop: "10px" }} />
                                <br />
                                <label style={{ marginLeft: "200px", marginTop: "20px" }}>Celular:</label>
                                <input
                                    placeholder="Número de celular"
                                    type="number"
                                    maxLength={10}
                                    value={user.celular}
                                    onChange={(e) => setUser({ ...user, celular: e.target.value })}
                                    onInput={(e) => {
                                        e.target.value = e.target.value.slice(0, 10)
                                    }}
                                    style={{ marginLeft: "12px", marginTop: "10px" }} />
                                <br />

                                <br /><br />
                                <button style={{ marginLeft: "200px" }} type="submit" className="btn btn-outline-primary" >GUARDAR</button>
                                <button style={{ marginLeft: "20px" }} className="btn btn-danger mx-2" onClick={cancelar}>CANCELAR</button>



                            </div>
                        </form>
                    </div>

                </div>

            </div>
        )
    }
