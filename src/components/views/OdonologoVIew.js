import React, { useState, useEffect } from "react";
import Topbar from "../layouts/topbar/Topbar";
import useValues from "../../provider/useValues";
import { Link, useHistory } from "react-router-dom";
import services from "../../services/odontologos";
import { Loader } from "../../elements/Loader";
import { Delete, Update, Add } from "@material-ui/icons";
import swal from "sweetalert";

const OdontologoView = () => {
  const { isCollapsed } = useValues();
  const [odontologos, setOdontologos] = useState([]);
  const [isListed, setIsListed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();
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
      const item = await services.bajaOdontologo(id);
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
    history.push(`/dashboard/odontologos/${id}/edit`);
  };
  useEffect(() => {
    let source = services.Axios.CancelToken.source();
    let unmounted = false;
    const getOdontologos = async () => {
      try {
        const list = await services.getOdontologos(source);
        if (!unmounted) {
          setOdontologos(list);
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
    getOdontologos();
    return () => {
      unmounted = true;
      source.cancel("Cancelling in Cleanup");
    };
  }, [isListed]);
  return (
    <>
      <Topbar />
      <div className={`wrapper ${isCollapsed ? "sidebar-collapsed" : ""}`}>
        <h3 className="titulo">Odontologos</h3>
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
                <b>Odontologos</b>
              </li>
            </ul>
          </nav>
        </div>
        <div className="crear-item">
          <Link to="/dashboard/odontologos/create" className="button__link">
            <button className="button crear">
              <span className="button__icon">
                <Add className="icon" />
              </span>
              <span className="button__text">Nuevo Odontologo</span>
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
                <th>Correo</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <Loader loading={isLoading} />
              ) : odontologos ? (
                odontologos.map((item, index) => {
                  return (
                    <tr key={item.id} className="rowData">
                      <td>{index + 1}</td>
                      <td>
                        {item.nombres} {item.apellidos}
                      </td>
                      <td>{item.cedula}</td>
                      <td>{item.telefono}</td>
                      <td>{item.direccion}</td>
                      <td>{item.email}</td>
                      <td className="botones">
                        <button
                          onClick={() => handleDelete(item.id_Odontologo)}
                          className="button borrar"
                        >
                          <Delete />
                        </button>
                        <button
                          onClick={() => handleUpdate(item.id_Odontologo)}
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

export default OdontologoView;
