import React, { useState, useEffect } from "react";
import "./DashboardView.css";
import Topbar from "../layouts/topbar//Topbar";
import useValues from "../../provider/useValues";
import { Link, useHistory } from "react-router-dom";
import services from "../../services/usuarios";
import { Loader } from "../../elements/Loader";
import { Cancel, CheckCircle, Update, Add } from "@material-ui/icons";
import swal from "sweetalert";

const UsuariosView = () => {
  const { isCollapsed, user } = useValues();
  const userLogged = user;
  const [usuarios, setUsuarios] = useState([]);
  const [isListed, setIsListed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();
  const handeActive = async (id) => {
    setIsLoading(true);
    const deleteUser = await services.activarUsuario(id);
    swal("Se ha Activó el Usuario satisfatoriamente", {
      icon: "success",
    });
    if (deleteUser) {
      setIsListed(!isListed);
    }
  };
  const handleDelete = async (id) => {
    const mensaje = await swal({
      title: "Confirmar Desactivar Usuario",
      // text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: {
        cancel: "Cancelar",
        confirm: "Confirmar",
      },
      dangerMode: true,
    });
    if (mensaje) {
      setIsLoading(true);
      const deleteUser = await services.bajaUsuarios(id);
      swal("Se ha Inactivó el Usuario satisfatoriamente", {
        icon: "success",
      });
      if (deleteUser) {
        setIsListed(!isListed);
      }
    } else {
      return null;
    }

    // const usersInUse = await services.getUsersInUse();
    // let idValue = 0;
    // const finInPersonal = usersInUse.personal;
    // const findInOdontologo = usersInUse.odontologos;
    // const valPer = finInPersonal.filter((ced) => ced.id_Usuario === id);
    // const valOd = findInOdontologo.filter((ced) => ced.id_Usuario === id);
    // if (valPer.length > 0) {
    //   idValue = valPer[0].id_Usuario;
    //   const deleteUser = await services.deletePerUsuario(idValue);
    //   if (deleteUser) {
    //     setIsListed(!isListed);
    //   }
    // }
    // if (valOd.length > 0) {
    //   idValue = valOd[0].id_Usuario;
    //   const deleteUser = await services.deleteOdUsuario(idValue);
    //   if (deleteUser) {
    //     setIsListed(!isListed);
    //   }
    // }
  };
  const handleUpdate = (id) => {
    history.push(`/dashboard/usuarios/${id}/edit`);
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
    return () => {
      unmounted = true;
      source.cancel("Cancelling in Cleanup");
    };
  }, [isListed]);
  return (
    <>
      <Topbar />
      <div className={`wrapper ${isCollapsed ? "sidebar-collapsed" : ""}`}>
        <h3 className="titulo">Usuarios </h3>
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
                <b>Usuarios</b>
              </li>
            </ul>
          </nav>
        </div>
        <div className="crear-item">
          <Link to="/dashboard/usuarios/create" className="button__link">
            <button className="button crear">
              <span className="button__icon">
                <Add className="icon" />
              </span>
              <span className="button__text">Nuevo Usuario</span>
            </button>
          </Link>
        </div>
        <div>
          <table className="paleBlueRows">
            <thead>
              <tr>
                <th>#</th>
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
                usuarios.map((user, index) => {
                  return (
                    <tr key={user.id} className="rowData">
                      <td>{index + 1}</td>
                      <td>{user.usuario}</td>
                      <td>{user.contraseña}</td>
                      <td>{user.previlegios === "1" ? "Administrador" : "Odontologo"}</td>
                      <td>{new Date(user.fecha_registro).toLocaleDateString()}</td>
                      <td>{user.active === 1 ? "Activo" : "Inactivo"}</td>
                      <td className="botones">
                        {userLogged.id === user.id ? null : user.active === 1 ? (
                          <div>
                            <button onClick={() => handleDelete(user.id)} className="button borrar">
                              <Cancel />
                            </button>
                            <button
                              onClick={() => handleUpdate(user.id)}
                              className="button actualizar"
                            >
                              <Update />
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => handeActive(user.id)}
                            className="button activeuser"
                          >
                            <CheckCircle />
                          </button>
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
