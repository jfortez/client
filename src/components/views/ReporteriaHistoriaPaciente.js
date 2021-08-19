import React, { useEffect } from "react";
import { useState } from "react";
import services from "../../services/agenda";
import { useHistory } from "react-router";
import { Loader } from "../../elements/Loader";

const ReporteriaHistoriaPaciente = () => {
  const [historial, sethistorial] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();

  useEffect(() => {
    let source = services.Axios.CancelToken.source();
    let unmounted = false;
    const getCaja = async () => {
      try {
        const listAgenda = await services.getAgenda(source);
        if (!unmounted) {
          sethistorial(listAgenda);
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
  const showDetalles = (id) => {
    history.push(`/dashboard/reporteria/historialpaciente/${id}/view`);
  };
  return (
    <div>
      <h1>Reporteria Historial Paciente</h1>
      <table>
        <thead>
          <tr>
            <th>Paciente</th>
            <th>Odontologo Encargado</th>
            <th>Servicio</th>
            <th>Estado</th>
            <th>Hora y Fecha Cita</th>
            <th>Vendedor</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <Loader loading={isLoading} />
          ) : historial ? (
            historial.map((item) => {
              return (
                <tr key={item.id}>
                  <td>
                    {item.nombres_paciente} {item.apellidos_paciente}
                  </td>
                  <td>
                    {item.nombres_odontologo} {item.apellidos_odontologo}
                  </td>
                  <td>{item.nombre_servicio}</td>
                  <td>{item.estado}</td>
                  <td>
                    {new Date(item.fechainicio_agenda).toLocaleDateString()} {item.hora_agenda}
                  </td>
                  <td>
                    <button onClick={() => showDetalles(item.id)}>Visualizar</button>
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

export default ReporteriaHistoriaPaciente;
