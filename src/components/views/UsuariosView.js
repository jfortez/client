import React, { useState, useEffect } from "react";
import "./DashboardView.css";
import Topbar from "../layouts/topbar//Topbar";
import useValues from "../../provider/useValues";
import { Link } from "react-router-dom";
import services from "../../services/usuarios";
import { Loader } from "../../elements/Loader";

const UsuariosView = () => {
  const { isCollapsed, user } = useValues();
  const userLogged = user;
  const [usuarios, setUsuarios] = useState([]);
  const [isListed, setIsListed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const handleDelete = async (id) => {
    setIsLoading(true);
    const usersInUse = await services.getUsersInUse();
    let idValue = 0;
    const finInPersonal = usersInUse.personal;
    const findInOdontologo = usersInUse.odontologos;
    const valPer = finInPersonal.filter((ced) => ced.id_Usuario === id);
    const valOd = findInOdontologo.filter((ced) => ced.id_Usuario === id);
    if (valPer.length > 0) {
      idValue = valPer[0].id_Usuario;
      const deleteUser = await services.deletePerUsuario(idValue);
      if (deleteUser) {
        setIsListed(true);
      }
    }
    if (valOd.length > 0) {
      idValue = valOd[0].id_Usuario;
      const deleteUser = await services.deleteOdUsuario(idValue);
      if (deleteUser) {
        setIsListed(true);
      }
    }
  };
  const handleUpdate = () => {
    console.log("actualizar paciente");
  };
  useEffect(() => {
    let source = services.Axios.CancelToken.source();
    let unmounted = false;
    const getUsuarios = async () => {
      try {
        const list = await services.getUsuarios(source);
        if (!unmounted) {
          setUsuarios(list);
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
    getUsuarios();
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
                <th>ID</th>
                <th>Usuario</th>
                <th>Contraseña</th>
                <th>Previlegios</th>
                <th>Creado el</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <Loader loading={isLoading} />
              ) : usuarios ? (
                usuarios.map((user) => {
                  return (
                    <tr key={user.id}>
                      <td>{user.id}</td>
                      <td>{user.usuario}</td>
                      <td>{user.contraseña}</td>
                      <td>{user.previlegios}</td>
                      <td>{new Date(user.fecha_registro).toLocaleDateString()}</td>
                      <td>{user.active === 1 ? "Activo" : "Inactivo"}</td>
                      <td>
                        {userLogged.id === user.id ? null : (
                          <button onClick={() => handleDelete(user.id)}>Eliminar</button>
                        )}
                        {userLogged.id === user.id ? null : (
                          <button onClick={() => handleUpdate()}>Actualizar</button>
                        )}
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
