import React, {useRef}from "react";
import { Document, Page, Text, View, Image } from "@react-pdf/renderer";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react'
import {useReactToPrint} from 'react-to-print';




export default function Reportepedidocliente() {

    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [users, setUsers] = useState([]);
    const [showPrintButton, setShowPrintButton] = useState(true);

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
    const componenteRef=useRef();
    const gandeprint=useReactToPrint({
        content:()=>componenteRef.current,
        documentTitle:'emp-data',
        onAfterPrint:()=>alert('Print success'),
       
    });
    const loadUsers = async () => {
        const result = await axios.get("http://localhost:8080/api/usuarios/getusuario");

        setUsers(result.data);

    };
    useEffect(() => {
        loadUsers();

    }, [])

    return (
     
      <div ref={componenteRef} style={{width:'100%',height:window.innerHeight}}>
        <h1 className="text-center my-3 border py-2">Lista de Pedidos</h1>
        <table className="table border shadow print-only" style={{ width: '80%', marginLeft: '10%' }}>
                <thead>
                    <tr>
                        <th scope="col">Cedula</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Usuario</th>
                        <th scope="col">Dirección</th>
                        <th scope="col">Genero</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map((user, index) => (
                            <tr key={index}>
                                <td>{user.persona.cedula}</td>
                                <td>{user.persona.nombre} {user.persona.apellido}</td>
                                <td>{user.usuario}</td>
                                <td>{user.persona.direccion}</td>
                                <td>{user.persona.genero}</td>
                        
                            </tr>
                        ))
                    }
                </tbody>
            </table>
             <button  onClick={gandeprint}>Imprimir</button>
      </div>
      
     
   
    )
};