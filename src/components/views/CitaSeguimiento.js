import React, { useState, useEffect } from "react";
import Topbar from "../layouts/topbar/Topbar";
import useValues from "../../provider/useValues";
import { Link, useParams, useHistory } from "react-router-dom";
import agendaServices from "../../services/agenda";
import recetaServices from "../../services/receta";
import services from "../../services/cita.js";
import permisosServices from "../../services/permisos";
import notificacion from "../../utils/Notificaciones";
import { Cancel, EventAvailable, PostAdd } from "@material-ui/icons";
import { Formulario } from "../../elements/Formularios";
import ComponentInput from "../layouts/forms/ComponentInput";
import expresiones from "../../utils/Expresiones";
import empresaServices from "../../services/empresa";
import jsPDF from "jspdf";

const CitaSeguimiento = () => {
  const { isCollapsed } = useValues();
  const { id } = useParams();
  const history = useHistory();
  const [infoAgenda, setInfoAgenda] = useState([]);
  const [asistencia, setAsistencia] = useState({ campo: "", valido: null });
  const [motivo, setMotivo] = useState({ campo: "", valido: null });
  const [recetasmed, setRecetasMed] = useState({ campo: "", valido: null });
  const [descripcion, setDescripcion] = useState({ campo: "", valido: null });
  const [Observaciones, setObersvaciones] = useState({ campo: "", valido: null });
  const [motivoPermiso, setMotivoPermiso] = useState({ campo: "", valido: null });
  const [diasReposo, setDiasReposo] = useState({ campo: "", valido: null });
  const [switchPermiso, setSwitchPermiso] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [isListed, setIsListed] = useState(false);
  const [recetas, setRecetas] = useState([]);
  const [empresa, setEmpresa] = useState([]);
  useEffect(() => {
    const getEmpresa = async () => {
      const compañia = await empresaServices.optionEmpresa();
      setEmpresa(compañia);
    };
    getEmpresa();
  }, []);
  useEffect(() => {
    const obtenerCitaByIdAgenda = async () => {
      const datosCita = await services.getCitasByIdAgenda(id);
      if (datosCita.length > 0) {
        const { asistencia, sintomas, observaciones } = datosCita[0];
        setAsistencia({ campo: asistencia, valido: null });
        setObersvaciones({ campo: observaciones, valido: null });
        setMotivo({ campo: sintomas, valido: null });
        setIsUpdate(true);
      }
    };
    const obtenerDatos = async () => {
      const datosAgenda = await agendaServices.getAgendaById(id);
      setInfoAgenda(datosAgenda);
    };
    obtenerCitaByIdAgenda();
    obtenerDatos();
  }, [id, isUpdate]);
  useEffect(() => {
    const obtenerRecetas = async () => {
      const receta = await recetaServices.listRecetaById(infoAgenda[0]?.id);
      setRecetas(receta);
    };
    obtenerRecetas();
  }, [isListed, infoAgenda]);
  const handleSeguimiento = async () => {
    if (motivo.campo === "") {
      return notificacion(
        "Seguimiento de Cita",
        "Debe rellenar los campos para proceder",
        "warning"
      );
    }
    const cita = {
      id_agenda: infoAgenda[0].id,
      sintomas: motivo.campo,
      asistencia: asistencia.campo,
      observaciones: Observaciones.campo,
    };
    if (isUpdate) {
      await services.updateCita(cita, id);
      notificacion(
        "Seguimiento de Cita",
        "Se ha  Actualizado los Datos satisfatoriamente",
        "default"
      );
    } else {
      await services.createCita(cita);
      notificacion("Seguimiento de Cita", "Se ha creado Seguimiento satisfatoriamente", "success");
      setIsUpdate(true);
    }
  };

  const handleAddReceta = async () => {
    const nuevaReceta = {
      id_agenda: infoAgenda[0].id,
      nombre: recetasmed.campo,
      descripcion: descripcion.campo,
    };
    if (nuevaReceta.nombre === "") {
      setRecetasMed({ ...recetasmed, valido: "false" });
      return notificacion("Campos Incompletos", "Debe Rellenar los Campos", "warning");
    }
    if (nuevaReceta.descripcion === "") {
      setDescripcion({ ...descripcion, valido: "false" });
      return notificacion("Campos Incompletos", "Debe Rellenar los Campos", "warning");
    }
    await recetaServices.createReceta(nuevaReceta);
    setIsListed(!isListed);
    setRecetasMed({ campo: "", valido: null });
    setDescripcion({ campo: "", valido: null });
  };
  const handleSeguimientoFinal = async () => {
    if (asistencia.campo === "" || motivo.campo === "" || Observaciones.campo === "") {
      if (asistencia.campo === "") {
        setAsistencia({ ...asistencia, valido: "false" });
      }
      if (motivo.campo === "") {
        setMotivo({ ...asistencia, valido: "false" });
      }
      if (Observaciones.campo === "") {
        setObersvaciones({ ...asistencia, valido: "false" });
      }
      return notificacion("Campos Incompletos", "Debe Rellenar los Campos", "warning");
    }
    const estado = {
      estadoAgenda: "FINALIZADO",
      colaAgenda: "FINALIZADO",
    };
    await agendaServices.estadoAgenda(estado, id);
    notificacion(
      "Seguimiento de Cita",
      "Se han guardados los cambios y finalizado el seguimiento",
      "success"
    );
    history.push("/dashboard/cita");
  };
  const fecha = new Date();
  const handleGenerarPermisos = async () => {
    if (motivoPermiso.campo === "") {
      setMotivoPermiso({ ...recetasmed, valido: "false" });
      return notificacion("Campos Incompletos", "Debe Rellenar los Campos", "warning");
    }
    if (diasReposo.campo === "") {
      setDiasReposo({ ...descripcion, valido: "false" });
      return notificacion("Campos Incompletos", "Debe Rellenar los Campos", "warning");
    }
    const nuevoPermiso = {
      id_Paciente: infoAgenda[0].id_Paciente,
      id_Odontologo: infoAgenda[0].id_Odontologo,
      fecha_permiso: fecha,
      motivo_permiso: motivoPermiso.campo,
      dias_permiso: diasReposo.campo,
    };
    await permisosServices.createPermisos(nuevoPermiso);
    notificacion("Permiso Medico", "Se Generó permiso medico Satisfatoriamente", "success");
    generarDocumento();
    setSwitchPermiso(!switchPermiso);
    setMotivoPermiso({ campo: "", valido: null });
    setDiasReposo({ campo: "", valido: null });
  };
  const switchPermisos = () => {
    setSwitchPermiso(!switchPermiso);
    setMotivoPermiso({ campo: "", valido: null });
    setDiasReposo({ campo: "", valido: null });
  };
  var options = { year: "numeric", month: "long", day: "numeric" };
  const generarDocumento = () => {
    var doc = new jsPDF();
    var img = new Image();
    img.src = "/img/logo.png";
    let pageWidth = doc.internal.pageSize.getWidth();
    doc.addImage(img, 12, 25, 40, 25);
    doc.setFontSize(20);
    doc.text(empresa[0]?.nombre.toUpperCase(), pageWidth / 2, 25, "center");
    doc.text("CERTIFICADO MÉDICO", pageWidth / 2, 92, "center");
    doc.setFontSize(13);
    doc.text(empresa[0]?.direccion, pageWidth / 2, 30, "center");
    doc.text(empresa[0]?.telefono, pageWidth / 2, 35, "center");

    doc.setFontSize(11);
    doc.text(15, 62, `Guayaquil, ${fecha.toLocaleDateString("es-ES", options)}`);
    const reportTitle = `Por medio de la presente yo ${infoAgenda[0].nombres_odontologo.toUpperCase()} ${infoAgenda[0].apellidos_odontologo.toUpperCase()}, Doctor del ${empresa[0]?.nombre.toUpperCase()} ortoga permiso medico para el/la Sr.(a) ${infoAgenda[0].nombres_paciente.toUpperCase()} ${infoAgenda[0].apellidos_paciente.toUpperCase()} con CI: ${
      infoAgenda[0].cedula_paciente
    } por el motivo de ${motivoPermiso.campo} donde certifico que dicho procedimiento requiere de ${
      diasReposo.campo
    } días de descanso a partir de la fecha de hoy`;
    var splitTitle = doc.splitTextToSize(reportTitle, 180);
    doc.text(15, 120, splitTitle);
    doc.save("certificado_medico.pdf");
  };
  return (
    <>
      <Topbar />
      <div className={`wrapper ${isCollapsed ? "sidebar-collapsed" : ""}`}>
        <h3 className="titulo">Seguimiento de Citas</h3>
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
                <Link to="/dashboard/cita" className="navegacion__redirect">
                  Cita
                </Link>
              </li>
              <li> / </li>
              <li>
                <b>Seguimiento de Cita</b>
              </li>
            </ul>
          </nav>
        </div>
        <div>
          <div className="container">
            <div className="item-1 vista__1 agenda ">
              <span>Información de la Cita</span>
              {infoAgenda.length > 0 ? (
                <table className="paleBlueRows venta">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Paciente</th>
                      <th>Servicio</th>
                      <th>Descripción Servicio</th>
                      <th>Odontologo Asignado</th>
                      <th>Hora y Fecha Agenda</th>
                    </tr>
                  </thead>
                  <tbody>
                    {infoAgenda.length > 0
                      ? infoAgenda.map((item, index) => {
                          return (
                            <tr key={index} className="rowData">
                              <td>{index + 1}</td>
                              <td>
                                {item.nombres_paciente} {item.apellidos_paciente}
                              </td>
                              <td>{item.nombre_servicio}</td>
                              <td>{item.descripcion_servicio}</td>
                              <td>
                                {item.nombres_odontologo} {item.apellidos_odontologo}
                              </td>
                              <td>
                                {new Date(item.fechainicio_agenda).toLocaleDateString()}{" "}
                                {item.hora_agenda}
                              </td>
                            </tr>
                          );
                        })
                      : null}
                  </tbody>
                </table>
              ) : (
                <h1 className="title__info">Ingrese un RUC para visualizar</h1>
              )}
            </div>
          </div>
        </div>
        <div className="container">
          <div className="item-1 vista__1 receta ">
            {infoAgenda.length > 0 ? (
              <table className="paleBlueRows venta">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Producto o Medicamento</th>
                    <th>Descripción</th>
                  </tr>
                </thead>
                <tbody>
                  {recetas.length > 0
                    ? recetas.map((item, index) => {
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
            ) : (
              <h1 className="title__info">Ingrese un RUC para visualizar</h1>
            )}
          </div>
          <div className="item-1 vista__1 ingreso ">
            <div>
              {/* <h4>Seguimiento de Cita</h4> */}
              <Formulario>
                <ComponentInput
                  state={asistencia} //value
                  setState={setAsistencia} //onChange
                  title="Asistencia"
                  type="text"
                  name="asistencia"
                  placeholder="Asistencia"
                  error="El campo es Requerible"
                  expresion={expresiones.direccion}
                />
                <ComponentInput
                  state={motivo} //value
                  setState={setMotivo} //onChange
                  title="Motivo Consulta"
                  type="text"
                  name="motivo"
                  placeholder="Motivo Consulta"
                  error="El campo es Requerible"
                  expresion={expresiones.direccion}
                />
                <ComponentInput
                  state={Observaciones} //value
                  setState={setObersvaciones} //onChange
                  title="Observaciones"
                  type="text"
                  name="observaciones"
                  placeholder="Observaciones"
                  error="El campo es Requerible"
                  expresion={expresiones.direccion}
                />
                <ComponentInput
                  state={recetasmed} //value
                  setState={setRecetasMed} //onChange
                  title="Producto o Medicamento"
                  type="text"
                  name="prodmed"
                  placeholder="Producto o Medicamento"
                  error="El campo es Requerible"
                  expresion={expresiones.direccion}
                />
                <ComponentInput
                  state={descripcion} //value
                  setState={setDescripcion} //onChange
                  title="Descripción"
                  type="text"
                  name="descripcion"
                  placeholder="Descripción"
                  error="El campo es Requerible"
                  expresion={expresiones.direccion}
                />
              </Formulario>
              <div className="crear-item">
                <button className="button actualizar" onClick={handleAddReceta}>
                  <span className="button__icon">
                    <PostAdd className="icon" />
                  </span>
                  <span className="button__text">Agregar Receta</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        {switchPermiso ? (
          <div className="container permed">
            <div className="item-1 vista__1 permisoMedico ">
              <Formulario>
                <ComponentInput
                  state={motivoPermiso} //value
                  setState={setMotivoPermiso} //onChange
                  title="Motivo Permiso"
                  type="text"
                  name="motivopermiso"
                  placeholder="Motivo Permiso"
                  error="El campo es Requerible"
                  expresion={expresiones.direccion}
                />
                <ComponentInput
                  state={diasReposo} //value
                  setState={setDiasReposo} //onChange
                  title="Días Reposo"
                  type="text"
                  name="diasreposo"
                  placeholder="Días Reposo"
                  error="El campo es Requerible"
                  expresion={expresiones.numero}
                />
              </Formulario>
              <div className="venta__btns motpermiso">
                <button className="button limpiar crear_venta" onClick={switchPermisos}>
                  <span className="button__icon">
                    <Cancel className="icon" />
                  </span>
                  <span className="button__text">Cancelar</span>
                </button>
                <button className="button permiso crear_venta" onClick={handleGenerarPermisos}>
                  <span className="button__icon">
                    <EventAvailable className="icon" />
                  </span>
                  <span className="button__text">Generar Permiso</span>
                </button>
              </div>
            </div>
          </div>
        ) : null}

        <div className="venta__btns">
          <button className="button permiso crear_venta" onClick={switchPermisos}>
            <span className="button__icon">
              <EventAvailable className="icon" />
            </span>
            <span className="button__text">Permiso Médico</span>
          </button>
          <button className="button crear crear_venta" onClick={handleSeguimiento}>
            <span className="button__icon">
              <EventAvailable className="icon" />
            </span>
            <span className="button__text">Guardar</span>
          </button>
          <button className="button cancel crear_venta" onClick={handleSeguimientoFinal}>
            <span className="button__icon">
              <EventAvailable className="icon" />
            </span>
            <span className="button__text">Finalizar</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default CitaSeguimiento;
