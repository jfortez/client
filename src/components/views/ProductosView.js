import React, { useState, useEffect } from "react";
import "./DashboardView.css";
import Topbar from "../layouts/topbar/Topbar";
import useValues from "../../provider/useValues";
import services from "../../services/productos";
import { Link, useHistory } from "react-router-dom";
import { Loader } from "../../elements/Loader";
import { Delete, Update, Add } from "@material-ui/icons";
import swal from "sweetalert";

const ProductosView = () => {
  const { isCollapsed } = useValues();
  const history = useHistory();
  const [productos, setProductos] = useState([]);
  const [isListed, setIsListed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const handleDelete = async (id) => {
    const mensaje = await swal({
      title: "¿Estás seguro de eliminar la Fila?",
      // text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: {
        cancel: "Cancelar",
        confirm: "Aceptar",
      },
      dangerMode: true,
    });
    if (mensaje) {
      setIsLoading(true);
      const item = await services.bajaProductos(id);
      swal("Se ha eliminado la fila satisfatoriamente", {
        icon: "success",
      });
      if (item) {
        setIsListed(!isListed);
      }
    } else {
      return null;
    }
  };
  const handleUpdate = (id) => {
    history.push(`/dashboard/productos/${id}/edit`);
  };
  useEffect(() => {
    let source = services.Axios.CancelToken.source();
    let unmounted = false;
    const getProductos = async () => {
      try {
        const productos = await services.getProductos(source);
        if (!unmounted) {
          setProductos(productos);
          setIsLoading(false);
        }
      } catch (error) {
        if (!unmounted) {
          if (services.Axios.isCancel(error)) {
            console.log("AxiosCancel: caught cancel", error.message);
          } else {
            console.log("throw error", error.message);
          }
        }
      }
    };
    getProductos();
    return () => {
      unmounted = true;
      source.cancel("Cancelling in Cleanup");
    };
  }, [isListed]);
  return (
    <>
      <Topbar />
      <div className={`wrapper ${isCollapsed ? "sidebar-collapsed" : ""}`}>
        <h3 className="titulo">Productos</h3>
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
                <Link to="/dashboard/productos/categoria" className="navegacion__redirect">
                  Crear Categoría
                </Link>
              </li>
              <li> / </li>
              <li>
                <b>Productos</b>
              </li>
            </ul>
          </nav>
        </div>
        <div className="crear-item">
          <Link to="/dashboard/productos/createProduct" className="button__link">
            <button className="button crear">
              <span className="button__icon">
                <Add className="icon" />
              </span>
              <span className="button__text">Nuevo Producto</span>
            </button>
          </Link>
        </div>
        <div>
          <table className="paleBlueRows">
            <thead>
              <tr>
                <th>#</th>
                <th>Cod. Producto</th>
                <th>Nombre de Producto</th>
                <th>Descripción</th>
                <th>Stock</th>
                <th>Precio</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <Loader loading={isLoading} />
              ) : productos ? (
                productos.map((producto, index) => {
                  return (
                    <tr key={producto.id} className="rowData">
                      <td>{index + 1}</td>
                      <td>{producto.cod_producto}</td>
                      <td>{producto.nombre}</td>
                      <td>{producto.descripcion}</td>
                      <td>{producto.cantidad}</td>
                      <td>{producto.precio}</td>
                      <td className="botones">
                        <button onClick={() => handleDelete(producto.id)} className="button borrar">
                          <Delete />
                        </button>
                        <button
                          onClick={() => handleUpdate(producto.id)}
                          className="button actualizar"
                        >
                          <Update />
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : null}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ProductosView;
