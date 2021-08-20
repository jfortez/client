import React, { useState, useEffect } from "react";
import "./DashboardView.css";
import Topbar from "../layouts/topbar/Topbar";
import useValues from "../../provider/useValues";
import services from "../../services/personal";
import { Link, useHistory } from "react-router-dom";
import { Loader } from "../../elements/Loader";
import { Delete, Update, Add } from "@material-ui/icons";
const PersonalView = () => {
  const { isCollapsed } = useValues();
  const history = useHistory();
  const [personal, setPersonal] = useState([]);
  const [isListed, setIsListed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleDelete = async (id) => {
    setIsLoading(true);
    const bajaPersonal = await services.bajaPersonal(id);
    if (bajaPersonal) {
      setIsListed(!isListed);
    }
  };
  const handleUpdate = (id) => {
    history.push(`/dashboard/personal/${id}/edit`);
  };

  useEffect(() => {
    let source = services.Axios.CancelToken.source();
    let unmounted = false;
    const getPersonal = async () => {
      try {
        const list = await services.getPersonal(source);
        if (!unmounted) {
          setPersonal(list);
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
    getPersonal();
    return () => {
      unmounted = true;
      source.cancel("Cancelling in Cleanup");
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
                <b>Personal</b>
              </li>
            </ul>
          </nav>
        </div>
        <div className="crear-item">
          <Link to="/dashboard/personal/create" className="button__link">
            <button className="button crear">
              <span className="button__icon">
                <Add className="icon" />
              </span>
              <span className="button__text">Nuevo Personal</span>
            </button>
          </Link>
        </div>
        <div>
          <table className="paleBlueRows">
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
                    <tr key={person.id} className="rowData">
                      <td>
                        {person.nombres} {person.apellidos}
                      </td>
                      <td>{person.cedula}</td>
                      <td>{person.telefono}</td>
                      <td>{person.direccion}</td>
                      <td>{person.email}</td>
                      <td>{new Date(person.fecha_registro).toLocaleDateString()}</td>
                      <td className="botones">
                        <button
                          onClick={() => handleDelete(person.id_Personal)}
                          className="button borrar"
                        >
                          <Delete />
                        </button>
                        <button
                          onClick={() => handleUpdate(person.id_Personal)}
                          className="button actualizar"
                        >
                          <Update />
                        </button>
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
