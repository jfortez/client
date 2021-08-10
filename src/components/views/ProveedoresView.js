import React, { useEffect, useState } from "react";
import Topbar from "../layouts/topbar/Topbar";
import useValues from "../../provider/useValues";
import { Link, useHistory } from "react-router-dom";
import services from "../../services/proveedores";
import { Loader } from "../../elements/Loader";

const ProveedoresView = () => {
  const { isCollapsed } = useValues();
  const [proveedores, setProveedores] = useState([]);
  const [isListed, setIsListed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();
  const nuevoItem = () => {
    history.push("/dashboard/proveedores/create");
  };
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
        <h1>Proveedores</h1>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/dashboard">Home</Link>
              </li>
              <li>
                <b>Proveedores</b>
              </li>
            </ul>
          </nav>
        </div>
        <div>
          <button onClick={nuevoItem}>Nuevo Proveedor</button>
        </div>
        <div>
          <table>
            <thead>
              <tr>
                <th>RUC</th>
                <th>Nombre</th>
                <th>Direccion</th>
                <th>Ciudad</th>
                <th>Telefono</th>
                <th>Email</th>
                <th>Creado el</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <Loader loading={isLoading} />
              ) : proveedores ? (
                proveedores.map((item) => {
                  return (
                    <tr key={item.id}>
                      <td>{item.ruc}</td>
                      <td>{item.nombre}</td>
                      <td>{item.direccion}</td>
                      <td>{item.ciudad}</td>
                      <td>{item.telefono}</td>
                      <td>{item.email}</td>
                      <td>{new Date(item.fecha_registro).toLocaleDateString()}</td>
                      <td>
                        <button onClick={() => handleBaja(item.id)}>Dar de Baja</button>
                        <button onClick={() => handleUpdate(item.id)}>Actualizar</button>
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
