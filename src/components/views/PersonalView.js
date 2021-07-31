import React, { useState, useEffect } from "react";
import "./DashboardView.css";
import Topbar from "../layouts/topbar/Topbar";
import useValues from "../../provider/useValues";
import services from "../../services/personal";
import { Link } from "react-router-dom";
const PersonalView = (props) => {
  const { isCollapsed } = useValues();
  const [personal, setPersonal] = useState([]);
  const [isListed, setIsListed] = useState(false);
  const getPersonal = async () => {
    const list = await services.getPersonal();
    setPersonal(list);
  };
  useEffect(() => {
    getPersonal();
    setIsListed(false);
    return () => {
      setPersonal(null);
    };
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
                <Link to="/dashboard/personal">Personal</Link>
              </li>
            </ul>
          </nav>
        </div>
        <div>
          <Link to="/dashboard/personal/create">
            <button>Añadir Personal</button>
          </Link>
        </div>
        <table>
          <thead>
            <tr>
              <th>Nombres Completos</th>
              <th>Cedula</th>
              <th>Telefono</th>
              <th>Dirección</th>
              <th>Correo</th>
              <th>Creado el</th>
            </tr>
          </thead>
          <tbody>
            {personal
              ? personal.map((person) => {
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
                    </tr>
                  );
                })
              : null}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default PersonalView;
