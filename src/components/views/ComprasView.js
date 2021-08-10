import React, { useEffect, useState } from "react";
import Topbar from "../layouts/topbar/Topbar";
import useValues from "../../provider/useValues";
import { useHistory, Link } from "react-router-dom";
import services from "../../services/compras";
import { Loader } from "../../elements/Loader";

const ComprasView = () => {
  const { isCollapsed } = useValues();
  const [compras, setCompras] = useState([]);
  const [isListed, setIsListed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();
  const nuevoItem = () => {
    history.push("/dashboard/compras/create");
  };
  useEffect(() => {
    let source = services.Axios.CancelToken.source();
    let unmounted = false;
    const getItems = async () => {
      try {
        const items = await services.getCompras(source);

        if (!unmounted) {
          setCompras(items);
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
    getItems();
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
        <h1>Compras</h1>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/dashboard">Home</Link>
              </li>
              <li>
                <b>Compras</b>
              </li>
            </ul>
          </nav>
        </div>
        <div>
          <button onClick={nuevoItem}>Nueva Compras</button>
        </div>
        <div>
          <table>
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Proveedor</th>
                <th>Cantidad</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <Loader loading={isLoading} />
              ) : compras ? (
                compras.map((item) => {
                  return (
                    <tr key={item.id}>
                      <td>{item.fecha}</td>
                      <td>{item.id_proveedor}</td>
                      <td>{item.cantidad}</td>
                      <td>{item.total}</td>
                      {/* <td>{new Date(item.fecha_registro).toLocaleDateString()}</td> */}
                      <td>
                        <button>Eliminar</button>
                        <button>Actualizar</button>
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

export default ComprasView;
