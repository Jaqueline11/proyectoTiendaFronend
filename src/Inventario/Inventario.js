import React from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { faSearch, faFilter } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, useEffect } from 'react'


export default function Inventario() {

    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [users, setUsers] = useState([]);


    // función para manejar la búsqueda
    const handleSearch = async (event) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/inventario/tipo/Bebidas${searchTerm}`);
            setSearchResults(response.data);
            console.log(searchTerm)
        } catch (error) {
            console.log(error);
        }
    };

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
        const result = await axios.get("http://localhost:8080/api/inventario/listarinventario");

        setUsers(result.data);

    };
    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const resultsd = searchTerm ? searchResults : users;


    return (
        <div className="container">
            <form onSubmit={handleSearch}>
                <div className="input-group mb-3" >
                    <input type="text" className="estilo-buscar" FontAwesomeIcon icon={faSearch}  placeholder="Buscar" aria-label="Buscar" aria-describedby="buscar-boton"
                        onChange={handleChange} />
                    <button className="btn btn-primary" type="submit" id="buscar-boton">
                        <FontAwesomeIcon icon={faSearch} />
                    </button>
                    <div class="dropdown">
                        <button class="btn btn-secondary dropdown-toggle estilo-filtrar" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                            <FontAwesomeIcon icon={faFilter} />{' '}
                            Filtrar
                        </button>
                        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                            <li><a class="dropdown-item" href="#">BEBIDAS</a></li>
                            <li><a class="dropdown-item" href="#">CERVEZA</a></li>
                            <li><a class="dropdown-item" href="#">LICORES</a></li>
                            <li><a class="dropdown-item" href="#">ABARROTES</a></li>
                        </ul>
                    </div>
                </div>
            </form>

            <table className="tabla-estilo">
                <thead>
                    <tr className="columnas">
                        <th>Codigo</th>
                        <th>Nombre</th>
                        <th>Descripcion</th>
                        <th>Cantidad</th>
                        <th>valor</th>
                        <th>Fecha de caducidad</th>
                        <th>Tipo</th>
                    </tr>
                </thead>

                <tbody className="fila">{
                    resultsd.map((inventario, index) => (
                        <tr key={index}>
                            <td>{inventario.codigo}</td>
                            <td>{inventario.nombre} </td>
                            <td>{inventario.descripcion}</td>
                            <td>{inventario.cantidad}</td>
                            <td>{inventario.valor}</td>
                            <td>{inventario.fecha_caducidad}</td>
                            <td>{inventario.tipo}</td>
                        </tr>
                    ))
                }
                </tbody>
            </table>
        </div>
    );
}
