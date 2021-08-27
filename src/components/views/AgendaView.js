import "./DashboardView.css";
import Topbar from "../layouts/topbar/Topbar";
import useValues from "../../provider/useValues";
import pacienteServices from "../../services/paciente";
import odontologoServices from "../../services/odontologos";
import serviciosServices from "../../services/servicios";
import services from "../../services/agenda";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import notificacion from "../../utils/Notificaciones";
import { ClearAll, EventAvailable, Search } from "@material-ui/icons";
import { Formulario } from "../../elements/Formularios";
import ComponentInput from "../layouts/forms/ComponentInput";
import expresiones from "../../utils/Expresiones";
import notificaciones from "../../utils/Notificaciones";
const AgendaView = () => {
  const { isCollapsed, setId_agenda, id_agenda } = useValues();
  const history = useHistory();
  const [descripcion, setDescripcion] = useState({ campo: "", valido: null });
  const [fecha_inicio, setFecha_inicio] = useState({ campo: "", valido: null });
  const [hora, sethora] = useState({ campo: "", valido: null });
  const [entradas, setEntradas] = useState({
    paciente: "",
    odontologo: "",
    servicio: "",
  });
  const [paciente, setPaciente] = useState([]);
  const [odontologo, setOdontologo] = useState([]);
  const [servicio, setServicio] = useState([]);
  const onSubmitPaciente = async (e) => {
    e.preventDefault();
    if (entradas.paciente === "") {
      return notificacion("Campo Vacio", "Debe Ingresar Numero de Cedula del Paciente", "warning");
    }
    const pacienteConsulta = await pacienteServices.listPacientesByCed({
      cedula: entradas.paciente,
    });
    if (!pacienteConsulta.message) {
      setPaciente(pacienteConsulta);
    } else {
      return notificacion("Error", "Paciente no Existe", "danger");
    }
  };
  const onSubmitOdontologo = async (e) => {
    e.preventDefault();
    if (entradas.odontologo === "") {
      return notificacion(
        "Campo Vacio",
        "Debe Ingresar Numero de Cedula del Odontólogo",
        "warning"
      );
    }
    const odontologoConsulta = await odontologoServices.listOdontologoByCed({
      cedula: entradas.odontologo,
    });
    if (!odontologoConsulta.message) {
      setOdontologo(odontologoConsulta);
    } else {
      return notificacion("Error", "Odontólogo no Existe", "danger");
    }
  };
  const onSubmitServicio = async (e) => {
    e.preventDefault();
    if (entradas.servicio === "") {
      return notificacion("Campo Vacio", "Debe Ingresar un Código del Servicio", "warning");
    }
    const serviciosConsulta = await serviciosServices.getServiciosByCod({
      cod_servicio: entradas.servicio,
    });
    if (!serviciosConsulta.message) {
      setServicio(serviciosConsulta);
    } else {
      return notificacion("Error", "Servicio no Existe", "danger");
    }
  };
  const handleClean = () => {
    setEntradas({
      paciente: "",
      odontologo: "",
      servicio: "",
    });
    setDescripcion({ campo: "", valido: null });
    sethora({ campo: "", valido: null });
    setFecha_inicio({ campo: "", valido: null });
    setPaciente([]);
    setOdontologo([]);
    setServicio([]);
  };
  const handleSubmit = async () => {
    if (!paciente.length > 0) {
      return notificacion("Agenda", "Debe Ingresar un paciente", "warning");
    }
    if (!odontologo.length > 0) {
      return notificacion("Agenda", "Debe Ingresar un Odontologo", "warning");
    }
    if (!servicio.length > 0) {
      return notificacion("Agenda", "Debe Ingresar un Servicio", "warning");
    }
    if (descripcion.campo === "" || fecha_inicio.campo === "" || hora.campo === "") {
      return notificacion("Agenda", "Debe rellenar los campos para proceder a crear", "warning");
    }
    const nuevo = {
      descripcion: descripcion.campo,
      fechainicio_agenda: fecha_inicio.campo,
      hora_agenda: hora.campo,
      estado: "PENDIENTE",
      id_Odontologo: odontologo[0].id,
      id_Paciente: paciente[0].id,
      id_Servicio: servicio[0].id,
    };
    const nuevaAgenda = await services.createAgenda(nuevo);
    if (!nuevaAgenda.message) {
      const cola_agenda = {
        fechainicio_cola: fecha_inicio.campo,
        horainicio_cola: hora.campo,
        estado: "PENDIENTE",
        id_agenda: nuevaAgenda,
      };
      await services.createColaAgenda(cola_agenda);
      notificacion("Agenda", "Se ha añadido Agenda Satisfatoriamente", "success");
      handleClean();
      history.push("/dashboard/agenda/ventaservicio");
      setId_agenda(nuevaAgenda);
    } else {
      notificaciones(
        "Horario Duplicado",
        "Ya Existe Agenda para la misma hora y fecha del Odontólogo",
        "default"
      );
    }
  };
  return (
    <>
      <Topbar />
      <div className={`wrapper ${isCollapsed ? "sidebar-collapsed" : ""}`}>
        <h3 className="titulo">Agenda</h3>
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
                <b>Agenda</b>
              </li>
              {id_agenda > 0 ? (
                <>
                  <li> / </li>
                  <li>
                    <Link to="/dashboard/agenda/ventaservicio" className="navegacion__redirect">
                      Venta Servicio
                    </Link>
                  </li>
                </>
              ) : null}
            </ul>
          </nav>
        </div>
        <div className="venta__btns cita__btn">
          <button className="button crear crear_venta" onClick={handleSubmit}>
            <span className="button__icon">
              <EventAvailable className="icon" />
            </span>
            <span className="button__text">Agendar Cita</span>
          </button>
          <button className="button limpiar" onClick={handleClean}>
            <span className="button__icon">
              <ClearAll className="icon" />
            </span>
            <span className="button__text">Limpiar</span>
          </button>
        </div>
        <form onSubmit={onSubmitPaciente}>
          <div className="venta__cliente">
            <div className="search__info">
              <label htmlFor="ced_paciente" className="label__info">
                Paciente
              </label>
              <input
                type="text"
                name="ced_paciente"
                id="ced_paciente"
                placeholder="Cedula Paciente"
                value={entradas.paciente}
                onChange={(e) => setEntradas({ ...entradas, paciente: e.target.value })}
              />
              <button>
                <Search />
              </button>
            </div>
            <div className="info__cliente">
              <div className="contenido">
                {paciente.length > 0 ? (
                  <table className="paleBlueRows venta">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Nombres</th>
                        <th>Dirección</th>
                        <th>Telefono</th>
                        <th>Edad</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paciente.length > 0
                        ? paciente.map((item, index) => {
                            return (
                              <tr key={index} className="rowData">
                                <td>{index + 1}</td>
                                <td>
                                  {item.nombres} {item.apellidos}
                                </td>
                                <td>{item.direccion}</td>
                                <td>{item.telefono}</td>
                                <td>{item.edad}</td>
                              </tr>
                            );
                          })
                        : null}
                    </tbody>
                  </table>
                ) : (
                  <h1 className="title__info">Ingrese número de Cedula para visualizar</h1>
                )}
              </div>
            </div>
          </div>
        </form>
        <form onSubmit={onSubmitOdontologo}>
          <div className="venta__cliente">
            <div className="search__info">
              <label htmlFor="ced_odontologo" className="label__info">
                Odontólogo
              </label>
              <input
                type="text"
                name="ced_odontologo"
                id="ced_odontologo"
                placeholder="Cedula Odontólogo"
                value={entradas.odontologo}
                onChange={(e) => setEntradas({ ...entradas, odontologo: e.target.value })}
              />
              <button>
                <Search />
              </button>
            </div>
            <div className="info__cliente">
              <div className="contenido">
                {odontologo.length > 0 ? (
                  <table className="paleBlueRows venta">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Nombres</th>
                        <th>Dirección</th>
                        <th>Telefono</th>
                      </tr>
                    </thead>
                    <tbody>
                      {odontologo.length > 0
                        ? odontologo.map((item, index) => {
                            return (
                              <tr key={index} className="rowData">
                                <td>{index + 1}</td>
                                <td>
                                  {item.nombres} {item.apellidos}
                                </td>
                                <td>{item.direccion}</td>
                                <td>{item.telefono}</td>
                              </tr>
                            );
                          })
                        : null}
                    </tbody>
                  </table>
                ) : (
                  <h1 className="title__info">Ingrese número de Cedula para visualizar</h1>
                )}
              </div>
            </div>
          </div>
        </form>
        <form onSubmit={onSubmitServicio}>
          <div className="venta__cliente">
            <div className="search__info">
              <label htmlFor="servicio" className="label__info">
                Servicio
              </label>
              <input
                type="text"
                name="servicio"
                id="servicio"
                placeholder="Codigo de Servicio"
                value={entradas.servicio}
                onChange={(e) => setEntradas({ ...entradas, servicio: e.target.value })}
              />
              <button>
                <Search />
              </button>
            </div>
            <div className="info__cliente">
              <div className="contenido">
                {servicio.length > 0 ? (
                  <table className="paleBlueRows venta">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Codigo</th>
                        <th>Nombres</th>
                        <th>Descripción</th>
                        <th>Precio</th>
                      </tr>
                    </thead>
                    <tbody>
                      {servicio.length > 0
                        ? servicio.map((item, index) => {
                            return (
                              <tr key={index} className="rowData">
                                <td>{index + 1}</td>
                                <td>{item.cod_servicio}</td>
                                <td>{item.nombre}</td>
                                <td>{item.descripcion}</td>
                                <td>${Number(item.precio).toFixed(2)}</td>
                              </tr>
                            );
                          })
                        : null}
                    </tbody>
                  </table>
                ) : (
                  <h1 className="title__info">Ingrese un Servicio para visualizar</h1>
                )}
              </div>
            </div>
          </div>
        </form>

        <div className="ingresar__productos cita__med">
          <span className="add__compra">Agendar Cita</span>
          <Formulario>
            <ComponentInput
              state={descripcion} //value
              setState={setDescripcion} //onChange
              title="Descripción"
              type="text"
              name="descripcion"
              placeholder="Descripción"
              error="Debe ingresar una Descripción"
              expresion={expresiones.nombre}
            />
            <ComponentInput
              state={fecha_inicio} //value
              setState={setFecha_inicio} //onChange
              title="Fecha Agenda Cita"
              type="date"
              name="descripcion"
              placeholder="Descripción"
              // error="Debe ingresar una Descripción"
              // expresion={expresiones.fecha}
            />
            <ComponentInput
              state={hora} //value
              setState={sethora} //onChange
              title="Hora Agenda Cita"
              type="time"
              name="descripcion"
              placeholder="Descripción"
              // error="Debe ingresar una Descripción"
              // expresion={expresiones.fecha}
            />
          </Formulario>
        </div>
      </div>
    </>
  );
};

export default AgendaView;
