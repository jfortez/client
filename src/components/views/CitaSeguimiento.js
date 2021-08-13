import React, { useState, useEffect } from "react";
import Topbar from "../layouts/topbar/Topbar";
import useValues from "../../provider/useValues";
import { Link, useParams, useHistory } from "react-router-dom";
import agendaServices from "../../services/agenda";
import recetaServices from "../../services/receta";
import services from "../../services/cita.js";
const CitaSeguimiento = () => {
  const { isCollapsed } = useValues();
  const { id } = useParams();
  const history = useHistory();
  const [infoAgenda, setInfoAgenda] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);
  const [recetas, setRecetas] = useState([]);
  const [infoCita, setInfoCita] = useState({
    sintomas: "",
    id_receta: 0,
    receta: "",
    asistencia: "",
    observaciones: "",
    nombre_receta: "",
    descripcion_receta: "",
  });
  const [addReceta, setAddReceta] = useState(false);
  useEffect(() => {
    const obtenerCitaByIdAgenda = async () => {
      const datosCita = await services.getCitasByIdAgenda(id);
      if (datosCita.length > 0) {
        setInfoCita({
          sintomas: datosCita[0].sintomas,
          id_receta: datosCita[0].id_receta,
          asistencia: datosCita[0].asistencia,
          observaciones: datosCita[0].observaciones,
          nombre_receta: "",
          descripcion_receta: "",
        });
        setIsUpdate(true);
      }
    };
    const obtenerDatos = async () => {
      const datosAgenda = await agendaServices.getAgendaById(id);
      setInfoAgenda(datosAgenda);
    };
    obtenerCitaByIdAgenda();
    obtenerDatos();
  }, [id]);
  useEffect(() => {
    const obtenerRecetas = async () => {
      const receta = await recetaServices.listReceta();
      setRecetas(receta);
    };
    obtenerRecetas();
  }, [addReceta]);
  const handleSeguimiento = async () => {
    const cita = {
      id_agenda: infoAgenda[0].id,
      sintomas: infoCita.sintomas,
      id_receta: infoCita.id_receta,
      asistencia: infoCita.asistencia,
      observaciones: infoCita.observaciones,
    };
    if (isUpdate) {
      await services.updateCita(cita, id);
    } else {
      await services.createCita(cita);
    }
  };
  const handleOpen = () => {
    setAddReceta(!addReceta);
  };
  const handleAddReceta = async () => {
    const nuevaReceta = {
      nombre: infoCita.nombre_receta,
      descripcion: infoCita.descripcion_receta,
    };
    await recetaServices.createReceta(nuevaReceta);
    setInfoCita({ ...infoCita, nombre_receta: "", descripcion_receta: "" });
    setAddReceta(!addReceta);
  };
  const handleSeguimientoFinal = async () => {
    const estado = {
      estadoAgenda: "FINALIZADO",
      colaAgenda: "FINALIZADO",
    };
    await agendaServices.estadoAgenda(estado, id);
    history.push("/dashboard/cita");
  };
  return (
    <>
      <Topbar />
      <div className={`wrapper ${isCollapsed ? "sidebar-collapsed" : ""}`}>
        <h1>Seguimiento de Cita</h1>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/dashboard">Home</Link>
              </li>
              <li>
                <Link to="/dashboard/cita">Cita</Link>
              </li>
              <li>
                <b>Seguimiento de Cita</b>
              </li>
            </ul>
          </nav>
        </div>
        <div>
          <h4>Información de la Cita</h4>
          <ul>
            <li>
              <strong>Nombres Completos del Paciente: </strong>
              {infoAgenda[0]?.nombres_paciente} {infoAgenda[0]?.apellidos_paciente}
            </li>
            <li>
              <strong>Servicio: </strong>
              {infoAgenda[0]?.nombre_servicio}
            </li>
            <li>
              <strong>Descripción del Servicio: </strong>
              {infoAgenda[0]?.descripcion_servicio}
            </li>
            <li>
              <strong>Odontólogo Responsable: </strong>
              {infoAgenda[0]?.nombres_odontologo} {infoAgenda[0]?.apellidos_odontologo}
            </li>
            <li>
              <strong>Fecha y Hora asignada: </strong>
              {new Date(infoAgenda[0]?.fechainicio_agenda).toLocaleDateString()}{" "}
              {infoAgenda[0]?.hora_agenda}
            </li>
          </ul>
        </div>
        <div>
          <h4>Datos Ingresados</h4>
          <div>
            <label htmlFor="sintomas">Sintomas</label>
            <input
              type="text"
              value={infoCita.sintomas}
              onChange={(e) => setInfoCita({ ...infoCita, sintomas: e.target.value })}
            />
          </div>
          <div>
            <label htmlFor="sintomas">Receta</label>
            <select
              value={infoCita.id_receta}
              onChange={(e) => setInfoCita({ ...infoCita, id_receta: Number(e.target.value) })}
            >
              <option value="0">Seleccione</option>
              {recetas
                ? recetas.map((item) => {
                    return (
                      <option value={item.id} key={item.id}>
                        {item.nombre} | {item.descripcion}
                      </option>
                    );
                  })
                : null}
            </select>
            {addReceta ? null : <button onClick={handleOpen}>Añadir Receta</button>}
            {addReceta ? (
              <div>
                <div>
                  <label htmlFor="sintomas">Nombre Receta</label>
                  <input
                    type="text"
                    value={infoCita.nombre_receta}
                    onChange={(e) => setInfoCita({ ...infoCita, nombre_receta: e.target.value })}
                  />
                </div>
                <div>
                  <label htmlFor="sintomas">Descripción Receta</label>
                  <input
                    type="text"
                    value={infoCita.descripcion_receta}
                    onChange={(e) =>
                      setInfoCita({ ...infoCita, descripcion_receta: e.target.value })
                    }
                  />
                </div>
                <button onClick={handleAddReceta}>Añadir</button>
                <button onClick={handleOpen}>Cancelar</button>
              </div>
            ) : null}
          </div>
          <div>
            <label htmlFor="sintomas">Asistencia</label>
            <input
              type="text"
              value={infoCita.asistencia}
              onChange={(e) => setInfoCita({ ...infoCita, asistencia: e.target.value })}
            />
          </div>
          <div>
            <label htmlFor="sintomas">Observaciones</label>
            <input
              type="text"
              value={infoCita.observaciones}
              onChange={(e) => setInfoCita({ ...infoCita, observaciones: e.target.value })}
            />
          </div>
          <button onClick={handleSeguimiento}>Guardar</button>
          <button onClick={handleSeguimientoFinal}>Finalizar</button>
        </div>
      </div>
    </>
  );
};

export default CitaSeguimiento;
