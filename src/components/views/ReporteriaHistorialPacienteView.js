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
        <h3 className="titulo">Reportería</h3>
        <div className="navegacion">
          <nav>
            <ul>
              <li>
                <Link to="/dashboard" className="navegacion__redirect">
                  Inicio
                </Link>
              </li>
              <li> / </li>
              <li>
                <Link to="/dashboard/reporteria/historialpaciente" className="navegacion__redirect">
                  Reporte de Historial Paciente
                </Link>
              </li>
              <li> / </li>
              <li>
                <b>Historial Paciente</b>
              </li>
            </ul>
          </nav>
        </div>
        <h1>Reporteria Historial Medico</h1>
        <div></div>
        <table className="paleBlueRows">
          <thead>
            <tr>
              <th>#</th>
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
                  <tr key={index} className="rowData">
                    <td>{index + 1}</td>
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
