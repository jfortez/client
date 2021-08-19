import React, { useState, useEffect } from "react";
import Topbar from "../layouts/topbar/Topbar";
import useValues from "../../provider/useValues";
import { Link, useParams, useHistory } from "react-router-dom";
import agendaServices from "../../services/agenda";
import recetaServices from "../../services/receta";
import services from "../../services/cita.js";
import permisosServices from "../../services/permisos";

const CitaSeguimiento = () => {
  const { isCollapsed } = useValues();
  const { id } = useParams();
  const history = useHistory();
  const [infoAgenda, setInfoAgenda] = useState([]);
  const [switchPermiso, setSwitchPermiso] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [isListed, setIsListed] = useState(false);
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
  const [permisoMedico, setPermisoMedico] = useState({ motivo: "", dias: 0 });
  useEffect(() => {
    const obtenerCitaByIdAgenda = async () => {
      const datosCita = await services.getCitasByIdAgenda(id);
      if (datosCita.length > 0) {
        setInfoCita({
          sintomas: datosCita[0].sintomas,
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
    console.log("test");
  }, [id, isUpdate]);
  useEffect(() => {
    const obtenerRecetas = async () => {
      const receta = await recetaServices.listRecetaById(infoAgenda[0]?.id);
      setRecetas(receta);
    };
    obtenerRecetas();
  }, [isListed, infoAgenda]);
  const handleSeguimiento = async () => {
    const cita = {
      id_agenda: infoAgenda[0].id,
      sintomas: infoCita.sintomas,
      asistencia: infoCita.asistencia,
      observaciones: infoCita.observaciones,
    };
    if (isUpdate) {
      await services.updateCita(cita, id);
    } else {
      await services.createCita(cita);
      setIsUpdate(true);
    }
  };

  const handleAddReceta = async () => {
    const nuevaReceta = {
      id_agenda: infoAgenda[0].id,
      nombre: infoCita.nombre_receta,
      descripcion: infoCita.descripcion_receta,
    };
    if (nuevaReceta.nombre === "" || nuevaReceta.descripcion === "") {
      return console.log("los campos deben estar completos");
    }
    await recetaServices.createReceta(nuevaReceta);
    setIsListed(!isListed);
    setInfoCita({ ...infoCita, nombre_receta: "", descripcion_receta: "" });
  };
  const handleSeguimientoFinal = async () => {
    const estado = {
      estadoAgenda: "FINALIZADO",
      colaAgenda: "FINALIZADO",
    };
    await agendaServices.estadoAgenda(estado, id);
    history.push("/dashboard/cita");
  };
  const handleGenerarPermisos = async () => {
    const fecha = new Date();
    const nuevoPermiso = {
      id_Paciente: infoAgenda[0].id_Paciente,
      id_Odontologo: infoAgenda[0].id_Odontologo,
      fecha_permiso: fecha,
      motivo_permiso: permisoMedico.motivo,
      dias_permiso: permisoMedico.dias,
    };
    permisosServices.createPermisos(nuevoPermiso);
    setSwitchPermiso(!switchPermiso);
    setPermisoMedico({ motivo: "", dias: 0 });
  };
  const switchPermisos = () => {
    setSwitchPermiso(!switchPermiso);
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
          {switchPermiso ? (
            <div>
              <h4>Permiso Médico</h4>
              <label htmlFor="">Motivo Permiso</label>
              <input
                type="text"
                value={permisoMedico.motivo}
                onChange={(e) => setPermisoMedico({ ...permisoMedico, motivo: e.target.value })}
              />
              <label htmlFor="">Días De Reposo</label>
              <input
                type="text"
                value={permisoMedico.dias}
                onChange={(e) => setPermisoMedico({ ...permisoMedico, dias: e.target.value })}
              />
              <button onClick={handleGenerarPermisos}>Generar</button>
              <button onClick={switchPermisos}>Cancelar</button>
            </div>
          ) : (
            <button onClick={switchPermisos}>Permiso Medico</button>
          )}
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
            <div>
              <div>
                <label htmlFor="sintomas">Producto o Medicamento</label>
                <input
                  type="text"
                  value={infoCita.nombre_receta}
                  onChange={(e) => setInfoCita({ ...infoCita, nombre_receta: e.target.value })}
                />
                <label htmlFor="sintomas">Descripción de Receta</label>
                <input
                  type="text"
                  value={infoCita.descripcion_receta}
                  onChange={(e) => setInfoCita({ ...infoCita, descripcion_receta: e.target.value })}
                />
              </div>
              <button onClick={handleAddReceta}>Añadir</button>
              {recetas
                ? recetas.map((item) => {
                    return (
                      <ul key={item.id}>
                        <li>
                          <strong>Producto o Medicamento: </strong>
                          {item.nombre}
                        </li>
                        <li>
                          <strong>Descripcion de Receta: </strong>
                          {item.descripcion}
                        </li>
                      </ul>
                    );
                  })
                : null}
            </div>
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
