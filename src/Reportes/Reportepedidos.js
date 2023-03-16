import React from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { faSearch, faFilter } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, useEffect } from 'react'

export default function Reportepedidos() {
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [users, setUsers] = useState([]);
    const [selectedType, setSelectedType] = useState('');


  

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
        const result = await axios.get("http://localhost:8080/api/pedprovee/getpedido");

        setUsers(result.data);

    };



    const resultsd = searchTerm ? searchResults :
        selectedType ? users.filter((user) => user.tipo === selectedType) :
            users;


    return (
        <div className="containermi">
          <h2>Lista de pedidos</h2>
          <br></br>
                <table className="tabla-estilo">
                    <thead>
                        <tr className="columnas">
                            <th>Codigo</th>
                            <th>Ruc Proveedor</th>
                            <th>Empresa</th>
                            <th>Total</th>
                            <th>Fecha</th>
                        </tr>
                    </thead>

                    <tbody className="fila">{
                        resultsd.map((pedido_proveedor, index) => (
                            <tr key={index}>
                                <td>{pedido_proveedor.numero_pedido}</td>
                                <td>{pedido_proveedor.proveedor.persona.cedula}</td>
                                <td>{pedido_proveedor.proveedor.nombre_comercial}</td>
                                <td>{pedido_proveedor.precio_total}</td>
                                <td>{pedido_proveedor.fecha}</td>
                            </tr>
                        ))
                    }
                    </tbody>
                </table>
            

        </div>
    );
}