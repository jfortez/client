import React, { useEffect, useState } from "react";
import "./DashboardView.css";
import Topbar from "../layouts/topbar/Topbar";
import useValues from "../../provider/useValues";
import { Link, useParams } from "react-router-dom";
import { Loader } from "../../elements/Loader";
import services from "../../services/cita";
import recetaServices from "../../services/receta";

const ReporteriaHistorialPacienteView = () => {
  const { isCollapsed } = useValues();
  const [cita, setCita] = useState([]);
  const [receta, setReceta] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  useEffect(() => {
    let source = services.Axios.CancelToken.source();
    let unmounted = false;
    const getHistorial = async () => {
      try {
        const listCaja = await services.getCitasByyId(source, id);
        const listReceta = await recetaServices.listRecetaById(source, id);
        if (!unmounted) {
          setCita(listCaja);
          setReceta(listReceta);
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
  const individualData = [cita[0]];
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
        <div className="container">
          <div className="item-1 vista__1 reporteventa ">
            <span>Información Paciente</span>
            {cita.length > 0 ? (
              <table className="paleBlueRows venta">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Cedula</th>
                    <th>Nombres y Apellidos</th>
                    <th>Telefono</th>
                    <th>Dirección</th>
                  </tr>
                </thead>
                <tbody>
                  {cita.length > 0
                    ? individualData.map((item, index) => {
                        return (
                          <tr key={index} className="rowData">
                            <td>{index + 1}</td>
                            <td>{item.cedula_paciente}</td>
                            <td>
                              {item.nombre_paciente} {item.apellido_paciente}
                            </td>
                            <td>{item.telefono_paciente}</td>
                            <td>{item.direccion_paciente}</td>
                          </tr>
                        );
                      })
                    : null}
                </tbody>
              </table>
            ) : (
              <h1 className="title__info">Ingrese un Numero de Cedula para visualizar</h1>
            )}
          </div>
          <div className="item-2 vista__2 reporteventa ">
            <span>Odontólogo Encargado</span>
            {cita.length > 0 ? (
              <table className="paleBlueRows venta">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Cedula</th>
                    <th>Nombres y Apellidos</th>
                    <th>Telefono</th>
                    <th>Dirección</th>
                    <th>Email</th>
                  </tr>
                </thead>
                <tbody>
                  {cita.length > 0
                    ? individualData.map((item, index) => {
                        return (
                          <tr key={index} className="rowData">
                            <td>{index + 1}</td>
                            <td>{item.cedula_odontologo}</td>
                            <td>
                              {item.nombre_odontologo} {item.apellido_odontologo}
                            </td>
                            <td>{item.telefono_odontologo}</td>
                            <td>{item.direccion_odontologo}</td>
                            <td>{item.email_odontologo}</td>
                          </tr>
                        );
                      })
                    : null}
                </tbody>
              </table>
            ) : (
              <h1 className="title__info">Ingrese un Numero de Cedula para visualizar</h1>
            )}
          </div>
        </div>
        <div className="container">
          <div className="item-1 vista__1 reporteventa citainfo ">
            <span>Información de la Cita</span>
            {cita.length > 0 ? (
              <table className="paleBlueRows">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Motivo</th>
                    <th>Asistencia</th>
                    <th>Servicio</th>
                    <th>Descripción del Servicio</th>
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
                          <td>{item.asistencia}</td>
                          <td>{item.nombre}</td>
                          <td>{item.descripcion}</td>
                          <td>{item.observaciones}</td>
                        </tr>
                      );
                    })
                  ) : null}
                </tbody>
              </table>
            ) : null}
          </div>
          <div className="item-2 vista__2 reporteventa recetainfo ">
            <span>Productos Recetados</span>
            {receta.length > 0 ? (
              <table className="paleBlueRows venta">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Producto o Medicina</th>
                    <th>Descripción</th>
                  </tr>
                </thead>
                <tbody>
                  {receta.length > 0
                    ? receta.map((item, index) => {
                        return (
                          <tr key={index} className="rowData">
                            <td>{index + 1}</td>
                            <td>{item.nombre}</td>
                            <td>{item.descripcion}</td>
                          </tr>
                        );
                      })
                    : null}
                </tbody>
              </table>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default ReporteriaHistorialPacienteView;
