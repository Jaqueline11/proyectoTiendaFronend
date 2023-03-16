import React from 'react'
import axios from 'axios'

import { useState, useEffect } from 'react'
import './Estilo.css';
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';


export default function PedidoProveedor() {
   
    const navigate = useNavigate();
    const [ruc, setRuc] = useState(null);
    const [foto, setFoto] = useState(null);
    const [fecha_caducidad, setFecha_caducidad] = useState(null);
    const [nombreproveedor, setNombreproveedor] = useState('');
    const [nombrecomercial, setNombrecomercial] = useState('');
    const [tipo, setTipo] = useState(null);
    const [codigo, setCodigo] = useState(null);
    const [descripcion, setdescripcion] = useState(null);
    const [codigos, setCodigos] = useState(null);
    const [nombrepro, setNombrepro] = useState('');
    const [lista, setLista] = useState([]);
    const [maximo, setMaximo] = useState(null);
    const [unitario, setUnitario] = useState(null);
    const [punitario, setPunitario] = useState(null);
    const [cantidad, setCantidad] = useState(null);
    const [pTotal, setPtotal] = useState(0);
    const [iva, setIva] = useState(0);
    const [error, setError] = useState(null);
    const [subtotal, setSubtotal] = useState(0);
    const [inventario, setInventario] = useState({
        fecha_pedido: "",
        precio_total: "",
        cliente: null
    })
    const [user, setUser] = useState({
        numero_pedido: null,
        fecha: null,
        precio_total: null,
        proveedor: {
            id_proveedor: null,
            nombre_comercial: null,
            celular: null,
            estado: true,
            persona: {
                id: 22,
                cedula: null,
                nombre: null,
                apellido: null,
                direccion: null,
                genero: null
            }

        }
    
    })
    

    const { fecha_pedido, precio_total, id_cliente } = inventario;

    axios.interceptors.request.use(
        config => {
          const token = localStorage.getItem('token');
          if(token==""){
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
        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);
    const handleBeforeUnload = (e) => {
        e.preventDefault();
        e.returnValue = '';
    };

    
    
    const AgregarProducto = () => {

        if (cantidad != null && cantidad != 0 && descripcion != null && descripcion != "" && codigo != null && codigo != 0&& unitario != null && unitario != 0 && foto!= null && fecha_caducidad!=null) {
            const existeProducto = lista.find(producto => producto.Codigo === codigos);

            if (existeProducto) {
                console.log("El producto ya existe en la lista");
                const index = lista.findIndex(producto => producto.Codigo === codigos);
                if (index !== -1) {
                    
                    const nuevaCantidad = cantidad;
                    const nuevoPrecioTotal = cantidad * punitario;


                    const productoModificado = { ...lista[index], Cantidad: nuevaCantidad, PrecioTotal: nuevoPrecioTotal };
                    const nuevaLista = [...lista];
                    nuevaLista[index] = productoModificado;
                    setLista(nuevaLista);

                    const preciot = nuevaLista.reduce((accumulator, currentValue) => accumulator + currentValue.PrecioTotal, 0);
                    const ivat = preciot * 0.12;
                    const subtotalt = preciot - ivat;

                    setPtotal(preciot.toFixed(2));
                    setIva(ivat.toFixed(2));
                    setSubtotal(subtotalt.toFixed(2));
                }
                return;
            }

            setIva(0);
            setSubtotal(0);
            const preciototal = cantidad * punitario;
            const preciot = parseFloat(pTotal) + parseFloat(preciototal);
            const ivat = preciot * 0.12;
            const subtotalt = preciot - ivat;
            
            setCodigo(codigo.toFixed(2));
            setUnitario(unitario.toFixed(2));
            setCantidad(cantidad);
            setdescripcion(descripcion);
            setPtotal(preciot.toFixed(2));
            setIva(ivat.toFixed(2));
            setSubtotal(subtotalt.toFixed(2));
            const nuevoProducto = { Codigo: codigos, Producto: nombrepro, Cantidad: cantidad, PrecioUnitario: punitario, PrecioTotal: preciototal };
            const nuevaLista = [...lista, nuevoProducto];
            setLista(nuevaLista);

            axios.put(`http://localhost:8080/api/inventario/editarcantidad?id=${codigos}&cantidad=${cantidad}`)
                .then(response => {
                    console.log(response.data);
                })
                .catch(error => {
                    console.log(error);
                });
        } else {
            setError("CAMPOS INCOMPLETOS");

            setTimeout(() => {
                setError("");
            }, 2000);

        }


    }

    

    async function handleChange2(event) {

        if (event.target.value != "") {
            await axios.get(`http://localhost:8080/api/inventario/producto/${event.target.value}`, {

            }).then(response => {
                if (response.data.descripcion != null) {
                    setNombrepro(response.data.descripcion)
                    setMaximo(response.data.cantidad)
                    setPunitario(response.data.valor)
                    setCodigos(event.target.value)
                    if (response.data.cantidad <= 0) {
                        setError("Producto no disponible")

                        setTimeout(() => {
                            setError("");
                        }, 2000);

                    }
                } else {
                    setNombrepro('')
                    setCodigos(null);

                }
            })
                .catch(error => {
                    setNombrepro('');
                    setCodigo(null);
                    console.log("error")
                });
        } else {
            setNombrepro('')
            setCodigos(null);
        }


    }

    const onInputChange = (e) => {
        setInventario({ ...inventario, [e.target.name]: e.target.value });
    };

    async function handleChange(event) {
        setRuc(event.target.value)
        await axios.get(`http://localhost:8080/api/proveedor/proveedorced/${event.target.value}`, {

        }).then(response => {
            const nombrea = response.data.persona.nombre + " " + response.data.persona.apellido;
            setNombreproveedor(nombrea)
            setNombrecomercial(response.data.nombre_comercial)

        })
            .catch(error => {
                setNombreproveedor('');
                setNombrecomercial('');
            });

    }
    function handleImagenSeleccionada(evento) {
        const archivo = evento.target.files[0];
        const reader = new FileReader();
    
        reader.onload = function(evento) {
          setFoto(evento.target.result);
        };
    
       
      reader.onload = function(evento) {
        const foto = new Image();
        foto.onload = function() {
          const MAX_TAMANO = 200; // máximo ancho/alto permitido para la imagen
          let ancho = foto.width;
          let alto = foto.height;
  
          // si la imagen es más grande que el tamaño máximo permitido, se reduce su tamaño
          if (ancho > MAX_TAMANO || alto > MAX_TAMANO) {
            if (ancho > alto) {
              alto *= MAX_TAMANO / ancho;
              ancho = MAX_TAMANO;
            } else {
              ancho *= MAX_TAMANO / alto;
              alto = MAX_TAMANO;
            }
          }
  
          const canvas = document.createElement('canvas');
          canvas.width = ancho;
          canvas.height = alto;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(foto, 0, 0, ancho, alto);
  
          const dataUrl = canvas.toDataURL('image/jpeg');
          setFoto(dataUrl);
        };
        foto.src = evento.target.result;
      };
  
      reader.readAsDataURL(archivo);
    }
    useEffect(() => {
        console.log(inventario);
        const fetchData = async () => {
            const response = await axios.post("http://localhost:8080/api/pedidoproveedor/crearpedido", inventario)
                .then(response => {
                    console.log(response);
                })
                .catch(error => {
                    console.log(error);
                });
        };
        fetchData();

        return async () => {
            // Realiza cualquier limpieza necesaria
        };
    }, [inventario]);

    const registrar = async (e) => {

        const today = new Date();
        const fechaActual = `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`;

        if (ruc != "" && ruc != null && nombrecomercial != "") {


            await axios.get(`http://localhost:8080/api/proveedor/proveedorced/${ruc}`, {

            }).then(response => {
                
                setInventario({
                    fecha_pedido: fechaActual,
                    precio_total: pTotal,
                    proveedor: response.data
                });




            })
                .catch(error => {
                    console.log(error)
                });
        } else {
            setError("Llenar los datos del Proveedor");
            setTimeout(() => {
                setError("");
            }, 2000);
        }

    }
    const handlegeneroChange = (event) => {
        const nuevaCedula = event.target.value;
        setUser((tipo) => ({
            ...tipo,
            tipo: {
                ...tipo.persona,
                tipo: nuevaCedula,
            },
        }));
    };
     
    
    return (
        <div>
            {error && (
                <div className="alert alert-danger text-center" role="alert">
                    {error}
                </div>
            )}

            <div style={{ textAlign: 'left', marginLeft: '375px' }}>
                <br></br>
                Ruc:<input type="number" placeholder='Ingrese el Ruc del proveedor' style={{ width: '30%', marginLeft: '20px' }} value={ruc} onChange={handleChange}></input>
                
                <br></br><br></br>
                Proveedores: <input placeholder='Aqui aparecera el nombre del proveedor' style={{ width: '30%', marginLeft: '18px' }} value={nombreproveedor} readonly></input><br></br><br></br>
                Nombre Comercial: <input placeholder='Aqui aparecera el nombre del comercial' style={{ width: '30%', marginLeft: '18px' }} value={nombrecomercial} readonly></input>

            </div>
            <hr></hr>
            <div style={{ marginLeft: '150px', fontFamily: 'cursive' }}>
            
                Nuevo Producto<br></br><br></br>
                Codigo
                <input type="number" placeholder='Ingrese el código del producto' onChange={handleChange2} value={codigo} style={{ width: "25%", marginLeft: "10px", marginRight: "10px" }}></input>
                
                Cantidad
                <input type="number" style={{ width: "4%", marginLeft: "10px",  marginRight: "10px" }} max={maximo} onChange={(e) => setCantidad(parseInt(e.target.value))}></input>

                Precio Unitario
                <input type="number" style={{ width: "4%", marginLeft: "10px" }} max={unitario} onChange={(e) => setUnitario(parseInt(e.target.value))}></input>
                <br></br><br></br>
                Descripcion
                <input placeholder='Ingrese la descripcion del producto' style={{ width: '30%', marginLeft: '18px',  marginRight: "10px"  }} value={descripcion} readonly></input>
                Tipo
                <select
                                    value={tipo}
                                    onChange={handlegeneroChange}
                                    style={{ marginLeft: "17px",marginRight: "5px", marginTop: "3px", width: "160px" }} >
                                    <option value="">Seleccione</option>
                                    <option value="ABARROTES">Abarrotes</option>
                                    <option value="BEBIDAS">Bebidas</option>
                                    <option value="LACTIOS">Lacteos</option>
                                    <option value="SNAKS">Snaks</option>
                                    <option value="LICORES">Licores</option>
                                    <option value="CERVEZAS">Cervezas</option>                   
                                </select>
                <br></br><br></br>
                Fecha Caducidad
                <input type={"date"}style={{ marginLeft: "10px", marginRight: "225px"}}></input>
                foto
                {foto && <img src={foto} alt="Mi imagen" />}
                <input type="file" accept="image/*" onChange={handleImagenSeleccionada} />
                 
                
                <br></br><br></br>
                <button style={{ marginLeft: "10px" }} onClick={AgregarProducto}>AGREGAR PRODUCTO</button>
                

            </div>
            
            <br></br>
            <div className="display-flex">
                <div style={{ height: "250px", width: "1000px", overflowY: "scroll" }}>
                    <table className="table border shadow" style={{ width: '98%', marginLeft: '15px' }}>
                        <thead>
                            <tr>
                                <th scope="col">Codigo</th>
                                <th scope="col">Producto</th>
                                <th scope="col">Cantidad</th>
                                <th scope="col">Precio Unitario</th>
                                <th scope="col">Precio Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                lista.map((lista, index) => (
                                    <tr>
                                        <td style={{ width: '5%' }}>{lista.Codigo}</td>
                                        <td style={{ width: '25%' }}>{lista.Producto} </td>
                                        <td style={{ width: '5%' }}>{lista.Cantidad}</td>
                                        <td style={{ width: '5%' }}>{lista.PrecioUnitario}</td>
                                        <td style={{ width: '5%' }}>{lista.PrecioTotal}</td>
                                    </tr>
                                ))
                            }
                        </tbody>

                    </table>
                </div>
                <div>
                    <br></br>
                    <br></br>
                    SubTotal: <input readOnly style={{ width: "20%", marginLeft: "2px" }} value={subtotal}></input><br></br>
                    Iva: <input readOnly style={{ width: "20%", marginLeft: "43px" }} value={iva}></input><br></br>
                    Total: <input readOnly style={{ width: "20%", marginLeft: "29px" }} value={pTotal} ></input><br></br>
                </div>
            </div>
            <div>
                <button className="btn btn-outline-primary" style={{ marginLeft: "30%", width: "10%" }} onClick={registrar}>Guardar</button>
            </div>

        </div>
    )
}





