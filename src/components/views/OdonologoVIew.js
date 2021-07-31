import React, { useState, useEffect } from "react";
import Topbar from "../layouts/topbar/Topbar";
import useValues from "../../provider/useValues";
import { Link } from "react-router-dom";
import services from "../../services/odontologos";
const OdontologoView = () => {
  const { isCollapsed } = useValues();
  const [odontologos, setOdontologos] = useState([]);
  const [isListed, setIsListed] = useState(false);
  const getOdontologos = async () => {
    const list = await services.getOdontologos();
    setOdontologos(list);
  };
  const handleDelete = async (id) => {
    const item = await services.deleteOdontologo(id);
    if (item) {
      setIsListed(true);
    }
  };
  const handleUpdate = () => {
    console.log("actualizar paciente");
  };
  useEffect(() => {
    getOdontologos();
    setIsListed(false);
  }, [isListed]);
  return (
    <>
      <Topbar />
      <div className={`wrapper ${isCollapsed ? "sidebar-collapsed" : ""}`}>
        <h1>Odontologos</h1>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/dashboard">Home</Link>
              </li>
              <li>
                <b>Odontologos</b>
              </li>
            </ul>
          </nav>
        </div>
        <div>
          <Link to="/dashboard/odontologos/create">
            <button>Nuevo Odontologo</button>
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
              {odontologos
                ? odontologos.map((item) => {
                    return (
                      <tr key={item.id}>
                        <td>
                          {item.nombres} {item.apellidos}
                        </td>
                        <td>{item.cedula}</td>
                        <td>{item.telefono}</td>
                        <td>{item.direccion}</td>
                        <td>{item.email}</td>
                        <td>{new Date(item.fecha_registro).toLocaleDateString()}</td>
                        <td>
                          <button onClick={() => handleDelete(item.id)}>Eliminar</button>
                          <button onClick={() => handleUpdate()}>Actualizar</button>
                        </td>
                      </tr>
                    );
                  })
                : null}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default OdontologoView;