import React, { useEffect, useState } from "react";
import Topbar from "../layouts/topbar/Topbar";
import useValues from "../../provider/useValues";
import { Link, useHistory } from "react-router-dom";
import proveedorServices from "../../services/proveedores";
import categoriaServices from "../../services/categoria";
import productoServices from "../../services/productos";
import services from "../../services/compras";
const ComprasCreate = () => {
  const {
    isCollapsed,
    comprasValues,
    setComprasValues,
    productosCompras,
    setProductosCompras,
    compraDetalle,
    setCompraDetalle,
    proveedor,
    setProveedor,
  } = useValues();
  const history = useHistory();
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
  const onSubmit = async (event) => {
    event.preventDefault();
    const proveedor = await proveedorServices.getProveedorByRUC({
      ruc: comprasValues.ruc_proveedor,
    });
    setProveedor(proveedor);
  };
  const listCategorias = async () => {
    const categorias = await categoriaServices.optionCategorias();
    setCategorias(categorias);
  };
  useEffect(() => {
    const notaCompras = productosCompras.reduce((acc, acv) => {
      const elementoYaExiste = acc.find((elemento) => elemento.cod_producto === acv.cod_producto);
      if (elementoYaExiste) {
        return acc.map((elemento) => {
          if (elemento.cod_producto === acv.cod_producto) {
            return {
              ...elemento,
              cantidad: elemento.cantidad + acv.cantidad,
              totalCompra: (elemento.cantidad + acv.cantidad) * parseFloat(elemento.costo),
            };
          }
          return elemento;
        });
      }
      return [...acc, acv];
    }, []);
    setCompraDetalle(notaCompras);
  }, [productosCompras, setCompraDetalle]);
  useEffect(() => {
    listCategorias();
  }, []);
  const handleAddProductos = async (event) => {
    event.preventDefault();
    const total = Number((productos.cantidad * productos.costo).toFixed(2));
    if (!productos.id_categoria > 0) {
      return console.log("debe ingresar una categoria");
    }
    const categoriaNombre = await categoriaServices.getCategoriasById(productos.id_categoria);
    const productoIngresado = {
      ...productos,
      categoria: categoriaNombre[0].nombre,
      totalCompra: total,
    };
    setProductosCompras([...productosCompras, productoIngresado]);
    setProductos({
      cod_producto: "",
      nombre: "",
      descripcion: "",
      cantidad: 0,
      costo: 0.0,
      precio: 0.0,
      id_categoria: "",
    });
  };
  const limpiar = () => {
    setComprasValues({ ruc_proveedor: "", fecha: "", num_factura: "" });
    setProductos({
      cod_producto: "",
      nombre: "",
      descripcion: "",
      cantidad: 0,
      costo: 0.0,
      precio: 0.0,
      id_categoria: "",
    });
    setProductosCompras([]);
    setCompraDetalle([]);
    setProveedor([]);
  };
  const handleCategoria = () => {
    history.push("/dashboard/productos/createCategory");
  };
  const handleSave = async () => {
    const costoTotal = compraDetalle.reduce((acc, acv) => {
      return acc + acv.totalCompra;
    }, 0);
    const cantidadTotal = compraDetalle.reduce((acc, acv) => {
      return acc + acv.cantidad;
    }, 0);
    const compras = {
      id_proveedor: proveedor[0].id,
      num_factura: comprasValues.num_factura,
      fecha: comprasValues.fecha,
      cantidad: cantidadTotal,
      total: costoTotal,
    };
    const nuevaCompra = await services.createCompras(compras);
    if (nuevaCompra) {
      addProductos();
      newDetalleCompra(nuevaCompra);
      limpiar();
    }
  };

  const addProductos = async () => {
    const productos = await productoServices.listProducts();
    const codProds = productos.map((p) => p.cod_producto);
    //este debe agregarse como producto nuevo
    let nuevoProducto = [];
    for (let i = 0; i < compraDetalle.length; i++) {
      const { cod_producto, nombre, descripcion, cantidad, costo, precio, id_categoria } =
        compraDetalle[i];
      const active = 1;
      if (!codProds.includes(cod_producto)) {
        const arr = [
          cod_producto,
          nombre,
          descripcion,
          cantidad,
          costo,
          precio,
          id_categoria,
          active,
        ];
        nuevoProducto.push(arr);
      }
    }
    //este debe actualizarse sumando la cantidad de producto
    const existente = [];
    for (const prd in productos) {
      for (const dtl in compraDetalle) {
        if (productos[prd].cod_producto === compraDetalle[dtl].cod_producto) {
          let total = productos[prd].cantidad + compraDetalle[dtl].cantidad;
          const { id } = productos[prd];
          const { costo, precio } = compraDetalle[dtl];
          const rs = [id, Number(costo), Number(precio), total];
          existente.push(rs);
        }
      }
    }
    if (nuevoProducto.length > 0) {
      await productoServices.multipleCreateProd({ nuevoProducto });
    }
    if (existente.length > 0) {
      await productoServices.updateByCompras({ existente });
    }
  };
  const newDetalleCompra = async (compraId) => {
    setTimeout(async () => {
      const productos = await productoServices.listProducts();
      const dtlleCompra = [];
      for (const prd in productos) {
        for (const dtl in compraDetalle) {
          if (productos[prd].cod_producto === compraDetalle[dtl].cod_producto) {
            const { id } = productos[prd];
            const { cantidad, costo, totalCompra } = compraDetalle[dtl];
            const arr = [compraId, id, cantidad, Number(costo), totalCompra];
            dtlleCompra.push(arr);
          }
        }
      }
      await services.newCompraDetalle({ dtlleCompra });
    }, 1500);
  };
  return (
    <>
      <Topbar />
      <div className={`wrapper ${isCollapsed ? "sidebar-collapsed" : ""}`}>
        <h1>Nueva Compra</h1>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/dashboard">Home</Link>
              </li>
              <li>
                <Link to="/dashboard/compras">Compras</Link>
              </li>
              <li>
                <b>Nueva Compra</b>
              </li>
            </ul>
          </nav>
        </div>
        <button onClick={limpiar}>Limpiar</button>
        <h4>Datos de Facturación</h4>
        <form onSubmit={onSubmit}>
          <div>
            <label htmlFor="ruc_proveedor">RUC Proveedor</label>
            <input
              type="text"
              id="ruc_proveedor"
              name="ruc_proveedor"
              value={comprasValues.ruc_proveedor}
              onChange={(e) =>
                setComprasValues({ ...comprasValues, ruc_proveedor: e.target.value })
              }
            />
            <button>Buscar</button>
          </div>
        </form>
        {!proveedor.message ? (
          proveedor.map((item) => {
            return (
              <ul key={item.id}>
                <li>
                  <b>Nombre Proveedor:</b>
                  {item.nombre}
                </li>
                <li>
                  <b>Dirección:</b> {item.direccion}
                </li>
                <li>
                  <b>Telefono:</b> {item.telefono}
                </li>
              </ul>
            );
          })
        ) : (
          <p>Proveedor no existe</p>
        )}
        <div>
          <label htmlFor="fecha">Fecha</label>
          <input
            type="date"
            id="fecha"
            value={comprasValues.fecha}
            onChange={(e) => setComprasValues({ ...comprasValues, fecha: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="num_factura">Numero Factura</label>
          <input
            type="text"
            id="num_factura"
            value={comprasValues.num_factura}
            onChange={(e) => setComprasValues({ ...comprasValues, num_factura: e.target.value })}
          />
        </div>
        <br />
        <div>
          <h4>Añadir Productos de la Compra</h4>
          <div>
            <label htmlFor="cod_producto">Codigo del Producto</label>
            <input
              type="text"
              id="cod_producto"
              value={productos.cod_producto}
              onChange={(e) => setProductos({ ...productos, cod_producto: e.target.value })}
            />
          </div>
          <div>
            <label htmlFor="nombre">Nombre del Producto</label>
            <input
              type="text"
              id="nombre"
              value={productos.nombre}
              onChange={(e) => setProductos({ ...productos, nombre: e.target.value })}
            />
          </div>
          <div>
            <label htmlFor="descripcion">Descripción del Producto</label>
            <input
              type="text"
              id="descripcion"
              value={productos.descripcion}
              onChange={(e) => setProductos({ ...productos, descripcion: e.target.value })}
            />
          </div>
          <div>
            <label htmlFor="cantidad">Cantidad del Producto</label>
            <input
              type="number"
              id="cantidad"
              value={parseInt(productos.cantidad)}
              onChange={(e) => setProductos({ ...productos, cantidad: Number(e.target.value) })}
            />
          </div>
          <div>
            <label htmlFor="costo">Costo del Producto</label>
            <input
              type="text"
              id="costo"
              value={productos.costo}
              onChange={(e) => setProductos({ ...productos, costo: e.target.value })}
            />
          </div>
          <div>
            <label htmlFor="precio">Precio Venta</label>
            <input
              type="text"
              id="precio"
              value={productos.precio}
              onChange={(e) => setProductos({ ...productos, precio: e.target.value })}
            />
          </div>
          <div>
            <label htmlFor="categoria">Categoría</label>
            <select
              value={productos.id_categoria}
              onChange={(e) => setProductos({ ...productos, id_categoria: Number(e.target.value) })}
            >
              <option value="0">Seleccione</option>
              {categorias
                ? categorias.map((item) => {
                    return (
                      <option value={item.id} key={item.id}>
                        {item.nombre}
                      </option>
                    );
                  })
                : null}
            </select>
            <button onClick={handleCategoria}>Añadir Categoría</button>
          </div>
          <button onClick={handleAddProductos}>Añadir</button>
        </div>
        <div>
          <h4>Productos Ingresados</h4>
          <table>
            <thead>
              <tr>
                <th>Codigo</th>
                <th>Nombre del Producto</th>
                <th>Cantidad</th>
                <th>Costo</th>
                <th>Precio Venta</th>
                <th>Total Compra</th>
                <th>Categoría</th>
              </tr>
            </thead>
            <tbody>
              {compraDetalle
                ? compraDetalle.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>{item.cod_producto}</td>
                        <td>{item.nombre}</td>
                        <td>{item.cantidad}</td>
                        <td>{item.costo}</td>
                        <td>{item.precio}</td>
                        <td>{item.totalCompra}</td>
                        <td>{item.categoria}</td>
                      </tr>
                    );
                  })
                : null}
            </tbody>
          </table>
          <button onClick={handleSave}>Guardar</button>
        </div>
      </div>
    </>
  );
};

export default ComprasCreate;
