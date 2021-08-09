import "./DashboardView.css";
import Topbar from "../layouts/topbar/Topbar";
import useValues from "../../provider/useValues";
import pacienteServices from "../../services/paciente";
import odontologoServices from "../../services/odontologos";
import { useState } from "react";
const AgendaView = () => {
  const { isCollapsed } = useValues();
  const [cedula, setCedula] = useState({ paciente: "", odontologo: "" });
  const [paciente, setPaciente] = useState([]);
  const [odontologo, setOdontologo] = useState([]);
  const onSubmitPaciente = async (e) => {
    e.preventDefault();
    const pacienteConsulta = await pacienteServices.listPacientesByCed({ cedula: cedula.paciente });
    setPaciente(pacienteConsulta);
  };
  const onSubmitOdontologo = async (e) => {
    e.preventDefault();
    const odontologoConsulta = await odontologoServices.listOdontologoByCed({
      cedula: cedula.odontologo,
    });
    setOdontologo(odontologoConsulta);
  };
  return (
    <>
      <Topbar />
      <div className={`wrapper ${isCollapsed ? "sidebar-collapsed" : ""}`}>
        <h1>Agenda</h1>
        <form onSubmit={onSubmitPaciente}>
          <h4>Paciente</h4>
          <label htmlFor="ced">Cedula</label>
          <input
            type="text"
            name="ced"
            id="ced"
            values={cedula.paciente}
            onChange={(e) => setCedula({ ...cedula, paciente: e.target.value })}
          />
          <button>Buscar</button>
        </form>
        {!paciente.message ? (
          paciente.map((item) => {
            return (
              <ul key={item.id}>
                <li>
                  <strong>Nombre del Paciente:</strong>
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
          <label htmlFor="ced">Cedula</label>
          <input
            type="text"
            name="ced"
            id="ced"
            values={cedula.odontologo}
            onChange={(e) => setCedula({ ...cedula, odontologo: e.target.value })}
          />
          <button>Buscar</button>
        </form>
        {!odontologo.message ? (
          odontologo.map((item) => {
            return (
              <ul key={item.id_Odontologo}>
                <li>
                  <strong>Nombre del Paciente:</strong>
                  {item.nombres} {item.apellidos}
                </li>
              </ul>
            );
          })
        ) : (
          <h4>Odontologo no existe</h4>
        )}
        <div></div>
      </div>
    </>
  );
};

export default AgendaView;
