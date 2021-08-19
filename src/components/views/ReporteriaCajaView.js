import React, { useEffect, useState } from "react";
import "./DashboardView.css";
import Topbar from "../layouts/topbar/Topbar";
import useValues from "../../provider/useValues";
import { Link, useParams } from "react-router-dom";
import { Loader } from "../../elements/Loader";
import services from "../../services/caja";

const ReporteriaCajaView = () => {
  const { isCollapsed } = useValues();
  const [movimientosCaja, setMovimientosCaja] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { id } = useParams();
  useEffect(() => {
    let source = services.Axios.CancelToken.source();
    let unmounted = false;
    const getMovimientosCaja = async () => {
      try {
        const listCaja = await services.getCajaMovimientosByIdCaja(source, id);
        if (!unmounted) {
          setMovimientosCaja(listCaja);
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
    getMovimientosCaja();
    return () => {
      unmounted = true;
      source.cancel("Cancelling in Cleanup");
    };
  }, [id]);
  return (
    <>
      <Topbar />
      <div className={`wrapper ${isCollapsed ? "sidebar-collapsed" : ""}`}>
        <ul>
          <Link to="/dashboard/reporteria/caja">
            <li>Reportería</li>
          </Link>
        </ul>
        <h1>Reporteria Caja View</h1>
        <table>
          <thead>
            <tr>
              <th>Fecha y Hora del movimiento</th>
              <th>Tipo</th>
              <th>Valor</th>
              <th>Descripción</th>
              <th>Valor Total</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <Loader loading={isLoading} />
            ) : movimientosCaja ? (
              movimientosCaja.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{new Date(item.fechaMovimiento).toLocaleString()}</td>
                    <td>{item.ingreso ? <b>ingreso</b> : <b>Egreso</b>}</td>
                    <td>
                      {item.ingreso ? <span>${item.ingreso}</span> : <span>${item.egreso}</span>}
                    </td>
                    <td>{item.descripcion}</td>
                    <td>${item.caja_actual}</td>
                  </tr>
                );
              })
            ) : null}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ReporteriaCajaView;
