import React from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { faSearch, faFilter } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, useEffect } from 'react'

export default function Reportepedcliente() {
    const [ setError] = useState(null);
    const navigate = useNavigate();
    const [searchTerm] = useState('');
    const [searchResults] = useState([]);
    const [users, setUsers] = useState([]);
    const [selectedType] = useState('');


  

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
    useEffect(() => {
        loadUsers();

    }, [])

    const loadUsers = async () => {
        const result = await axios.get("http://localhost:8080/api/pedidocliente/listarpedidocliente");

        setUsers(result.data);

    };



    const resultsd = searchTerm ? searchResults :
        selectedType ? users.filter((user) => user.tipo === selectedType) :
            users;


    return (
        <div className="containermi">
          <h2>Lista de pedidos clientes</h2>
          <br></br>
                <table className="tabla-estilo table border shadow">
                    <thead>
                        <tr className="columnas">
                            <th>Codigo</th>
                            <th>Cédula</th>
                            <th>Nombre</th>
                            <th>Total</th>
                            <th>Fecha</th>
                        </tr>
                    </thead>

                    <tbody className="fila">{
                        resultsd.map((pedido_cliente, index) => (
                            <tr key={index}>
                                <td>{pedido_cliente.numero_pedido}</td>
                                <td>{pedido_cliente.cliente.persona.cedula}</td>
                                <td>{pedido_cliente.cliente.persona.nombre} {pedido_cliente.cliente.persona.apellido}</td>
                                <td>{pedido_cliente.precio_total}</td>
                                <td>{pedido_cliente.fecha_pedido}</td>
                            </tr>
                        ))
                    }
                    </tbody>
                </table>
            

        </div>
    );
}