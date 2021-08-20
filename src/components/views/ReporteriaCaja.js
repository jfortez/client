import React, { useEffect } from "react";
import { useState } from "react";
import services from "../../services/caja";
import { Loader } from "../../elements/Loader";
import { useHistory } from "react-router";
import { Visibility } from "@material-ui/icons";

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
      <h3 className="titulo">Caja</h3>
      <table className="paleBlueRows">
        <thead>
          <tr>
            <th>#</th>
            <th>Fecha y Hora Apertura</th>
            <th>Apertura Caja</th>
            <th>Fecha y Hora Cierre</th>
            <th>Cierre Caja</th>
            <th>Estado Caja</th>
            <th>Vendedor</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <Loader loading={isLoading} />
          ) : caja ? (
            caja.map((item, index) => {
              return (
                <tr key={item.id} className="rowData">
                  <td>{index + 1}</td>
                  <td>{new Date(item.fecha).toLocaleString()}</td>
                  <td>${item.caja_inicio}</td>
                  <td>{new Date(item.fecha_cierre).toLocaleString()}</td>
                  <td>${item.caja_inicio}</td>
                  <td>{item.estado_caja}</td>
                  <td>{item.id_Usuario}</td>
                  <td className="botones">
                    <button onClick={() => showCaja(item.id)} className="button show">
                      <Visibility />
                    </button>
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
