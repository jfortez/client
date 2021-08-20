import React, { useEffect, useState } from "react";
import Topbar from "../layouts/topbar/Topbar";
import useValues from "../../provider/useValues";
import { Link, useHistory } from "react-router-dom";
import services from "../../services/proveedores";
import { Loader } from "../../elements/Loader";
import { Delete, Update, Add } from "@material-ui/icons";

const ProveedoresView = () => {
  const { isCollapsed } = useValues();
  const [proveedores, setProveedores] = useState([]);
  const [isListed, setIsListed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();
  const handleBaja = async (id) => {
    setIsLoading(true);
    const item = await services.bajaProveedor(id);
    if (item) {
      setIsListed(true);
    }
  };
  const handleUpdate = (id) => {
    history.push(`/dashboard/proveedores/${id}/edit`);
  };
  useEffect(() => {
    let source = services.Axios.CancelToken.source();
    let unmounted = false;
    const getItems = async () => {
      try {
        const items = await services.getProveedores(source);
        if (!unmounted) {
          setProveedores(items);
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
        <h3 className="titulo">Proveedores</h3>
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
                <b>Proveedores</b>
              </li>
            </ul>
          </nav>
        </div>
        <div className="crear-item">
          <Link to="/dashboard/proveedores/create" className="button__link">
            <button className="button crear">
              <span className="button__icon">
                <Add className="icon" />
              </span>
              <span className="button__text">Nuevo Proveedor</span>
            </button>
          </Link>
        </div>
        <div>
          <table className="paleBlueRows">
            <thead>
              <tr>
                <th>#</th>
                <th>RUC</th>
                <th>Razon Social</th>
                <th>Direccion</th>
                <th>Ciudad</th>
                <th>Telefono</th>
                <th>Email</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <Loader loading={isLoading} />
              ) : proveedores ? (
                proveedores.map((item, index) => {
                  return (
                    <tr key={item.id} className="rowData">
                      <td>{index + 1}</td>
                      <td>{item.ruc}</td>
                      <td>{item.nombre}</td>
                      <td>{item.direccion}</td>
                      <td>{item.ciudad}</td>
                      <td>{item.telefono}</td>
                      <td>{item.email}</td>
                      <td className="botones">
                        <button onClick={() => handleBaja(item.id)} className="button borrar">
                          <Delete />
                        </button>
                        <button onClick={() => handleUpdate(item.id)} className="button actualizar">
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

export default ProveedoresView;
