import React, { useState } from "react";
import "./DashboardView.css";
import Topbar from "../layouts/topbar/Topbar";
import axios from "axios";
const PacientesView = () => {
  const [pacientes, setPacientes] = useState({
    nombres: "",
    apellidos: "",
    telefono: "",
    direccion: "",
    ciudad: "",
    tipo_doc: "",
    num_documento: "",
    fecha_nac: "",
    edad: "",
    estadoCivil: "",
    genero: "",
    email: "",
  });
  const onChangePacientes = (e) => {
    setPacientes({
      ...pacientes,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/pacientes/create", {
        nombres: pacientes.nombres,
        apellidos: pacientes.apellidos,
        telefono: pacientes.telefono,
        direccion: pacientes.direccion,
        ciudad: pacientes.ciudad,
        tipo_doc: pacientes.tipo_doc,
        num_documento: pacientes.num_documento,
        fecha_nac: pacientes.fecha_nac,
        edad: pacientes.edad,
        estadoCivil: pacientes.estadoCivil,
        genero: pacientes.genero,
        email: pacientes.email,
      })
      .then((response) => {
        console.log(response);
      });
    console.log("asd");
  };
  return (
    <>
      <Topbar />
      <div className="wrapper">
        <h1>Pacientes</h1>
        <form action="" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="nombres">Nombres:</label>
            <input
              type="text"
              name="nombres"
              value={pacientes.nombres}
              onChange={onChangePacientes}
            />
          </div>
          <div>
            <label htmlFor="apellidos">Apellidos:</label>
            <input
              type="text"
              name="apellidos"
              value={pacientes.apellidos}
              onChange={onChangePacientes}
            />
          </div>
          <div>
            <label htmlFor="telefono">telefono:</label>
            <input
              type="text"
              name="telefono"
              value={pacientes.telefono}
              onChange={onChangePacientes}
            />
          </div>
          <div>
            <label htmlFor="direccion">direccion:</label>
            <input
              type="text"
              name="direccion"
              value={pacientes.direccion}
              onChange={onChangePacientes}
            />
          </div>
          <div>
            <label htmlFor="ciudad">ciudad:</label>
            <input
              type="text"
              name="ciudad"
              value={pacientes.ciudad}
              onChange={onChangePacientes}
            />
          </div>
          <div>
            <label htmlFor="tipo_doc">Tipo Documento:</label>
            <input
              type="text"
              name="tipo_doc"
              value={pacientes.tipo_doc}
              onChange={onChangePacientes}
            />
          </div>
          <div>
            <label htmlFor="num_documento">N° de Documento:</label>
            <input
              type="text"
              name="num_documento"
              value={pacientes.num_documento}
              onChange={onChangePacientes}
            />
          </div>
          <div>
            <label htmlFor="fecha_nac">Fecha de Nacimiento:</label>
            <input
              type="text"
              name="fecha_nac"
              value={pacientes.fecha_nac}
              onChange={onChangePacientes}
            />
          </div>
          <div>
            <label htmlFor="edad">edad:</label>
            <input
              type="text"
              name="edad"
              value={pacientes.edad}
              onChange={onChangePacientes}
            />
          </div>
          <div>
            <label htmlFor="estadoCivil">Estado Civil:</label>
            <input
              type="text"
              name="estadoCivil"
              value={pacientes.estadoCivil}
              onChange={onChangePacientes}
            />
          </div>
          <div>
            <label htmlFor="genero">Genero:</label>
            <input
              type="text"
              name="genero"
              value={pacientes.genero}
              onChange={onChangePacientes}
            />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="text"
              name="email"
              value={pacientes.email}
              onChange={onChangePacientes}
            />
          </div>
          <button type="submit">Guardar</button>
        </form>
      </div>
    </>
  );
};

export default PacientesView;
