import React, { useEffect } from "react";
import { useState } from "react";
import services from "../../services/caja";
import { Loader } from "../../elements/Loader";
import { useHistory } from "react-router";

const ReporteriaCaja = () => {
  const [caja, setCaja] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();
  useEffect(() => {
    let source = services.Axios.CancelToken.source();
    let unmounted = false;
    const getCaja = async () => {
      try {
        const listCaja = await services.getCaja(source);
        if (!unmounted) {
          setCaja(listCaja);
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
    getCaja();
    return () => {
      unmounted = true;
      source.cancel("Cancelling in Cleanup");
    };
  }, []);
  const showCaja = (id) => {
    history.push(`/dashboard/reporteria/caja/${id}/view`);
  };
  return (
    <div>
      <h1>Reporteria Caja</h1>
      <table>
        <thead>
          <tr>
            <th>Fecha y Hora Apertura</th>
            <th>Apertura Caja</th>
            <th>Fecha y Hora Cierre</th>
            <th>Cierre Caja</th>
            <th>Estado Caja</th>
            <th>Vendedor</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <Loader loading={isLoading} />
          ) : caja ? (
            caja.map((item) => {
              return (
                <tr key={item.id}>
                  <td>{new Date(item.fecha).toLocaleString()}</td>
                  <td>${item.caja_inicio}</td>
                  <td>{new Date(item.fecha_cierre).toLocaleString()}</td>
                  <td>${item.caja_inicio}</td>
                  <td>{item.estado_caja}</td>
                  <td>{item.id_Usuario}</td>
                  <td>
                    <button onClick={() => showCaja(item.id)}>Visualizar</button>
                  </td>
                </tr>
              );
            })
          ) : null}
        </tbody>
      </table>
    </div>
  );
};

export default ReporteriaCaja;
