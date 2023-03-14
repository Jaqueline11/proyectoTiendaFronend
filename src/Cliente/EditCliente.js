import React,{ useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from "react-router-dom";


export default function EditCliente() {
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const { id_cliente } = useParams();
    const [user, setUser] = useState({
        edad: null,
        estado:true,
        persona: {
            nombre: null,
            apellido: null,
            cedula: null,
            direccion: null,
            genero: null
        }
    });
   
    console.log(id_cliente+"sssss");
    const CargarDatos = async () => {
        const result = await axios.get(`http://localhost:8080/api/cliente/${id_cliente}`);
        setUser({
          ...result.data});
          
          
      };

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
        if (user.persona.cedula != null && user.persona.direccion != null && user.persona.nombre != null && user.persona.apellido != null && user.persona.genero != null && user.edad != null ) {
            if (cedulaValida == true) {
                const result = await axios.put(`http://localhost:8080/api/editarcliente/${id_cliente}`, user);
                console.log(result.data);
                
                navigate('/vListaCliente')
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
            navigate('/vListaCliente');
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
        
  useEffect(() => {
    
    CargarDatos();
    
  }, []);



        return (

            <div className="container"  style={{ marginTop: "50px" }}>
                {error && (
                    <div className="alert alert-danger text-center" role="alert">
                        {error}
                    </div>
                )}
                <div className="row">
                    <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                        <h2 className="text-center m-4"> Registro de Cliente</h2>
                        <form onSubmit={(e) => Registrar(e)}>
                            <div>
                                <br></br>
                                Cedula:
                                <input
                                    placeholder="Ingrese su cedula"
                                    value={user.persona.cedula}
                                    onChange={handleCedulaChange}
                                    style={{ marginLeft: "20px", marginRight: "5px", width: "160px" }}
                                    type="text"
                                    readOnly
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
                                    style={{ marginLeft: "17px",marginRight: "5px", marginTop: "3px", width: "160px" }} >
                                    <option value="">Seleccione</option>
                                    <option value="MASCULINO">Masculino</option>
                                    <option value="FEMENINO">Femenino</option>
                                    <option value="OTRO">Otro</option>
                                </select>
                                Edad:
                                <input
                                    placeholder="Edad"
                                    type="number" 
                                    value={user.edad}
                                    onChange={(e) => setUser({ ...user, edad: e.target.value })}
                                    maxLength={2}
                                    onInput={(e) => {
                                        e.target.value = e.target.value.slice(0, 2)
                                    }} 
                                    style={{ marginLeft: "12px", marginTop: "10px" }} />
                                <br /><br />
                                <button style={{ marginLeft: "190px" }} type="submit" className="btn btn-outline-primary" >GUARDAR</button>
                                <button style={{ marginLeft: "10px" }} className="btn btn-outline-primary" onClick={cancelar}>CANCELAR</button>



                            </div>
                        </form>
                    </div>

                </div>

            </div>
        )
    }
