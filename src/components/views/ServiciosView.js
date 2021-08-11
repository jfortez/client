import "./DashboardView.css";
import Topbar from "../layouts/topbar/Topbar";
import useValues from "../../provider/useValues";
import { Link, useHistory } from "react-router-dom";
import services from "../../services/servicios";
import { useEffect, useState } from "react";
import { Loader } from "../../elements/Loader";

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
  const handleAdd = () => {
    history.push("/dashboard/servicios/create");
  };
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
        <h1>Servicios</h1>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/dashboard">Home</Link>
              </li>
              <li>
                <b>Servicios</b>
              </li>
            </ul>
          </nav>
          <button onClick={handleAdd}>Añadir Servicio</button>
        </div>
        <div>
          <table>
            <thead>
              <tr>
                <th>Codigo Servicio</th>
                <th>Nombre Servicio</th>
                <th>Descripción del Servicio</th>
                <th>Precio</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <Loader loading={isLoading} />
              ) : (
                servicios.map((item) => {
                  return (
                    <tr key={item.id}>
                      <td>{item.cod_servicio}</td>
                      <td>{item.nombre}</td>
                      <td>{item.descripcion}</td>
                      <td>{item.precio}</td>
                      <td>
                        <button onClick={() => handleDelete(item.id)}>Eliminar</button>
                        <button onClick={() => handleUpdate(item.id)}>Actualizar</button>
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
