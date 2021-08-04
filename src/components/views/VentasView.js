import "./DashboardView.css";
import Topbar from "../layouts/topbar/Topbar";
import useValues from "../../provider/useValues";
import clienteServices from "../../services/cliente";
import productoServices from "../../services/productos";
import { useState } from "react";
const VentasView = () => {
  const { isCollapsed, datosVentas, setDatosVentas, types, setTypes } = useValues();
  const [productosVenta, setProductosVenta] = useState([]);
  const [noDuplicados, setNoDuplicados] = useState([]);
  const getClienteByRUC = async (event) => {
    event.preventDefault();
    const clienteData = await clienteServices.getRUC({ ruc: types.ruc });
    setDatosVentas({ ...datosVentas, cliente: clienteData });
  };
  const getProductosByCod = async (event) => {
    event.preventDefault();
    const productoData = await productoServices.getProductoByCod({
      cod_producto: types.cod_producto,
    });
    setDatosVentas({ ...datosVentas, producto: productoData });
  };
  const insertProducto = () => {
    let cantidad = 1;
    if (datosVentas.producto.length > 0) {
      setProductosVenta([...productosVenta, datosVentas.producto]);
      const duplicado = productosVenta.filter(
        (unico) => unico[0].cod_producto === types.cod_producto
      );
      if (duplicado.length > 0) {
        cantidad = cantidad + duplicado.length;
        const test = noDuplicados.map((item) => {
          if (item[0].cod_producto === types.cod_producto) {
            item[0].cantidad = cantidad;
          }
          return item;
        });
        console.log(test);
      } else {
        setNoDuplicados([...noDuplicados, datosVentas.producto]);
      }
      setDatosVentas({ ...datosVentas, producto: [] });
      setTypes({ ...types, cod_producto: "" });
    } else {
      console.log("debe ingresar un producto a buscar");
    }
  };
  const limpiar = () => {
    setTypes({ ...types, ruc: "", cod_producto: "" });
    setDatosVentas({ cliente: [], producto: [] });
  };
  const fecha = new Date().toLocaleDateString();
  return (
    <>
      <Topbar />
      <div className={`wrapper ${isCollapsed ? "sidebar-collapsed" : ""}`}>
        <h1>Ventas</h1>
        <p>
          <strong>Fecha:</strong> {fecha}
        </p>
        <p>
          <strong>Venta No:</strong>
        </p>
        <button onClick={limpiar}>Limpiar</button>
        <form onSubmit={getClienteByRUC}>
          <div>
            <h4>Cliente</h4>
            <label htmlFor="ruc">RUC:</label>
            <input
              type="text"
              name="ruc"
              id="ruc"
              value={types.ruc}
              onChange={(e) => setTypes({ ...types, ruc: e.target.value })}
            />
            <button>Buscar</button>
            {!datosVentas.cliente.message ? (
              datosVentas.cliente.map((data) => {
                return (
                  <ul key={data.id}>
                    <li>
                      <b>Nombres:</b>
                      {data.nombres} {data.apellidos}
                    </li>
                    <li>
                      <b>Dirección:</b> {data.direccion}
                    </li>
                  </ul>
                );
              })
            ) : (
              <p>Cliente no existe</p>
            )}
          </div>
        </form>
        <form onSubmit={getProductosByCod}>
          <div>
            <h4>Producto</h4>
            <label htmlFor="cod_producto">Codigo de Producto:</label>
            <input
              type="text"
              name="cod_producto"
              id="cod_producto"
              value={types.cod_producto}
              onChange={(e) => setTypes({ ...types, cod_producto: e.target.value })}
            />
            <button>Buscar</button>
            {!datosVentas.producto.message ? (
              datosVentas.producto.map((data) => {
                return (
                  <ul key={data.id}>
                    <li>
                      <b>Nombre del producto: </b>
                      {data.nombre}
                    </li>
                    <li>
                      <b>Cantidad Existente: </b>
                      {data.cantidad}
                    </li>
                    <li>
                      <b>Precio Unitario: </b>
                      {data.precio}
                    </li>
                  </ul>
                );
              })
            ) : (
              <p>Producto no existe</p>
            )}
          </div>
        </form>
        <div>
          <br />
          <label htmlFor="cantidad">Cantidad</label>
          <input
            type="number"
            name="cantidad"
            id="cantidad"
            value={types.cantidad}
            onChange={(e) => setTypes({ ...types, cantidad: e.target.value })}
          />
          <br />
          <button onClick={insertProducto}>Añadir Producto</button>
        </div>
        <div>
          <table>
            <thead>
              <tr>
                <th>Codigo</th>
                <th>Producto</th>
                <th>Cantidad</th>
                <th>Precio</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {noDuplicados
                ? noDuplicados.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>{item[0].cod_producto}</td>
                        <td>{item[0].nombre}</td>
                        <td>{item[0].cantidad}</td>
                        <td>{item[0].precio}</td>
                        <td>Total</td>
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

export default VentasView;
