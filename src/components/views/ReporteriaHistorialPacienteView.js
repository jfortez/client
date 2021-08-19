import React, { useEffect, useState } from "react";
import "./DashboardView.css";
import Topbar from "../layouts/topbar/Topbar";
import useValues from "../../provider/useValues";
import { Link, useParams } from "react-router-dom";
import { Loader } from "../../elements/Loader";
import services from "../../services/cita";

const ReporteriaHistorialPacienteView = () => {
  const { isCollapsed } = useValues();
  const [cita, setCita] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  useEffect(() => {
    let source = services.Axios.CancelToken.source();
    let unmounted = false;
    const getHistorial = async () => {
      try {
        const listCaja = await services.getCitasByyId(source, id);
        if (!unmounted) {
          setCita(listCaja);
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
    getHistorial();
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
          <Link to="/dashboard/reporteria/historialpaciente">
            <li>Reportería</li>
          </Link>
        </ul>
        <h1>Reporteria Historial View</h1>
        <div></div>
        <table>
          <thead>
            <tr>
              <th>Sintomas</th>
              <th>Asistencia</th>
              <th>Observaciones</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <Loader loading={isLoading} />
            ) : cita ? (
              cita.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item.sintomas}</td>
                    <td>${item.asistencia}</td>
                    <td>${item.observaciones}</td>
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

export default ReporteriaHistorialPacienteView;
