import React, { useEffect, useState } from "react";
import "./DashboardView.css";
import Topbar from "../layouts/topbar/Topbar";
import services from "../../services/cliente";
import useValues from "../../provider/useValues";
import { Link, useHistory } from "react-router-dom";
import { Loader } from "../../elements/Loader";
import { Delete, Update, Add } from "@material-ui/icons";

const ClienteView = () => {
  const { isCollapsed } = useValues();
  const history = useHistory();
  const [clientes, setClientes] = useState([]);
  const [isListed, setIsListed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const handleDelete = async (id) => {
    setIsLoading(true);
    const cliente = await services.bajaCliente(id);
    if (cliente) {
      setIsListed(!isListed);
    }
  };
  const handleUpdate = (id) => {
    history.push(`/dashboard/clientes/${id}/edit`);
  };
  useEffect(() => {
    let source = services.Axios.CancelToken.source();
    let unmounted = false;
    const getClientes = async () => {
      try {
        const cliente = await services.getClientes(source);
        if (!unmounted) {
          setClientes(cliente);
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
    getClientes();
    return () => {
      unmounted = true;
      source.cancel("Cancelling in Cleanup");
    };
  }, [isListed]);
  return (
    <>
      <Topbar />
      <div className={`wrapper ${isCollapsed ? "sidebar-collapsed" : ""}`}>
        <h3 className="titulo">Clientes</h3>

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
                <b>Clientes</b>
              </li>
            </ul>
          </nav>
        </div>
        <div className="crear-item">
          <Link to="/dashboard/clientes/create" className="button__link">
            <button className="button crear">
              <span className="button__icon">
                <Add className="icon" />
              </span>
              <span className="button__text">Nuevo Clente</span>
            </button>
          </Link>
        </div>
        <div>
          <table className="paleBlueRows">
            <thead>
              <tr>
                <th>#</th>
                <th>RUC</th>
                <th>Nombres Completos</th>
                <th>Dirección</th>
                <th>Email</th>
                <th>Telefono</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <Loader loading={isLoading} />
              ) : (
                clientes.map((cliente, index) => {
                  return (
                    <tr key={cliente.id} className="rowData">
                      <td>{index + 1}</td>
                      <td>{cliente.ruc}</td>
                      <td>
                        {cliente.nombres} {cliente.apellidos}
                      </td>
                      <td>{cliente.direccion}</td>
                      <td>{cliente.email}</td>
                      <td>{cliente.telefono}</td>
                      <td className="botones">
                        <button onClick={() => handleDelete(cliente.id)} className="button borrar">
                          <Delete />
                        </button>
                        <button
                          onClick={() => handleUpdate(cliente.id)}
                          className="button actualizar"
                        >
                          <Update />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ClienteView;
