import "./DashboardView.css";
import Topbar from "../layouts/topbar/Topbar";
import useValues from "../../provider/useValues";
import pacienteServices from "../../services/paciente";
import odontologoServices from "../../services/odontologos";
import serviciosServices from "../../services/servicios";
import services from "../../services/agenda";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import notificacion from "../../utils/Notificaciones";

const AgendaView = () => {
  const { isCollapsed, setId_agenda } = useValues();
  const history = useHistory();
  const [entradas, setEntradas] = useState({
    paciente: "",
    odontologo: "",
    servicio: "",
    descripcion: "",
    fecha_inicio: "",
    hora: "",
  });
  const [paciente, setPaciente] = useState([]);
  const [odontologo, setOdontologo] = useState([]);
  const [servicio, setServicio] = useState([]);
  const onSubmitPaciente = async (e) => {
    e.preventDefault();
    const pacienteConsulta = await pacienteServices.listPacientesByCed({
      cedula: entradas.paciente,
    });
    setPaciente(pacienteConsulta);
  };
  const onSubmitOdontologo = async (e) => {
    e.preventDefault();
    const odontologoConsulta = await odontologoServices.listOdontologoByCed({
      cedula: entradas.odontologo,
    });
    setOdontologo(odontologoConsulta);
  };
  const onSubmitServicio = async (e) => {
    e.preventDefault();
    const serviciosConsulta = await serviciosServices.getServiciosByCod({
      cod_servicio: entradas.servicio,
    });
    setServicio(serviciosConsulta);
  };
  const handleClean = () => {
    setEntradas({
      paciente: "",
      odontologo: "",
      servicio: "",
      descripcion: "",
      fecha_inicio: "",
      hora: "",
    });
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
    if (entradas.descripcion === "" || entradas.fecha_inicio === "" || entradas.hora === "") {
      return notificacion("Agenda", "Debe rellenar los campos para proceder a crear", "warning");
    }
    const nuevo = {
      descripcion: entradas.descripcion,
      fechainicio_agenda: entradas.fecha_inicio,
      hora_agenda: entradas.hora,
      estado: "PENDIENTE",
      id_Odontologo: odontologo[0].id,
      id_Paciente: paciente[0].id,
      id_Servicio: servicio[0].id,
    };
    const nuevaAgenda = await services.createAgenda(nuevo);
    if (!nuevaAgenda.message) {
      const cola_agenda = {
        fechainicio_cola: entradas.fecha_inicio,
        horainicio_cola: entradas.hora,
        estado: "PENDIENTE",
        id_agenda: nuevaAgenda,
      };
      await services.createColaAgenda(cola_agenda);
      notificacion("Agenda", "Se ha añadido Agenda Satisfatoriamente", "success");
      handleClean();
      history.push("/dashboard/agenda/ventaservicio");
      setId_agenda(nuevaAgenda);
    } else {
      return console.log("duplicado");
    }
  };
  return (
    <>
      <Topbar />
      <div className={`wrapper ${isCollapsed ? "sidebar-collapsed" : ""}`}>
        <h1>Agenda</h1>
        <button onClick={handleClean}>Limpiar</button>
        <form onSubmit={onSubmitPaciente}>
          <h4>Paciente</h4>
          <label htmlFor="ced_paciente">Cedula</label>
          <input
            type="text"
            name="ced_paciente"
            id="ced_paciente"
            value={entradas.paciente}
            onChange={(e) => setEntradas({ ...entradas, paciente: e.target.value })}
          />
          <button>Buscar</button>
        </form>
        {!paciente.message ? (
          paciente.map((item) => {
            return (
              <ul key={item.id}>
                <li>
                  <strong>Nombre del Paciente: </strong>
                  {item.nombres} {item.apellidos}
                </li>
              </ul>
            );
          })
        ) : (
          <h4>Paciente no existe</h4>
        )}
        <form onSubmit={onSubmitOdontologo}>
          <h4>Odontologo</h4>
          <label htmlFor="ced_odontologo">Cedula</label>
          <input
            type="text"
            name="ced_odontologo"
            id="ced_odontologo"
            value={entradas.odontologo}
            onChange={(e) => setEntradas({ ...entradas, odontologo: e.target.value })}
          />
          <button>Buscar</button>
        </form>
        {!odontologo.message ? (
          odontologo.map((item) => {
            return (
              <ul key={item.id_Odontologo}>
                <li>
                  <strong>Nombre del Odontólogo: </strong>
                  {item.nombres} {item.apellidos}
                </li>
              </ul>
            );
          })
        ) : (
          <h4>Odontologo no existe</h4>
        )}
        <form onSubmit={onSubmitServicio}>
          <h4>Servicio</h4>
          <label htmlFor="servicio">Codigo de Servicio</label>
          <input
            type="text"
            name="servicio"
            id="servicio"
            value={entradas.servicio}
            onChange={(e) => setEntradas({ ...entradas, servicio: e.target.value })}
          />
          <button>Buscar</button>
        </form>
        {!servicio.message ? (
          servicio.map((item) => {
            return (
              <ul key={item.id}>
                <li>
                  <strong>Servicio: </strong>
                  {item.nombre}
                </li>
                <li>
                  <strong>Descripción: </strong>
                  {item.descripcion}
                </li>
              </ul>
            );
          })
        ) : (
          <h4>Servicio no existe</h4>
        )}
        <h4>Descripción</h4>
        <div>
          <label htmlFor="descripcion">Descripción</label>
          <input
            type="text"
            id="descripcion"
            value={entradas.descripcion}
            onChange={(e) => setEntradas({ ...entradas, descripcion: e.target.value })}
          />
        </div>
        <h4>Horario Agenda</h4>
        <div>
          <label htmlFor="fecha_inicio">Fecha</label>
          <input
            type="date"
            id="fecha_inicio"
            value={entradas.fecha_inicio}
            onChange={(e) => setEntradas({ ...entradas, fecha_inicio: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="hora">Hora</label>
          <input
            type="time"
            id="hora"
            value={entradas.hora}
            onChange={(e) => setEntradas({ ...entradas, hora: e.target.value })}
          />
        </div>
        <button onClick={handleSubmit}>Guardar</button>
      </div>
    </>
  );
};

export default AgendaView;
