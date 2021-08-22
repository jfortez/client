import React, { useEffect, useState } from "react";
import Topbar from "../layouts/topbar/Topbar";
import useValues from "../../provider/useValues";
import { Link } from "react-router-dom";
import proveedorServices from "../../services/proveedores";
import categoriaServices from "../../services/categoria";
import productoServices from "../../services/productos";
import services from "../../services/compras";
import notificacion from "../../utils/Notificaciones";
import { ClearAll, LocalMall, Search } from "@material-ui/icons";
import ProductosCreateForm from "./ProductosCreateForm";

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
  const [categorias, setCategorias] = useState([]);
  const [cod_Producto, setCod_Producto] = useState({ campo: "", valido: null });
  const [nombre, setNombre] = useState({ campo: "", valido: null });
  const [descripcion, setDescripcion] = useState({ campo: "", valido: null });
  const [cantidad, setCantidad] = useState({ campo: "", valido: null });
  const [costo, setCosto] = useState({ campo: "", valido: null });
  const [precio, setPrecio] = useState({ campo: "", valido: null });
  const [idCategoria, setIdCategoria] = useState({ campo: "", valido: null });
  const listCategorias = async () => {
    const categorias = await categoriaServices.optionCategorias();
    setCategorias(categorias);
  };
  useEffect(() => {
    listCategorias();
  }, []);
  const onSubmitGetProveedor = async (event) => {
    event.preventDefault();
    const proveedor = await proveedorServices.getProveedorByRUC({
      ruc: comprasValues.ruc_proveedor,
    });
    if (!proveedor.message) {
      setProveedor(proveedor);
    } else {
      return notificacion("Error", "Proveedor no Existe", "danger");
    }
  };

  useEffect(() => {
    const notaCompras = productosCompras.reduce((acc, acv) => {
      const elementoYaExiste = acc.find((elemento) => elemento.cod_producto === acv.cod_producto);
      if (elementoYaExiste) {
        return acc.map((elemento) => {
          if (elemento.cod_producto === acv.cod_producto) {
            return {
              ...elemento,
              cantidad: Number(elemento.cantidad) + Number(acv.cantidad),
              totalCompra: Number(
                (Number(elemento.cantidad) + Number(acv.cantidad)) *
                  Number(elemento.costo).toFixed(2)
              ),
            };
          }
          return elemento;
        });
      }
      return [...acc, acv];
    }, []);
    setCompraDetalle(notaCompras);
  }, [productosCompras, setCompraDetalle]);
  const onSubmit = async (event) => {
    event.preventDefault();
    if (
      cod_Producto.valido === "true" &&
      nombre.valido === "true" &&
      descripcion.valido === "true" &&
      cantidad.valido === "true" &&
      costo.valido === "true" &&
      precio.valido === "true" &&
      idCategoria.campo > 0
    ) {
      const nuevoProducto = {
        cod_producto: cod_Producto.campo,
        nombre: nombre.campo,
        descripcion: descripcion.campo,
        cantidad: cantidad.campo,
        costo: costo.campo,
        precio: precio.campo,
        id_categoria: idCategoria.campo,
      };
      await services.createProductos(nuevoProducto);
      notificacion("Añadir Producto", "Se ha creado Producto satisfatoriamente", "success");
      setCod_Producto({ campo: "", valido: null });
      setNombre({ campo: "", valido: null });
      setDescripcion({ campo: "", valido: null });
      setCantidad({ campo: "", valido: null });
      setCosto({ campo: "", valido: null });
      setPrecio({ campo: "", valido: null });
      setIdCategoria({ campo: "", valido: null });
    } else {
      notificacion("Añadir Producto", "Debe rellenar los campos para proceder", "warning");
    }
  };
  const handleAddProductos = async (event) => {
    event.preventDefault();
    const total = Number((Number(cantidad.campo) * Number(costo.campo)).toFixed(2));
    if (!idCategoria.campo > 0) {
      return notificacion("Añadir Producto", "Debe rellenar los campos para proceder", "warning");
    }
    const categoriaNombre = await categoriaServices.getCategoriasById(idCategoria.campo);
    const productoIngresado = {
      cod_producto: cod_Producto.campo,
      nombre: nombre.campo,
      descripcion: descripcion.campo,
      cantidad: parseInt(cantidad.campo),
      costo: Number(costo.campo).toFixed(2),
      precio: Number(precio.campo).toFixed(2),
      id_categoria: idCategoria.campo,
      categoria: categoriaNombre[0].nombre,
      totalCompra: total,
    };
    setProductosCompras([...productosCompras, productoIngresado]);
    setCod_Producto({ campo: "", valido: null });
    setNombre({ campo: "", valido: null });
    setDescripcion({ campo: "", valido: null });
    setCantidad({ campo: "", valido: null });
    setCosto({ campo: "", valido: null });
    setPrecio({ campo: "", valido: null });
    setIdCategoria({ campo: "", valido: null });
  };
  const limpiar = () => {
    setComprasValues({ ruc_proveedor: "", fecha: "", num_factura: "" });
    setCod_Producto({ campo: "", valido: null });
    setNombre({ campo: "", valido: null });
    setDescripcion({ campo: "", valido: null });
    setCantidad({ campo: "", valido: null });
    setCosto({ campo: "", valido: null });
    setPrecio({ campo: "", valido: null });
    setIdCategoria({ campo: "", valido: null });
    setProductosCompras([]);
    setCompraDetalle([]);
    setProveedor([]);
  };
  const handleSave = async () => {
    if (!proveedor.length > 0) {
      return notificacion("Añadir Compra", "Debe ingresar un proveedor", "warning");
    }
    if (!compraDetalle.length > 0) {
      return notificacion("Añadir Compra", "Debe ingresar al menos un producto", "danger");
    }
    const costoTotal = compraDetalle.reduce((acc, acv) => {
      return acc + acv.totalCompra;
    }, 0);
    const cantidadTotal = compraDetalle.reduce((acc, acv) => {
      return acc + Number(acv.cantidad);
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
      notificacion("Añadir Compra", "Se ha creado Compra satisfatoriamente", "success");
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
          parseInt(cantidad),
          Number(costo),
          Number(precio),
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
          let total = productos[prd].cantidad + Number(compraDetalle[dtl].cantidad);
          const { id } = productos[prd];
          const { costo, precio } = compraDetalle[dtl];
          const rs = [id, Number(costo).toFixed(2), Number(precio).toFixed(2), total];
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
            const arr = [compraId, id, cantidad, Number(costo), Number(totalCompra).toFixed(2)];
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
        <h3 className="titulo">Nueva Compra</h3>
        <div className="navegacion">
          <nav>
            <ul>
              <li>
                <Link to="/dashboard" className="navegacion__redirect">
                  Inicio
                </Link>
              </li>
              <li> / </li>
              <li>
                <Link to="/dashboard/compras" className="navegacion__redirect">
                  Compras
                </Link>
              </li>
              <li> / </li>
              <li>
                <b>Nueva Compra</b>
              </li>
            </ul>
          </nav>
        </div>
        <h4>Datos de Facturación</h4>
        <form onSubmit={onSubmitGetProveedor}>
          <div className="venta__cliente">
            <div className="search__info">
              <label htmlFor="ruc_proveedor" className="label__info">
                Proveedor
              </label>
              <input
                type="text"
                id="ruc_proveedor"
                name="ruc_proveedor"
                value={comprasValues.ruc_proveedor}
                onChange={(e) =>
                  setComprasValues({ ...comprasValues, ruc_proveedor: e.target.value })
                }
              />
              <button>
                <Search />
              </button>
            </div>
            <div className="info__cliente">
              <div className="contenido">
                {proveedor.length > 0 ? (
                  <table className="paleBlueRows venta">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Proveedor</th>
                        <th>Dirección</th>
                        <th>Telefono</th>
                        <th>Email</th>
                      </tr>
                    </thead>
                    <tbody>
                      {proveedor.length > 0
                        ? proveedor.map((item, index) => {
                            return (
                              <tr key={index} className="rowData">
                                <td>{index + 1}</td>
                                <td>{item.nombre}</td>
                                <td>{item.direccion}</td>
                                <td>{item.telefono}</td>
                                <td>{item.email}</td>
                              </tr>
                            );
                          })
                        : null}
                    </tbody>
                  </table>
                ) : (
                  <h1 className="title__info">Ingrese un RUC para visualizar</h1>
                )}
              </div>
            </div>
          </div>
        </form>
        <div className="venta__manual">
          <div className="venta__importe">
            <label htmlFor="fecha_emision" className="label__info">
              Fecha Emisión
            </label>
            <input
              type="date"
              id="fecha_emision"
              value={comprasValues.fecha}
              onChange={(e) => setComprasValues({ ...comprasValues, fecha: e.target.value })}
            />
          </div>
          <div className="venta__importe devolucion">
            <label htmlFor="num_factura" className="label__info">
              Factura No.
            </label>
            <input
              type="text"
              name="num_factura"
              id="num_factura"
              value={comprasValues.num_factura}
              onChange={(e) => setComprasValues({ ...comprasValues, num_factura: e.target.value })}
            />
          </div>
          <div className="venta__btns">
            <button className="button crear crear_venta" onClick={handleSave}>
              <span className="button__icon">
                <LocalMall className="icon" />
              </span>
              <span className="button__text">Guardar Compra</span>
            </button>
            <button className="button limpiar" onClick={limpiar}>
              <span className="button__icon">
                <ClearAll className="icon" />
              </span>
              <span className="button__text">Limpiar</span>
            </button>
          </div>
        </div>
        <div className="ingresar__productos">
          <ProductosCreateForm
            onSubmit={onSubmit}
            cod_Producto={cod_Producto}
            setCod_Producto={setCod_Producto}
            nombre={nombre}
            setNombre={setNombre}
            descripcion={descripcion}
            setDescripcion={setDescripcion}
            cantidad={cantidad}
            setCantidad={setCantidad}
            costo={costo}
            setCosto={setCosto}
            precio={precio}
            setPrecio={setPrecio}
            idCategoria={idCategoria}
            setIdCategoria={setIdCategoria}
            categorias={categorias}
            handleAddProductos={handleAddProductos}
          />
        </div>
        <div>
          <h4>Productos Ingresados</h4>
          <table className="paleBlueRows venta">
            <thead>
              <tr>
                <th>#</th>
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
                      <tr key={index} className="rowData">
                        <td>{index + 1}</td>
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
        </div>
      </div>
    </>
  );
};

export default ComprasCreate;
