import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import './Estilo.css';
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

export default function PedidoCliente() {



    const [inventariolista, setInventariolista] = useState([]);
    const navigate = useNavigate();
    const [cedula, setCedula] = useState(null);
    const [nombre, setNombre] = useState('');
    const [direccion, setdireccion] = useState('');
    const [boton, setBoton] = useState('CONSUMIDOR FINAL');
    const [codigo, setCodigo] = useState(undefined);
    const [nombrepro, setNombrepro] = useState(null);
    const [lista, setLista] = useState([]);
    const [maximo, setMaximo] = useState(0);
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
        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);



    const handleBeforeUnload = (e) => {
        e.preventDefault();
        e.returnValue = '';
    };

    useEffect(() => {
        loadInventario();

    }, [])

    const loadInventario = async () => {
        const result = await axios.get("http://localhost:8080/api/inventario/listarinventario");

        setInventariolista(result.data);

    };

    function eliminarproductos(index, listas) {
        const indiceAEliminar = index;
        const nuevaLista = [...lista];
        console.log(index, cantidad, "hola")
        nuevaLista.splice(indiceAEliminar, 1);
        setLista(nuevaLista);

        const preciot = pTotal - listas.PrecioTotal
        const ivat = preciot * 0.12;
        const subtotalt = preciot - ivat;


        setPtotal(preciot.toFixed(2));
        setIva(ivat.toFixed(2));
        setSubtotal(subtotalt.toFixed(2));
        const cantidads = listas.Cantidad * (-1);
        console.log(cantidads);

        axios.put(`http://localhost:8080/api/inventario/editarcantidad?id=${listas.Codigo}&cantidad=${cantidads}`)
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.log(error);
            });


    }


    const AgregarProducto = () => {

        if (cantidad != null && cantidad != 0 && codigo != null && nombrepro != null) {
            const existeProducto = lista.find(producto => producto.Codigo === codigo);

            if (existeProducto) {
                console.log("El producto ya existe en la lista");
                const index = lista.findIndex(producto => producto.Codigo === codigo);
                if (index !== -1) {
                    const nuevaCantidad = lista[index].Cantidad + cantidad;
                    const nuevoPrecioTotal = nuevaCantidad * punitario;

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

                    setNombrepro('')
                    setMaximo(0)
                    setCantidad(0)

                    axios.put(`http://localhost:8080/api/inventario/editarcantidad?id=${codigo}&cantidad=${cantidad}`)
                        .then(response => {
                            console.log(response.data);
                        })
                        .catch(error => {
                            console.log(error);
                        });
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
            const nuevoProducto = { Codigo: codigo, Producto: nombrepro, Cantidad: cantidad, PrecioUnitario: punitario, PrecioTotal: preciototal };
            const nuevaLista = [...lista, nuevoProducto];
            setLista(nuevaLista);

            axios.put(`http://localhost:8080/api/inventario/editarcantidad?id=${codigo}&cantidad=${cantidad}`)
                .then(response => {
                    console.log(response.data);
                })
                .catch(error => {
                    console.log(error);
                });

            setNombrepro('')
            setMaximo(0)
            setCantidad(0)
            loadInventario();
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
                if (response.data.nombre != null) {
                    setNombrepro(response.data.nombre)
                    setMaximo(response.data.cantidad)
                    setPunitario(response.data.valor)
                    setCodigo(response.data.codigo)
                    console.log(response.data.codigo)
                    if (response.data.cantidad <= 0) {
                        setError("Producto no disponible")

                        setTimeout(() => {
                            setError("");
                        }, 2000);

                    }
                } else {
                    setNombrepro('')
                    setMaximo(0)
                    setCantidad(0)
                    setCodigo("");

                }
            })
                .catch(error => {
                    setNombrepro('');
                    setCodigo(null);
                    setMaximo(0)
                    setCantidad(0)
                    setCodigo("");
                });
        } else {
            setNombrepro('')
            setMaximo(0)
            setCantidad(0)
            setCodigo("")
        }


    }



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

        if (inventario.fecha_pedido != "") {
            const fetchData = async () => {
                const response = await axios.post("http://localhost:8080/api/pedidocliente/crearpedidocliente", inventario)
                    .then(response => {
                        console.log(response);
                        navigate("/reportes")

                    })
                    .catch(error => {
                        console.log(error);
                    });
            };
            fetchData();

            return async () => {
                // Realiza cualquier limpieza necesaria
            };
        }
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
                Cédula:<input type="number" placeholder='Ingrese la cédula del cliente' style={{ width: '30%', marginLeft: '20px' }} value={cedula} onChange={handleChange}></input>
                <button style={{ marginLeft: '20px' }} onClick={handleClick}>{boton}</button>
                <br></br><br></br>
                Cliente: <input placeholder='Aquí aparecera el nombre del cliente' style={{ width: '30%', marginLeft: '18px' }} value={nombre} readonly></input><br></br><br></br>
                Dirección: <input placeholder='Aquí aparecera la dirección del cliente' style={{ width: '30%' }} value={direccion} readonly></input>

            </div>
            <hr style={{ marginLeft: '160px', marginRight: '140px' }}></hr>
            <div style={{ marginLeft: '150px', fontFamily: 'cursive' }}>
                <label style={{ marginLeft: '10px' }}>
                    Buscar Producto
                </label>
                <input list="productos" placeholder='Ingrese el código o nombre del producto' onChange={handleChange2} style={{ width: "340px", marginLeft: "10px" }}></input>
                <br />
                <input readOnly value={codigo} style={{ width: "21%", marginLeft: "10px", marginTop: "10px" }}></input>
                <input
                    style={{ marginLeft: "10px", marginRight: "10px" }}
                    value={nombrepro}

                    readOnly></input>
                <datalist id="productos">
                    {inventariolista.map((product) => (
                        <option value={product.nombre} />
                    ))}
                </datalist>
                Cantidad
                <input
                    type="number"
                    style={{ width: "7%", marginLeft: "10px" }}
                    max={maximo}
                    min="0"
                    value={cantidad}
                    onChange={(e) => setCantidad(parseInt(e.target.value))}
                    onKeyDown={(e) => {
                        e.preventDefault();

                    }}
                />

                <button style={{ marginLeft: "10px" }} onClick={AgregarProducto}>AGREGAR PRODUCTO</button>
                <button style={{ marginLeft: "10px" }} >CANCELAR</button>

            </div>
            <br></br>
            <div className="display-flex" style={{ marginLeft: '150px' }}>
                <div style={{ height: "250px", width: "1000px", overflowY: "scroll" }}>
                    <table className="table border shadow" style={{ width: '98%', marginLeft: '15px' }}>
                        <thead>
                            <tr  className="columnas">
                                <th scope="col">Codigo</th>
                                <th scope="col">Producto</th>
                                <th scope="col">Cantidad</th>
                                <th scope="col">Precio Unitario</th>
                                <th scope="col">Precio Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                lista.map((listas, index) => (
                                    <tr>
                                        <td style={{ width: '5%' }}>{listas.Codigo}</td>
                                        <td style={{ width: '80%' }}>{listas.Producto} </td>
                                        <td style={{ width: '5%' }}>{listas.Cantidad}</td>
                                        <td style={{ width: '5%' }}>{listas.PrecioUnitario}</td>
                                        <td style={{ width: '5%' }}>{listas.PrecioTotal}</td>
                                        <td>
                                            <button onClick={() => eliminarproductos(index, listas)}> <FontAwesomeIcon icon={faTrashAlt} />
                                            </button>
                                        </td>
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
                    Iva 12%: <input readOnly style={{ width: "20%", marginLeft: "8px" ,marginTop: "5px"}} value={iva}></input><br></br>
                    Total: <input readOnly style={{ width: "20%", marginLeft: "29px",marginTop: "5px",backgroundColor: "#ebadc3"}} value={pTotal} ></input><br></br>
                </div>
            </div>
            <div>
                <button className="btn btn-outline-primary" style={{ marginLeft: "35%", width: "10%" }} onClick={registrar}>Guardar</button>
            </div>


        </div>
    )
}
