import React from 'react'
import NavBar from './NavBar'
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react'
import axios from 'axios'

export default function VentanaPrincipal() {

  const nombres = (localStorage.getItem('nombres'))
  const [error, setError] = useState(null);
  const navigate = useNavigate();
 
  

  axios.interceptors.request.use(
    config => {
      const token = localStorage.getItem('token');
      console.log(token, "token hola")
      if (token == "" || token == null) {
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

  const loadUsers = async () => {
    const result = await axios.get("http://localhost:8080/api/inventario/listarinventario");

};
loadUsers();




  const ofertas = [
    {
      titulo: "     💥¡Marzo... al costo!💥",
      imagen: "https://scontent.fcue7-1.fna.fbcdn.net/v/t39.30808-6/272893549_5278245835561194_2006256847415190725_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=8bfeb9&_nc_eui2=AeHaceNkCabYHKe8V51x3tgM7kOjtiolTunuQ6O2KiVO6V4qVQ8IQx-lQ6qo4sN5OP8KTD1XqxvUFI4AzUT6HJ0w&_nc_ohc=Yh778qn_xZgAX8kVb7y&_nc_ht=scontent.fcue7-1.fna&oh=00_AfDSDnhDmHL2ZhWgcfuWUzZLPW9y-c6jqhK8P9OrCYCUCA&oe=641D56BF",
    },
    {
      titulo: "Oferta 2",
      imagen: "https://scontent.fcue7-1.fna.fbcdn.net/v/t39.30808-6/272267942_5278242145561563_8753536045009974783_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=8bfeb9&_nc_eui2=AeE81RZ6b-ON0V57klgzV0XmObx5m8usKok5vHmby6wqiX1wUxf_b4PghNyYoEguAWRF94BFbpHHYxSdx8tRfTwA&_nc_ohc=jAw9_FAvr50AX_gUD0E&_nc_oc=AQkcn3SLNwyV5zv8xzkwh4cRTFIAU6jDC9DAszcTsm9bSZJ7ye9inFjGP-zhp4cKLJE&_nc_ht=scontent.fcue7-1.fna&oh=00_AfAi4NUECrGUuBpAhEvG1nvkoWgc2OD8yJVPcTJExkk8jQ&oe=641C9C2C",
    },
    {
      titulo: "Oferta 3",
      imagen: "https://static0.tiendeo.com.ec/images/tiendas/81063/catalogos/175990/paginas/mid/00001.jpg",
    },
    {
      titulo: "Oferta 3",
      imagen: "https://scontent.fcue7-1.fna.fbcdn.net/v/t39.30808-6/272927779_5278246608894450_286598471514614073_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=8bfeb9&_nc_eui2=AeEGMml9306_bodBcTh12ZxUhA0ud-XNSAqEDS535c1ICnEmubmHWW-hN6UJCVKw1oIl_Fkle1ABTMiCFkl9y9HI&_nc_ohc=6znvcFwI1PEAX8-_z-4&_nc_ht=scontent.fcue7-1.fna&oh=00_AfBYGqkh_4NOEl1SdZ7fyI9TwuDMiggHWA0dHbhBHawxIA&oe=641D14A8",
    },
  ];


  return (
    <div>
      {error && (
        <div className="alert alert-danger text-center" role="alert">
          {error}
        </div>
      )}
      <div style={{
        backgroundColor: '#F5F5F5',
        padding: '50px',
        textAlign: 'center',
        fontFamily: 'Arial, sans-serif'
      }}>
        <h1 style={{ fontSize: '48px', margin: '0' }}>¡Bienvenido de vuelta!</h1>
        <p style={{ fontSize: '24px' }}>{nombres.toUpperCase()}</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <h2 > 😊Ofertas Especiales😊</h2>
        <div style={{ whiteSpace: 'nowrap' }}>
          {ofertas.map((oferta) => (
            <div key={oferta.id} style={{ display: 'inline-block', marginRight: '10px' }}>
              <a href={oferta.url}>
                <img src={oferta.imagen} alt={oferta.titulo} style={{ width: "220px" }} />
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>


  )
}
