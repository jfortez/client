import React, { useEffect, useState } from "react";
import "./DashboardView.css";
import Topbar from "../layouts/topbar/Topbar";
import services from "../../services/cliente";
import useValues from "../../provider/useValues";
import { Link } from "react-router-dom";
import { Loader } from "../../elements/Loader";

const ClienteView = () => {
  const { isCollapsed } = useValues();
  const [clientes, setClientes] = useState([]);
  const [isListed, setIsListed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const handleDelete = async (id) => {
    const cliente = await services.deleteCliente(id);
    if (cliente) {
      setIsListed(true);
    }
  };
  const handleUpdate = () => {
    console.log("actualizar paciente");
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
        <h1>Clientes</h1>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/dashboard">Home</Link>
              </li>
              <li>
                <b>Clientes</b>
              </li>
            </ul>
          </nav>
        </div>
        <div>
          <Link to="/dashboard/clientes/create">
            <button>Nuevo Cliente</button>
          </Link>
        </div>
        <div>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>RUC</th>
                <th>Nombres Completos</th>
                <th>Email</th>
                <th>Telefono</th>
                <th>Dirección</th>
                <th>Created At</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <Loader loading={isLoading} />
              ) : (
                clientes.map((cliente) => {
                  return (
                    <tr key={cliente.id}>
                      <td>{cliente.id}</td>
                      <td>{cliente.ruc}</td>
                      <td>
                        {cliente.nombres} {cliente.apellidos}
                      </td>
                      <td>{cliente.email}</td>
                      <td>{cliente.telefono}</td>
                      <td>{cliente.direccion}</td>
                      <td>{new Date(cliente.fecha_registro).toLocaleDateString()}</td>
                      <td>
                        <button onClick={() => handleDelete(cliente.id)}>Eliminar</button>
                        <button onClick={() => handleUpdate()}>Actualizar</button>
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
