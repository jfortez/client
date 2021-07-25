import React, { useState, useEffect } from "react";
import "./DashboardView.css";
import Topbar from "../layouts/topbar/Topbar";
import productoService from "../../services/productos";
import { Link } from "react-router-dom";
const ProductosView = () => {
  const [productos, setProductos] = useState([]);
  const getProductos = async () => {
    const productos = await productoService.getProductos();
    setProductos(productos);
    console.log(productos);
  };
  useEffect(() => {
    getProductos();
  }, []);
  return (
    <>
      <Topbar />
      <div className="wrapper">
        <h3>Productos</h3>
        <div>
          <Link to="/dashboard/productos/createProduct">
            <button>Nuevo Paciente</button>
          </Link>
          <Link to="/dashboard/productos/createCategory">
            <button>Nuevo Categoría</button>
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
                <th>Categoría</th>
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
                        <td>{producto.id_categoria}</td>
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
