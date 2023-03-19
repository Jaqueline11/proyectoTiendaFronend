import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom'

export default function Listausuarios() {
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [users, setUsers] = useState([]);
    const admin=localStorage.getItem('rol');

    //AGREGA EL JWT AL ENCABEZADO PARA MIS CONSULTAS
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
    useEffect(() => {
        loadUsers();

    }, [])

    const loadUsers = async () => {
        const result = await axios.get("http://localhost:8080/api/usuarios/getusuario");

        setUsers(result.data);

    };

    const deleteUser = async (id, usuario) => {
        if (usuario != "administrador") {
            await axios.delete(`http://localhost:8080/api/usuarios/eliminarusuario?id=${id}`);
        } else {
            setError("No se puede eliminar este usuario")
            setTimeout(() => {
                setError("")
            }, 2000);
        }
        loadUsers();
    }
    function abriradd() {
        navigate("/vaddcliente")
    }



    return (
        <div>
            {error && (
                <div className="alert alert-danger text-center" role="alert">
                    {error}
                </div>
            )}
            <br></br>
            {admin == 'admin' ?
            <button style={{ position: 'fixed', right: "140px" }} onClick={abriradd}>CREAR USUARIO</button>
            :null}
            <br></br>
            <br></br>

            <table className="tabla-estilo table border shadow" style={{ width: '80%', marginLeft: '10%' }}>
                <thead>
                    <tr className="columnas">
                        <th scope="col">Cédula</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Usuario</th>
                        <th scope="col">Dirección</th>
                        <th scope="col">Género</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody className="fila">
                    {
                        users.map((user, index) => (
                            <tr key={index}>
                                <td>{user.persona.cedula}</td>
                                <td>{user.persona.nombre} {user.persona.apellido}</td>
                                <td>{user.usuario}</td>
                                <td>{user.persona.direccion}</td>
                                <td>{user.persona.genero}</td>
                                {admin == 'admin' ?
                                <td>
                                    <Link
                                        className="btn btn-outline-primary mx-2"
                                        to={`/edituser/${user.usuario}`}
                                    >
                                        Editar
                                    </Link>
                                    <button style={{ marginLeft: '10%' }}
                                        className="btn btn-danger mx-2"
                                        onClick={() => deleteUser(user.id_usuarios, user.usuario)}>Eliminar</button>
                                </td>
                                :null}

                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}
