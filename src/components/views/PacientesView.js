import React, { useState, useEffect } from "react";
import Topbar from "../layouts/topbar/Topbar";
import { Link, useHistory } from "react-router-dom";
import useValues from "../../provider/useValues";
import services from "../../services/paciente";
import { Loader } from "../../elements/Loader";

const PacientesView = () => {
  const { isCollapsed } = useValues();
  const history = useHistory();
  const [pacientes, setPacientes] = useState([]);
  const [isListed, setIsListed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const handleDelete = async (id) => {
    setIsLoading(true);
    const item = await services.bajaPacientes(id);
    if (item) {
      setIsListed(!isListed);
    }
  };
  const handleUpdate = (id) => {
    history.push(`/dashboard/pacientes/${id}/edit`);
  };
  useEffect(() => {
    let source = services.Axios.CancelToken.source();
    let unmounted = false;
    const getPacientes = async () => {
      try {
        const pacientes = await services.getPacientes(source);

        if (!unmounted) {
          setPacientes(pacientes);
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
    getPacientes();
    return () => {
      unmounted = true;
      source.cancel("Cancelling in Cleanup");
    };
  }, [isListed]);
  return (
    <>
      <Topbar />
      <div className={`wrapper ${isCollapsed ? "sidebar-collapsed" : ""}`}>
        <h1>Pacientes</h1>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/dashboard">Home</Link>
              </li>
              <li>
                <b>Pacientes</b>
              </li>
            </ul>
          </nav>
        </div>
        <div>
          <Link to="/dashboard/pacientes/create">
            <button>Nuevo Paciente</button>
          </Link>
        </div>
        <div>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombres</th>
                <th>Apellidos</th>
                <th>Cedula</th>
                <th>Telefono</th>
                <th>Dirección</th>
                <th>Edad</th>
                <th>Genero</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <Loader loading={isLoading} />
              ) : pacientes ? (
                pacientes.map((paciente) => (
                  <tr key={paciente.id}>
                    <td>{paciente.id}</td>
                    <td>{paciente.nombres}</td>
                    <td>{paciente.apellidos}</td>
                    <td>{paciente.cedula}</td>
                    <td>{paciente.telefono}</td>
                    <td>{paciente.direccion}</td>
                    <td>{paciente.edad}</td>
                    <td>{paciente.genero}</td>
                    <td>
                      <button onClick={() => handleDelete(paciente.id)}>Eliminar</button>
                      <button onClick={() => handleUpdate(paciente.id)}>Actualizar</button>
                    </td>
                  </tr>
                ))
              ) : null}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default PacientesView;
