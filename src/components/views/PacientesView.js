import React, { useState, useEffect } from "react";
import Topbar from "../layouts/topbar/Topbar";
import { Link, useHistory } from "react-router-dom";
import useValues from "../../provider/useValues";
import services from "../../services/paciente";
import { Loader } from "../../elements/Loader";
import { Delete, Update, Add } from "@material-ui/icons";
import swal from "sweetalert";

const PacientesView = () => {
  const { isCollapsed } = useValues();
  const history = useHistory();
  const [pacientes, setPacientes] = useState([]);
  const [isListed, setIsListed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const handleDelete = async (id) => {
    const mensaje = await swal({
      title: "¿Estás seguro de eliminar la Fila?",
      // text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: {
        cancel: "Cancelar",
        confirm: "Aceptar",
      },
      dangerMode: true,
    });
    if (mensaje) {
      setIsLoading(true);
      const item = await services.bajaPacientes(id);
      swal("Se ha eliminado la fila satisfatoriamente", {
        icon: "success",
      });
      if (item) {
        setIsListed(!isListed);
      }
    } else {
      return null;
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
        <h3 className="titulo">Pacientes</h3>
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
                <b>Pacientes</b>
              </li>
            </ul>
          </nav>
        </div>
        <div className="crear-item">
          <Link to="/dashboard/pacientes/create" className="button__link">
            <button className="button crear">
              <span className="button__icon">
                <Add className="icon" />
              </span>
              <span className="button__text">Nuevo Paciente</span>
            </button>
          </Link>
        </div>
        <div>
          <table className="paleBlueRows">
            <thead>
              <tr>
                <th>#</th>
                <th>Nombres Completos</th>
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
                pacientes.map((paciente, index) => (
                  <tr key={paciente.id} className="rowData">
                    <td>{index + 1}</td>
                    <td>
                      {paciente.nombres} {paciente.apellidos}
                    </td>
                    <td>{paciente.cedula}</td>
                    <td>{paciente.telefono}</td>
                    <td>{paciente.direccion}</td>
                    <td>{paciente.edad}</td>
                    <td>{paciente.genero}</td>
                    <td className="botones">
                      <button onClick={() => handleDelete(paciente.id)} className="button borrar">
                        <Delete />
                      </button>
                      <button
                        onClick={() => handleUpdate(paciente.id)}
                        className="button actualizar"
                      >
                        <Update />
                      </button>
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
