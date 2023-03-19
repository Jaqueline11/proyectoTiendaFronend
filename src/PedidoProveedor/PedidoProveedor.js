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
    const [nombreproveedor, setNombreproveedor] = useState('');
    const [nombrecomercial, setNombrecomercial] = useState('');
    const [tipo, setTipo] = useState(null);
    const [lista, setLista] = useState([]);
    const [pTotal, setPtotal] = useState(0);
    const [iva, setIva] = useState(0);
    const [error, setError] = useState(null);
    const [subtotal, setSubtotal] = useState(0);
    const [validar, setValidar] = useState(false);
    const today = new Date();
    const [inventario, setInventario] = useState({
        nombre: "",
        descripcion: "",
        cantidad: null,
        valor: "",
        fecha_caducidad: "",
        tipo: "",
        imagen: "",
        proveedor: {
            id_proveedor: null
        }
    })

    const [pedidoproveedor, setPedidoproveedor]=useState({
        fecha:`${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`,
        precio_total:'',
        proveedor: {
            id_proveedor: null
        }
    })

    const [inventarios, setInventarios] = useState();





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
        const i = 0.12 * pTotal;
        const st = pTotal - i;
        setSubtotal(st.toFixed(2))
        setIva(i.toFixed(2))


        setPedidoproveedor({...pedidoproveedor,precio_total:pTotal});
        console.log(pedidoproveedor);
    }, [pTotal]);



    const AgregarProducto = () => {
        if (inventario.cantidad != null && inventario.valor > 0 && inventario.valor != "" && inventario.cantidad > 0 && inventario.fecha_caducidad != "" && inventario.nombre != "" && inventario.tipo != "") {
            console.log(inventario);
            const nuevaLista = [...lista, inventario];
            const t = parseFloat(inventario.cantidad) * parseFloat(inventario.valor);

            const total = Number(pTotal) + Number(t);
            setPtotal(total.toFixed(2));

            setLista(nuevaLista);
            setInventario({
                nombre: "",
                descripcion: "",
                cantidad: 0,
                valor: 0,
                fecha_caducidad: "",
                tipo: inventario.tipo,
                imagen: "",
                proveedor: {
                    ...inventario.proveedor
                }
            });
        } else {
            setError("Datos Incompletos")
            setTimeout(() => {
                setError("")
            }, 2000);
        }

    }







    async function handleChange(event) {
        setRuc(event.target.value)
        await axios.get(`http://localhost:8080/api/proveedor/proveedorced/${event.target.value}`, {

        }).then(response => {
            const nombrea = response.data.persona.nombre + " " + response.data.persona.apellido;
            setNombreproveedor(nombrea)
            setNombrecomercial(response.data.nombre_comercial)
            setValidar(true)

            console.log(response.data.id_proveedor)
            setInventario((prevState) => ({
                ...prevState,
                proveedor: {
                    ...prevState.proveedor,
                    id_proveedor: response.data.id_proveedor,
                },
            }));

            setPedidoproveedor((prevState) => ({
                ...prevState,
                proveedor: {
                    ...prevState.proveedor,
                    id_proveedor: response.data.id_proveedor,
                },
            }));

        })
            .catch(error => {
                setNombreproveedor('');
                setNombrecomercial('');
                setValidar(false)
            });

    }

    const [image, setImage] = useState(null)
    function handleImage(e) {
        console.log(e.target.files[0])
        setImage(e.target.files[0])

    };

    function handleApi() {
        var formData = new FormData();
        formData.append("foto", image);
        axios.post("http://localhost:8080/api/assets/upload", formData, {

            headers: {
                'Content-Type': 'multipart/form-data'
            }

        })

            .then(({ data }) => {
                const { key } = data;
                console.log("key: ", key);
                setInventario({ ...inventario, imagen: key });

                console.log("Img path", inventario.imagen)

            })
            .catch(error => {
                console.log(error);
            })
    }
    var urlimagen;
    urlimagen = "https://proyectospringboots3bucket.s3.amazonaws.com/" + inventario.imagen;


    const registrar = async (e) => {

        if (lista.length > 0) {
            if (ruc !== "" && ruc !== null && nombrecomercial !== "") {
               
                lista.forEach((objeto) => {
                    const fetchData = async () => {
                        const response = await axios.post("http://localhost:8080/api/inventario/crearinventario", objeto)
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
                })
                
                const fetchData = async () => {
                    const response = await axios.post("http://localhost:8080/api/pedprovee/crearpedido", pedidoproveedor)
                        .then(response => {
                            console.log(response);
                            navigate("/vInventario")
                        })
                        .catch(error => {
                            console.log(error);
                        });
                };
                fetchData();

                return async () => {
                    // Realiza cualquier limpieza necesaria
                };

                


            } else {
                setError("Llenar los datos del Proveedor");
                setTimeout(() => {
                    setError("");
                }, 2000);
            }
        } else {
            setError("Agrege al menos un producto");
            setTimeout(() => {
                setError("");
            }, 2000);
        }

    }

    const handlegeneroChange = (event) => {
        const nuevaCedula = event.target.value;
        setInventario({ ...inventario, tipo: nuevaCedula });
    };

    function eliminarproductos(index, listas) {
        const indiceAEliminar = index;
        const nuevaLista = [...lista];
        
        const pt= listas.valor*listas.cantidad;
        const precioto= pTotal-pt;
        setPtotal(precioto);


        const preciot = pTotal - listas.precio_total
        console.log(listas.valor, "fas", pTotal)
        console.log(preciot)
        const ivat = preciot * 0.12;
        const subtotalt = preciot - ivat;


        
        setIva(ivat.toFixed(2));
        setSubtotal(subtotalt.toFixed(2));

        nuevaLista.splice(indiceAEliminar, 1);
        setLista(nuevaLista);



    }


    return (

        <div >
            {error && (
                <div className="alert alert-danger text-center" role="alert">
                    {error}
                </div>
            )}

            <div style={{ marginLeft: '375px' }}>
                <br />
                <label>Ruc:</label>

                <input type="number" placeholder='Ingrese el Ruc del proveedor' style={{ width: '30%', marginLeft: '20px', marginRight: "93px" }} value={ruc} onChange={handleChange}></input>

                <label >Proveedor:</label>
                <input placeholder='Aqui aparecera el nombre del proveedor' style={{ width: '30%', marginLeft: '18px' }} value={nombreproveedor} readonly></input><br />
                <label style={{ marginLeft: '350px', marginTop: '10px' }}>Nombre Comercial:</label>
                <input placeholder='Aqui aparecera el nombre del comercial' style={{ width: '30%', marginLeft: '18px' }} value={nombrecomercial} readonly></input>

            </div>
            <hr></hr>

            {validar ? (
                <div className="display-flex">
                    <div style={{ marginLeft: '150px', fontFamily: 'cursive' }}>
                        Cantidad:
                        <input
                            type="number"
                            value={inventario.cantidad}
                            style={{ width: "6%", marginLeft: "10px", marginRight: "10px" }}
                            onChange={(e) => setInventario({ ...inventario, cantidad: e.target.value })}
                        />


                        Precio Unitario:
                        <input
                            type="number"
                            value={inventario.valor}
                            style={{ width: "6%", marginRight: "10px", marginLeft: "10px" }}
                            onChange={(e) => setInventario({ ...inventario, valor: e.target.value })}

                        />
                        Fecha Caducidad:
                        <input
                            type="date"
                            value={inventario.fecha_caducidad}
                            style={{ marginLeft: "10px" }}
                            min={new Date().toISOString().split("T")[0]}
                            onChange={(e) => setInventario({ ...inventario, fecha_caducidad: e.target.value })}
                            readonly
                            onKeyDown={(e) => {
                                e.preventDefault();

                            }}
                        />

                        <br></br><br></br>

                        Nombre:
                        <input
                            placeholder='Ingrese el nombre del producto'
                            value={inventario.nombre}
                            style={{ width: '30%', marginLeft: '18px', marginRight: "10px" }}
                            onChange={(e) => setInventario({ ...inventario, nombre: e.target.value })}
                        ></input>
                        Tipo:
                        <select
                            value={tipo}
                            onChange={handlegeneroChange}
                            style={{ marginLeft: "17px", marginRight: "5px", marginTop: "3px", width: "160px" }} >
                            <option value="">Seleccione</option>
                            <option value="ABARROTES">Abarrotes</option>
                            <option value="BEBIDAS">Bebidas</option>
                            <option value="LACTEOS">Lacteos</option>
                            <option value="SNACKS">Snacks</option>
                            <option value="LICORES">Licores</option>
                            <option value="CERVEZAS">Cervezas</option>
                        </select>
                        <br /><br />
                        <button style={{ marginLeft: "30%" }} onClick={AgregarProducto}>AGREGAR PRODUCTO</button>

                    </div>
                    <div>
                        <img src={urlimagen} alt="Mi imagen" style={{ width: "300px", height: "150px" }} /><br />
                        <input type="file" name='file' onChange={handleImage} style={{ marginTop: "10px" }}></input><br />
                        <button onClick={handleApi} style={{ marginTop: "10px", marginLeft: "90px" }} >Cargar Imagen</button>
                    </div>
                </div>
            ) : <div style={{ textAlign: "center" }}>
                SELECCIONE PRIMERO UN PROVEEDOR PARA AGREGAR LOS PRODUCTOS
            </div>}




            <br></br>
            <div className="display-flex">
                <div style={{ height: "250px", width: "1000px", overflowY: "scroll" }}>
                    <table className="table border shadow" style={{ width: '98%', marginLeft: '15px' }}>
                        <thead>
                            <tr>
                                <th scope="col">Nombre</th>
                                <th scope="col">Cantidad</th>
                                <th scope="col">Precio Unitario</th>
                                <th scope="col">Fecha de Caducidad</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                lista.map((lista, index) => (
                                    <tr>
                                        <td style={{ width: '25%' }}>{lista.nombre}</td>
                                        <td style={{ width: '5%' }}>{lista.cantidad} </td>
                                        <td style={{ width: '5%' }}>{lista.valor}</td>
                                        <td style={{ width: '5%' }}>{lista.fecha_caducidad}</td>
                                        <td style={{ width: '5%' }}>
                                            <button onClick={() => eliminarproductos(index, lista)}> <FontAwesomeIcon icon={faTrashAlt} />
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
                    SubTotal: <input readOnly style={{ width: "25%", marginLeft: "2px" }} value={subtotal}></input><br></br>
                    Iva: <input readOnly style={{ width: "25%", marginLeft: "43px" }} value={iva}></input><br></br>
                    Total: <input readOnly style={{ width: "25%", marginLeft: "29px" }} value={pTotal} ></input><br></br>
                </div>
            </div>
            <div>
                <button className="btn btn-outline-primary" style={{ marginLeft: "30%", width: "10%" }} onClick={registrar}>Guardar</button>
            </div>

        </div>
    )
}





