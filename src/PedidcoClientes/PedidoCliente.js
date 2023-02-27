import React from 'react'
import axios from 'axios'
import { useState } from 'react'

export default function PedidoCliente() {
    const [cedula, setCedula] = useState(null);
    const [nombre, setNombre] = useState('');
    const [direccion, setdireccion] = useState('');
    const [boton, setBoton] = useState('CONSUMIDOR FINAL');

    const handleClick = () => {
        if (cedula != 9999999999) {
            setCedula(9999999999)
            setNombre('CONSUMIDOR FINAL');
            setdireccion('CONSUMIDOR FINAL')
            setBoton('FACTURA CON DATOS')

        } else {
            setCedula(null)
            setNombre('');
            setdireccion('')
            setBoton('CONSUMIDOR FINAL')

        }
    };


    async function handleChange(event) {

        await axios.get(`http://localhost:8080/api/clienteced/${event.target.value}`, {

        }).then(response => {
            const nombrea = response.data.persona.nombre + " " + response.data.persona.apellido;
            setNombre(nombrea)
            setdireccion(response.data.persona.direccion)
        })
            .catch(error => {
                setNombre('');
            setdireccion('')
            });

    }
    return (
        <div>
            <div style={{ textAlign: 'left', marginLeft: '375px' }}>
                <br></br>
                Cédula:<input type="number" placeholder='Ingrese la cedula del cliente' style={{ width: '30%', marginLeft: '20px' }} value={cedula} onChange={handleChange}></input>
                <button style={{ marginLeft: '20px' }} onClick={handleClick}>{boton}</button>
                <br></br><br></br>
                Cliente: <input placeholder='Aqui aparecera el nombre del cliente' style={{ width: '30%', marginLeft: '18px' }} value={nombre} readonly></input><br></br><br></br>
                Dirección: <input placeholder='Aqui aparecera la direccion del cliente' style={{ width: '30%' }} value={direccion} readonly></input>

            </div>
            <hr></hr>
        </div>
    )
}
