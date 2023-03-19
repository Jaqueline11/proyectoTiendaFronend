import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom'

export default function ListaProveedor() {
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [users, setUsers] = useState([]);
    //sconst [admini, setAdmini]=useState(true);
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
        const result = await axios.get("http://localhost:8080/api/proveedor/listarproveedor");

        setUsers(result.data);

    };
    //Eliminar

  
    const deleteUser = async (id, key) => {
        const result=await axios.put(`http://localhost:8080/api/proveedor/eliminarproveedor?id=${id}`);
        console.log(result)
        loadUsers();
    }


    function abriradd() {
        navigate("/vProveedores")
    }
   



    return (
        <div>
            {error && (
                <div className="alert alert-danger text-center" role="alert">
                    {error}
                </div>
            )}
            <br></br>
            {admin == 'admin' ? <button style={{ position: 'fixed', right: "140px" }} onClick={abriradd}>CREAR PROVEEDOR</button> : null}



            <br></br>
            <br></br>

            <table className="table border shadow tabla-estilo " style={{ width: '80%', marginLeft: '10%' }}>
                <thead>
                    <tr className="columnas">
                        <th scope="col">Cédula</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Dirección</th>
                        <th scope="col">Género</th>
                        <th scope="col">Nombre Comercial</th>
                        <th scope="col">Celular</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody className="fila">
                    {
                        users.map((user, index) => (
                            <tr key={index}>
                                <td>{user.persona.cedula}</td>
                                <td>{user.persona.nombre} {user.persona.apellido}</td>
                                <td>{user.persona.direccion}</td>
                                <td>{user.persona.genero}</td>
                                <td>{user.nombre_comercial}</td>
                                <td>{user.celular}</td>
                                {admin == 'admin' ?
                                <td>
                                
                                    <Link
                                        className="btn btn-outline-primary mx-2"
                                        to={`/editProveedor/${user.id_proveedor}`}
                                    >
                                        Editar
                                    
                                    </Link>
                                    
                                    <button style={{ marginLeft: '10%' }}
                                        className="btn btn-danger mx-2"
                                        onClick={() => deleteUser(user.id_proveedor)}>Eliminar</button>
                                    
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
