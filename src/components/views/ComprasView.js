import React, { useEffect, useState } from "react";
import Topbar from "../layouts/topbar/Topbar";
import useValues from "../../provider/useValues";
import { useHistory, Link } from "react-router-dom";
import services from "../../services/compras";
import { Loader } from "../../elements/Loader";
import { Delete, Update, Add } from "@material-ui/icons";
import swal from "sweetalert";

const ComprasView = () => {
  const { isCollapsed } = useValues();
  const [compras, setCompras] = useState([]);
  const [isListed, setIsListed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();
  const handleBaja = async (id) => {
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
      const item = await services.bajaCompras(id);

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
  const handleShow = (id) => {
    history.push(`/dashboard/compras/reporte/${id}`);
  };
  useEffect(() => {
    let source = services.Axios.CancelToken.source();
    let unmounted = false;
    const getItems = async () => {
      try {
        const items = await services.getCompras(source);
        if (!unmounted) {
          setCompras(items);
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
    getItems();
    setIsListed(false);
    return () => {
      unmounted = true;
      source.cancel("Cancelling in Cleanup");
    };
  }, [isListed]);
  return (
    <>
      <Topbar />
      <div className={`wrapper ${isCollapsed ? "sidebar-collapsed" : ""}`}>
        <h3 className="titulo">Compras</h3>
        <div className="navegacion">
          <nav>
            <ul>
              <li>
                <Link to="/dashboard" className="navegacion__redirect">
                  Home
                </Link>
              </li>
              <li> / </li>
              <li>
                <b>Compras</b>
              </li>
            </ul>
          </nav>
        </div>
        <div className="crear-item">
          <Link to="/dashboard/compras/create" className="button__link">
            <button className="button crear">
              <span className="button__icon">
                <Add className="icon" />
              </span>
              <span className="button__text">Nuevo Compra</span>
            </button>
          </Link>
        </div>
        <div>
          <table className="paleBlueRows">
            <thead>
              <tr>
                <th>#</th>
                <th>Fecha</th>
                <th>No. Factura</th>
                <th>RUC Proveedor</th>
                <th>Proveedor</th>
                <th>Cantidad Productos</th>
                <th>Total</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <Loader loading={isLoading} />
              ) : compras ? (
                compras.map((item, index) => {
                  return (
                    <tr key={item.id} className="rowData">
                      <td>{index + 1}</td>
                      <td>{item.fecha}</td>
                      <td>{item.num_factura}</td>
                      <td>{item.ruc}</td>
                      <td>{item.nombre}</td>
                      <td>{item.cantidad}</td>
                      <td>{item.total}</td>
                      <td className="botones">
                        <button onClick={() => handleBaja(item.id)} className="button borrar">
                          <Delete />
                        </button>
                        <button onClick={() => handleShow(item.id)} className="button actualizar">
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

export default ComprasView;
