import React, { useState, useEffect } from "react";
import "./DashboardView.css";
import Topbar from "../layouts/topbar/Topbar";
import useValues from "../../provider/useValues";
import services from "../../services/personal";
import { Link } from "react-router-dom";
import { Loader } from "../../elements/Loader";

const PersonalView = () => {
  const { isCollapsed } = useValues();
  const [personal, setPersonal] = useState([]);
  const [isListed, setIsListed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const getPersonal = async () => {
    const list = await services.getPersonal();
    setPersonal(list);
    setIsLoading(false);
  };
  const handleDelete = async (id) => {
    const deletedPersonal = await services.deletePersonal(id);
    if (deletedPersonal) {
      setIsListed(true);
    }
  };
  const handleUpdate = () => {
    console.log("actualizar paciente");
  };
  useEffect(() => {
    getPersonal();
    setIsListed(false);
  }, [isListed]);
  return (
    <>
      <Topbar />
      <div className={`wrapper ${isCollapsed ? "sidebar-collapsed" : ""}`}>
        <h1>Personal </h1>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/dashboard">Home</Link>
              </li>
              <li>
                <b>Personal</b>
              </li>
            </ul>
          </nav>
        </div>
        <div>
          <Link to="/dashboard/personal/create">
            <button>Nuevo Personal</button>
          </Link>
        </div>
        <div>
          <table>
            <thead>
              <tr>
                <th>Nombres Completos</th>
                <th>Cedula</th>
                <th>Telefono</th>
                <th>Dirección</th>
                <th>Correo</th>
                <th>Creado el</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <Loader loading={isLoading} />
              ) : personal ? (
                personal.map((person) => {
                  return (
                    <tr key={person.id}>
                      <td>
                        {person.nombres} {person.apellidos}
                      </td>
                      <td>{person.cedula}</td>
                      <td>{person.telefono}</td>
                      <td>{person.direccion}</td>
                      <td>{person.email}</td>
                      <td>{new Date(person.fecha_registro).toLocaleDateString()}</td>
                      <td>
                        <button onClick={() => handleDelete(person.id)}>Eliminar</button>
                        <button onClick={() => handleUpdate()}>Actualizar</button>
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

export default PersonalView;
