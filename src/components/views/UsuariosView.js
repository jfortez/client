import React, { useState, useEffect } from "react";
import "./DashboardView.css";
import Topbar from "../layouts/topbar//Topbar";
import useValues from "../../provider/useValues";
import { Link } from "react-router-dom";
import services from "../../services/usuarios";
import { Loader } from "../../elements/Loader";

const UsuariosView = () => {
  const { isCollapsed } = useValues();
  const [usuarios, setUsuarios] = useState([]);
  const [isListed, setIsListed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const getUsuarios = async () => {
    const list = await services.getUsuarios();
    setUsuarios(list);
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
    getUsuarios();
    setIsListed(false);
  }, [isListed]);
  return (
    <>
      <Topbar />
      <div className={`wrapper ${isCollapsed ? "sidebar-collapsed" : ""}`}>
        <h1>Usuarios</h1>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/dashboard">Home</Link>
              </li>
              <li>
                <b>Usuario</b>
              </li>
            </ul>
          </nav>
        </div>
        <div>
          <Link to="/dashboard/usuarios/create">
            <button>Nuevo Usuario</button>
          </Link>
        </div>
        <div>
          <table>
            <thead>
              <tr>
                <th>Usuario</th>
                <th>Contraseña</th>
                <th>Previlegios</th>
                <th>Creado el</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <Loader loading={isLoading} />
              ) : usuarios ? (
                usuarios.map((user) => {
                  return (
                    <tr key={user.id}>
                      <td>{user.usuario}</td>
                      <td>{user.contraseña}</td>
                      <td>{user.previlegios}</td>
                      <td>{new Date(user.fecha_registro).toLocaleDateString()}</td>
                      <td>{user.active === 1 ? "Activo" : "Inactivo"}</td>
                      <td>
                        <button onClick={() => handleDelete(user.id)}>Eliminar</button>
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

export default UsuariosView;
