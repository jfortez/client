import "./DashboardView.css";
import Topbar from "../layouts/topbar/Topbar";
import useValues from "../../provider/useValues";
import { Link, useHistory } from "react-router-dom";
import services from "../../services/servicios";
import { useEffect, useState } from "react";
import { Loader } from "../../elements/Loader";
import { Delete, Update, Add } from "@material-ui/icons";

const ServiciosView = () => {
  const { isCollapsed } = useValues();
  const [servicios, setServicios] = useState([]);
  const [isListed, setIsListed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const handleDelete = async (id) => {
    setIsLoading(true);
    const servicio = await services.bajaServicios(id);
    if (servicio) {
      setIsListed(true);
    }
  };
  const history = useHistory();
  const handleUpdate = (id) => {
    history.push(`/dashboard/servicios/${id}/edit`);
  };
  useEffect(() => {
    let source = services.Axios.CancelToken.source();
    let unmounted = false;
    const getServicios = async () => {
      try {
        const servicios = await services.getServicios(source);
        if (!unmounted) {
          setServicios(servicios);
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
    getServicios();
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
        <h3 className="titulo">Servicios</h3>
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
                <b>Servicios</b>
              </li>
            </ul>
          </nav>
        </div>
        <div className="crear-item">
          <Link to="/dashboard/servicios/create" className="button__link">
            <button className="button crear">
              <span className="button__icon">
                <Add className="icon" />
              </span>
              <span className="button__text">Nuevo Servicio</span>
            </button>
          </Link>
        </div>
        <div>
          <table className="paleBlueRows">
            <thead>
              <tr>
                <th>#</th>
                <th>Codigo Servicio</th>
                <th>Nombre Servicio</th>
                <th>Descripción del Servicio</th>
                <th>Precio</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <Loader loading={isLoading} />
              ) : (
                servicios.map((item, index) => {
                  return (
                    <tr key={item.id} className="rowData">
                      <td>{index + 1}</td>
                      <td>{item.cod_servicio}</td>
                      <td>{item.nombre}</td>
                      <td>{item.descripcion}</td>
                      <td>{item.precio}</td>
                      <td className="botones">
                        <button onClick={() => handleDelete(item.id)} className="button borrar">
                          <Delete />
                        </button>
                        <button onClick={() => handleUpdate(item.id)} className="button actualizar">
                          <Update />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ServiciosView;
