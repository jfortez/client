import React, { useEffect, useState } from "react";
import Topbar from "../layouts/topbar/Topbar";
import useValues from "../../provider/useValues";
import { Link, useHistory } from "react-router-dom";
import agendaServices from "../../services/agenda";
import { Loader } from "../../elements/Loader";
import { EventBusy, Pageview, EventAvailable, Visibility } from "@material-ui/icons";

const CitasView = () => {
  const { isCollapsed, user } = useValues();
  const [agenda, setAgenda] = useState([]);
  const [isListed, setIsListed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();
  useEffect(() => {
    let source = agendaServices.Axios.CancelToken.source();
    let unmounted = false;
    const getAgenda = async () => {
      try {
        const agenda = await agendaServices.getAgenda(source);
        const agendabyOdontologo = await agendaServices.getAgendaByResponsable(
          source,
          user.id_persona
        );
        if (!unmounted) {
          if (user.role === "1" || user.role === 1) {
            setAgenda(agenda);
          } else {
            setAgenda(agendabyOdontologo);
          }
          setIsLoading(false);
        }
      } catch (error) {
        if (!unmounted) {
          if (agendaServices.Axios.isCancel(error)) {
            console.log("AxiosCancel: caught cancel", error.message);
          } else {
            console.log("throw error", error.message);
          }
        }
      }
    };
    getAgenda();
    setIsListed(false);
    return () => {
      unmounted = true;
      source.cancel("Cancelling in Cleanup");
    };
  }, [isListed, user.id_persona, user.role]);
  const handleAtender = (id) => {
    history.push(`/dashboard/cita/seguimiento/${id}`);
  };
  const handleAnular = async (id) => {
    const estado = {
      estadoAgenda: "ANULADO",
      colaAgenda: "ANULADO",
    };
    await agendaServices.estadoAgenda(estado, id);
    setIsListed(true);
  };
  const showDetalles = (id) => {
    history.push(`/dashboard/reporteria/historialpaciente/${id}/view`);
  };
  return (
    <>
      <Topbar />
      <div className={`wrapper ${isCollapsed ? "sidebar-collapsed" : ""}`}>
        <h3 className="titulo">Citas</h3>
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
                <b>Citas</b>
              </li>
            </ul>
          </nav>
        </div>
        <div className="crear-item">
          <Link to="/dashboard/agenda" className="button__link">
            <button className="button crear">
              <span className="button__icon">
                <EventAvailable className="icon" />
              </span>
              <span className="button__text">Agendar Cita</span>
            </button>
          </Link>
        </div>
        <div>
          <table className="paleBlueRows">
            <thead>
              <tr>
                <th>#</th>
                <th>Descripcion</th>
                <th>Paciente</th>
                <th>Odontologo Responsable</th>
                <th>Servicio</th>
                <th>Fecha Cita</th>
                <th>Hora Cita</th>
                <th>Estado</th>
                <th>Creado el</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <Loader loading={isLoading} />
              ) : (
                agenda.map((item, index) => {
                  return (
                    <tr key={item.id} className="rowData">
                      <td>{index + 1}</td>
                      <td>{item.descripcion}</td>
                      <td>
                        {item.nombres_paciente} {item.apellidos_paciente}
                      </td>
                      <td>
                        {item.nombres_odontologo} {item.apellidos_odontologo}
                      </td>
                      <td>{item.nombre_servicio}</td>
                      <td>{new Date(item.fechainicio_agenda).toLocaleDateString()}</td>
                      <td>{item.hora_agenda}</td>
                      <td>{item.estado}</td>
                      <td>{new Date(item.fecha_registro).toLocaleDateString()}</td>
                      <td className="botones">
                        {item.estado === "PENDIENTE" ? (
                          <div>
                            <button
                              onClick={() => handleAtender(item.id)}
                              className="button actualizar"
                            >
                              <Pageview />
                            </button>
                            <button onClick={() => handleAnular(item.id)} className="button borrar">
                              <EventBusy />
                            </button>
                          </div>
                        ) : item.estado === "FINALIZADO" ? (
                          <button className="button show" onClick={() => showDetalles(item.id)}>
                            <Visibility />
                          </button>
                        ) : null}
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

export default CitasView;
