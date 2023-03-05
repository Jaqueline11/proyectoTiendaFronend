import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import './Estilo.css';
import { useNavigate } from "react-router-dom";

export default function PedidoCliente() {
    
    
    
    const navigate = useNavigate();
    const [cedula, setCedula] = useState(null);
    const [nombre, setNombre] = useState('');
    const [direccion, setdireccion] = useState('');
    const [boton, setBoton] = useState('CONSUMIDOR FINAL');
    const [codigo, setCodigo] = useState(null);
    const [codigos, setCodigos] = useState(null);
    const [nombrepro, setNombrepro] = useState('');
    const [lista, setLista] = useState([]);
    const [maximo, setMaximo] = useState(null);
    const [punitario, setPunitario] = useState(null);
    const [cantidad, setCantidad] = useState(null);
    const [pTotal, setPtotal] = useState(0);
    const [iva, setIva] = useState(0);
    const [subtotal, setSubtotal] = useState(0);
    const [error, setError] = useState(null);
    const [inventario, setInventario] = useState({
        fecha_pedido: "",
        precio_total: "",
        cliente: null
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


    const AgregarProducto = () => {

        if (cantidad != null && cantidad != 0 && codigos != null && nombrepro != null) {
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
        setCedula(event.target.value)
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

    useEffect(() => {
        console.log(inventario);
        const fetchData = async () => {
            const response = await axios.post("http://localhost:8080/api/pedidocliente/crearpedidocliente", inventario)
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

        if (cedula != "" && cedula != null && nombre != "") {


            await axios.get(`http://localhost:8080/api/clienteced/${cedula}`, {

            }).then(response => {
                
                setInventario({
                    fecha_pedido: fechaActual,
                    precio_total: pTotal,
                    cliente: response.data
                });




            })
                .catch(error => {
                    console.log(error)
                });
        } else {
            setError("Llenar los datos del cliente");
            setTimeout(() => {
                setError("");
            }, 2000);
        }

    }
    return (
        <div>
            {error && (
                <div className="alert alert-danger text-center" role="alert">
                    {error}
                </div>
            )}

            <div style={{ textAlign: 'left', marginLeft: '375px' }}>
                <br></br>
                Cédula:<input type="number" placeholder='Ingrese la cedula del cliente' style={{ width: '30%', marginLeft: '20px' }} value={cedula} onChange={handleChange}></input>
                <button style={{ marginLeft: '20px' }} onClick={handleClick}>{boton}</button>
                <br></br><br></br>
                Cliente: <input placeholder='Aqui aparecera el nombre del cliente' style={{ width: '30%', marginLeft: '18px' }} value={nombre} readonly></input><br></br><br></br>
                Dirección: <input placeholder='Aqui aparecera la direccion del cliente' style={{ width: '30%' }} value={direccion} readonly></input>

            </div>
            <hr></hr>
            <div style={{ marginLeft: '150px', fontFamily: 'cursive' }}>
                Buscar Producto
                <input type="number" placeholder='Ingrese el código del producto' onChange={handleChange2} value={codigo} style={{ width: "21%", marginLeft: "10px" }}></input>
                <input style={{ marginLeft: "10px", marginRight: "10px" }} value={nombrepro} readOnly></input>
                Cantidad
                <input type="number" style={{ width: "4%", marginLeft: "10px" }} max={maximo} onChange={(e) => setCantidad(parseInt(e.target.value))}></input>
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
