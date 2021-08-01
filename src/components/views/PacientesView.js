import React, { useState, useEffect } from "react";
import Topbar from "../layouts/topbar/Topbar";
import { Link } from "react-router-dom";
import useValues from "../../provider/useValues";
import services from "../../services/paciente";
import { Loader } from "../../elements/Loader";

const PacientesView = () => {
  const { isCollapsed } = useValues();
  const [pacientes, setPacientes] = useState([]);
  const [isListed, setIsListed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const getPacientes = async () => {
    const pacientes = await services.getPacientes();
    setPacientes(pacientes);
    setIsLoading(false);
  };
  const handleDelete = async (id) => {
    const item = await services.deletePacientes(id);
    if (item) {
      setIsListed(true);
    }
  };
  const handleUpdate = () => {
    console.log("actualizar paciente");
  };
  useEffect(() => {
    getPacientes();
    setIsListed(false);
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
                      <button onClick={() => handleUpdate()}>Actualizar</button>
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
