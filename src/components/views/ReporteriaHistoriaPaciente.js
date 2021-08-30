import React, { useEffect } from "react";
import { useState } from "react";
import services from "../../services/agenda";
import { useHistory } from "react-router";
import { Loader } from "../../elements/Loader";
import { FilterList, Visibility } from "@material-ui/icons";
import { Formulario } from "../../elements/Formularios";
import ComponentInput from "../layouts/forms/ComponentInput";

const ReporteriaHistoriaPaciente = () => {
  const [historial, sethistorial] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFilter, setIsFilter] = useState(false);
  const [filterPaciente, setFilterPaciente] = useState({ campo: "", valido: null });
  const [filterOdontologo, setFilterOdontologo] = useState({ campo: "", valido: null });
  const [filtroPaciente, setFiltroPaciente] = useState([]);
  const [filtroOdontologo, setFiltroOdontologo] = useState([]);
  const history = useHistory();

  useEffect(() => {
    let source = services.Axios.CancelToken.source();
    let unmounted = false;
    const getCaja = async () => {
      try {
        const listAgenda = await services.getAgenda(source);
        listAgenda.sort((obj1) => {
          if (obj1.estado === "FINALIZADO") {
            return -1;
          }
          return 0; //iguales
        });
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
  const switchFilter = () => {
    setIsFilter(!isFilter);
    setFilterPaciente({ campo: "", valido: null });
    setFilterOdontologo({ campo: "", valido: null });
  };
  useEffect(() => {
    const filtro_paciente = historial.filter((item) => {
      return (
        item.nombres_paciente
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .toLowerCase()
          .trim()
          .includes(filterPaciente.campo.toLowerCase().trim()) ||
        item.apellidos_paciente
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .toLowerCase()
          .trim()
          .includes(filterPaciente.campo.toLowerCase().trim()) ||
        item.cedula_paciente === setFilterPaciente.campo
      );
    });
    if (filtro_paciente.length > 0) {
      setFiltroPaciente(filtro_paciente);
    } else {
      setFiltroPaciente(historial);
    }
  }, [historial, filterPaciente.campo]);
  useEffect(() => {
    const filtro_odontologo = filtroPaciente.filter((item) => {
      return (
        item.nombres_paciente
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .toLowerCase()
          .trim()
          .includes(filterOdontologo.campo.toLowerCase().trim()) ||
        item.apellidos_paciente
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .toLowerCase()
          .trim()
          .includes(filterOdontologo.campo.toLowerCase().trim()) ||
        item.cedula_paciente === filterOdontologo.campo
      );
    });
    if (isFilter) {
      if (filtro_odontologo.length > 0) {
        setFiltroOdontologo(filtro_odontologo);
      } else {
        setFiltroOdontologo(filtroPaciente);
        if (filtro_odontologo.length === 0 && !filtroPaciente) {
          setFiltroOdontologo([]);
        }
      }
    } else {
      setFiltroOdontologo(filtroPaciente);
    }
  }, [filterOdontologo.campo, filtroPaciente, isFilter]);
  return (
    <div>
      {/* <h3 className="titulo">Historial Paciente</h3> */}
      <div className="crear-item">
        <button className="button crear" onClick={switchFilter}>
          <span className="button__icon">
            <FilterList className="icon" />
          </span>
          <span className="button__text">Filtrar</span>
        </button>
      </div>
      {isFilter ? (
        <div className="ingresar__productos filtro__busqueda">
          <Formulario>
            <ComponentInput
              state={filterPaciente} //value
              setState={setFilterPaciente} //onChange
              title="Paciente"
              type="text"
              name="paciente"
              placeholder="Paciente"
            />
            <ComponentInput
              state={filterOdontologo} //value
              setState={setFilterOdontologo} //onChange
              title="Odontólogo"
              type="text"
              name="odontologo"
              placeholder="Odontólogo"
            />
          </Formulario>
        </div>
      ) : null}
      <table className="paleBlueRows">
        <thead>
          <tr>
            <th>#</th>
            <th>Paciente</th>
            <th>Odontologo</th>
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
            filtroOdontologo.map((item, index) => {
              return (
                <tr key={item.id} className="rowData">
                  <td>{index + 1}</td>
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
                  <td className="botones">
                    {item.estado === "FINALIZADO" ? (
                      <button onClick={() => showDetalles(item.id)} className="button show">
                        <Visibility />
                      </button>
                    ) : null}
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
