import React, { useState, useEffect } from "react";
import "./DashboardView.css";
import Topbar from "../layouts/topbar/Topbar";
import useValues from "../../provider/useValues";
import services from "../../services/productos";
import { Link } from "react-router-dom";
const ProductosView = () => {
  const { isCollapsed } = useValues();
  const [productos, setProductos] = useState([]);
  const [isListed, setIsListed] = useState(false);
  const getProductos = async () => {
    const productos = await services.getProductos();
    setProductos(productos);
  };
  const handleDelete = async (id) => {
    const item = await services.deleteProductos(id);
    if (item) {
      setIsListed(true);
    }
  };
  const handleUpdate = () => {
    console.log("actualizar paciente");
  };
  useEffect(() => {
    getProductos();
    setIsListed(false);
  }, [isListed]);
  return (
    <>
      <Topbar />
      <div className={`wrapper ${isCollapsed ? "sidebar-collapsed" : ""}`}>
        <h1>Productos</h1>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/dashboard">Home</Link>
              </li>
              <li>
                <b>Productos</b>
              </li>
            </ul>
          </nav>
        </div>
        <div>
          <Link to="/dashboard/productos/createProduct">
            <button>Nuevo Producto</button>
          </Link>
          <Link to="/dashboard/productos/createCategory">
            <button>Nueva Categoría</button>
          </Link>
        </div>
        <div>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Cod. Producto</th>
                <th>Nombre de Producto</th>
                <th>Descripción</th>
                <th>Cantidad</th>
                <th>Precio</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {productos
                ? productos.map((producto) => {
                    return (
                      <tr key={producto.id}>
                        <td>{producto.id}</td>
                        <td>{producto.cod_producto}</td>
                        <td>{producto.nombre}</td>
                        <td>{producto.descripcion}</td>
                        <td>{producto.cantidad}</td>
                        <td>{producto.precio}</td>
                        <td>
                          <button onClick={() => handleDelete(producto.id)}>Eliminar</button>
                          <button onClick={() => handleUpdate()}>Actualizar</button>
                        </td>
                      </tr>
                    );
                  })
                : null}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ProductosView;
