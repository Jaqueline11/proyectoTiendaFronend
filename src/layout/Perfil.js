import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'


export default function Perfil() {


    let navigate = useNavigate();
    const [showConfirm, setShowConfirm] = useState(false);
    const [error, setError] = useState(null);

    const [user, setUser] = useState({
        id_usuarios: "",
        usuario: "",
        contra: "",
        persona: {
            id: "",
            nombre: "",
            apellido: "",
            cedula: "",
            direccion: "",
            genero: ""
        }
    });
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

    const { usuario, contra, nombre, apellido, cedula, direccion, genero } = user;

    const onInputChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };


    const { id } = useParams();

    useEffect(() => {

        CargarDatos();

    }, []);




    const CargarDatos = async () => {
        const result = await axios.get(`http://localhost:8080/api/usuarios/getusuario/${id}`);
        setUser({
            ...result.data
        });
        console.log(result)


    };



    return (
        <div className="container contenedor">
            <div className="row">
                <div className="col-md-5 offset-md-3 border rounded p-4 mt-2 shadow distancia">
                
                    <div className='btneditar'><Link className="btn btn-outline-primary mx-2"to={`/edituser/${user.usuario}`} > Editar</Link></div>
                    <div className='h6'>
                    <h8 className="h8r color-letra" >Mi perfil</h8><br></br><br></br>
                    <h8 className="h8r" >Usuario</h8>
                    <h3  className='App-link'>{usuario}</h3> 
                    <h8 className="h8r color-letra" >Datos personales</h8> <br></br><br></br>
                    <h4>Nombres</h4>
                    <h8 className="h8" >{user.persona.nombre} {user.persona.apellido}</h8>
                    <h4>Cédula</h4>
                    <h8 className="h8">{user.persona.cedula}</h8>
                    <h4>Dirección</h4>
                    <h8 className="h8" >{user.persona.direccion}</h8>
                    <h4>Género</h4>
                    <h8 className="h8" >{user.persona.genero}</h8>
                    </div>
                    <br></br><br></br>
                    <div className='btncancelar'><Link className='cancelar' to="/">Regresar</Link></div>
                    
                </div>

            </div>

        </div>
    )



}

