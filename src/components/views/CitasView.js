import React, { useEffect, useState } from "react";
import Topbar from "../layouts/topbar/Topbar";
import useValues from "../../provider/useValues";
import { Link, useHistory } from "react-router-dom";
import agendaServices from "../../services/agenda";
import { Loader } from "../../elements/Loader";

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
  return (
    <>
      <Topbar />
      <div className={`wrapper ${isCollapsed ? "sidebar-collapsed" : ""}`}>
        <h1>Página Citas</h1>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/dashboard">Home</Link>
              </li>
              <li>
                <b>Citas</b>
              </li>
            </ul>
          </nav>
        </div>
        <div>
          <table>
            <thead>
              <tr>
                <th>Descripcion</th>
                <th>Paciente</th>
                <th>Odontologo Responsable</th>
                <th>Servicio</th>
                <th>Fecha Cita</th>
                <th>Hora Cita</th>
                <th>Estado</th>
                <th>Creado el</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <Loader loading={isLoading} />
              ) : (
                agenda.map((item) => {
                  return (
                    <tr key={item.id}>
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
                      <td>
                        {item.estado === "PENDIENTE" ? (
                          <div>
                            <button onClick={() => handleAtender(item.id)}>Atender</button>
                            <button onClick={() => handleAnular(item.id)}>Anular</button>
                          </div>
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
