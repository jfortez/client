import "./DashboardView.css";
import Topbar from "../layouts/topbar/Topbar";
import useValues from "../../provider/useValues";
import { useState, useEffect } from "react";
import axios from "axios";
const ProductCreate = () => {
  const { isCollapsed } = useValues();
  const [categorias, setCategorias] = useState([]);
  const [productos, setProductos] = useState({
    cod_producto: "",
    nombre: "",
    descripcion: "",
    cantidad: 0,
    costo: 0.0,
    precio: 0.0,
    id_categoria: 0,
  });
  useEffect(() => {
    axios
      .get("http://192.168.0.104:5000/api/categorias")
      .then((response) => setCategorias(response.data));
  }, []);
  const handleInputChange = (event) => {
    setProductos({
      ...productos,
      [event.target.name]: event.target.value,
    });
  };
  const onSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://192.168.0.104:5000/api/productos/create", productos)
      .then((response) => console.log(response));
  };
  return (
    <>
      <Topbar />
      <div className={`wrapper ${isCollapsed ? "sidebar-collapsed" : ""}`}>
        <h1>Create Products</h1>
        <form onSubmit={onSubmit}>
          <div>
            <label htmlFor="cod_producto">Codigo:</label>
            <input
              type="text"
              name="cod_producto"
              value={productos.cod_producto}
              onChange={handleInputChange}
              placeholder="Codigo"
            />
          </div>
          <div>
            <label htmlFor="nombre">Nombre del Producto:</label>
            <input
              type="text"
              name="nombre"
              value={productos.nombre}
              onChange={handleInputChange}
              placeholder="Nombre del Producto"
            />
          </div>
          <div>
            <label htmlFor="descripcion">Descripción del Producto:</label>
            <input
              type="text"
              name="descripcion"
              value={productos.descripcion}
              onChange={handleInputChange}
              placeholder="Descripción del Producto"
            />
          </div>
          <div>
            <label htmlFor="costo">Cantidad:</label>
            <input
              type="number"
              name="cantidad"
              value={productos.cantidad}
              onChange={handleInputChange}
              placeholder="Cantidad"
            />
          </div>
          <div>
            <label htmlFor="costo">Costo:</label>
            <input
              type="number"
              name="costo"
              value={productos.costo}
              onChange={handleInputChange}
              placeholder="Costo"
            />
          </div>
          <div>
            <label htmlFor="cod_producto">Precio:</label>
            <input
              type="number"
              name="precio"
              value={productos.precio}
              onChange={handleInputChange}
              placeholder="Precio"
            />
          </div>
          <div>
            <label htmlFor="categoria">Categoría:</label>
            <select value={productos.id_categoria} name="id_categoria" onChange={handleInputChange}>
              <option value="0">Seleccione</option>
              {categorias.map((category) => {
                return (
                  <option value={category.id} key={category.id}>
                    {category.nombre}
                  </option>
                );
              })}
            </select>
          </div>
          <button>Enviar</button>
        </form>
      </div>
    </>
  );
};

export default ProductCreate;
