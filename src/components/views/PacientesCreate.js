import React, { useEffect, useState } from "react";
import "./DashboardView.css";
import Topbar from "../layouts/topbar/Topbar";
import useValues from "../../provider/useValues";
import expresiones from "../../utils/Expresiones";
import { Formulario, GrupoInput, Label, Select, Option } from "../../elements/Formularios";
import ComponentInput from "../layouts/forms/ComponentInput";
import services from "../../services/paciente";
import { Link, useLocation, useParams } from "react-router-dom";
import { Icon } from "@material-ui/core";
import { Save, SystemUpdateAlt } from "@material-ui/icons";

const PacientesCreate = () => {
  const { isCollapsed } = useValues();
  const [elementId, setElementId] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [nombres, setNombres] = useState({ campo: "", valido: null });
  const [apellidos, setApellidos] = useState({ campo: "", valido: null });
  const [cedula, setCedula] = useState({ campo: "", valido: null });
  const [telefono, setTelefono] = useState({ campo: "", valido: null });
  const [direccion, setDireccion] = useState({ campo: "", valido: null });
  const [ciudad, setCiudad] = useState({ campo: "", valido: null });
  const [fecha_nacimiento, setFecha_nacimiento] = useState({ campo: "", valido: null });
  const [edad, setEdad] = useState({ campo: "", valido: null });
  const [genero, setGenero] = useState({ campo: "", valido: null });
  const [formValid, setFormValid] = useState(null);
  const { id } = useParams();
  const pacienteId = id;
  const { pathname } = useLocation();
  useEffect(() => {
    if (pathname === `/dashboard/pacientes/${pacienteId}/edit`) {
      setIsEditing(true);
      const getPacienteById = async () => {
        const paciente = await services.getPacientesById(pacienteId);
        const {
          id,
          nombres,
          apellidos,
          cedula,
          telefono,
          direccion,
          ciudad,
          fecha_nacimiento,
          edad,
          genero,
        } = paciente[0];
        setElementId(id);
        setNombres({ campo: nombres, valido: null });
        setApellidos({ campo: apellidos, valido: null });
        setCedula({ campo: cedula, valido: null });
        setTelefono({ campo: telefono, valido: null });
        setDireccion({ campo: direccion, valido: null });
        setCiudad({ campo: ciudad, valido: null });
        setFecha_nacimiento({ campo: fecha_nacimiento, valido: null });
        setEdad({ campo: edad, valido: null });
        setGenero({ campo: genero, valido: null });
      };
      getPacienteById();
    }
  }, [pacienteId, pathname]);
  const handleUpdate = async (evt) => {
    evt.preventDefault();
    const updtPaciente = {
      cedula: cedula.campo,
      nombres: nombres.campo,
      apellidos: apellidos.campo,
      telefono: telefono.campo,
      direccion: direccion.campo,
      ciudad: ciudad.campo,
      fecha_nacimiento: fecha_nacimiento.campo,
      edad: edad.campo,
      genero: genero.campo,
      // active: active.campo,
    };
    await services.updatePacientes(updtPaciente, elementId);
    setNombres({ ...nombres, valido: null });
    setApellidos({ ...apellidos, valido: null });
    setCedula({ ...cedula, valido: null });
    setFecha_nacimiento({ ...fecha_nacimiento, valido: null });
    setTelefono({ ...telefono, valido: null });
    setDireccion({ ...direccion, valido: null });
    setCiudad({ ...ciudad, valido: null });
    setEdad({ ...edad, valido: null });
    setGenero({ ...genero, valido: null });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    if (
      nombres.valido === "true" &&
      apellidos.valido === "true" &&
      cedula.valido === "true" &&
      direccion.valido === "true" &&
      ciudad.valido === "true" &&
      edad.valido === "true" &&
      (genero.campo === "Masculino" || genero.campo === "Femenino")
    ) {
      setFormValid(true);
      const newItem = {
        nombres: nombres.campo,
        apellidos: apellidos.campo,
        cedula: cedula.campo,
        telefono: telefono.campo,
        direccion: direccion.campo,
        ciudad: ciudad.campo,
        fecha_nacimiento: fecha_nacimiento.campo,
        edad: edad.campo,
        genero: genero.campo,
      };
      const nuevo = await services.createPacientes(newItem);
      if (nuevo.message === "dato ya existe" && nuevo.result[0].active === 0) {
        await services.updatePacientes(newItem, nuevo.result[0].id);
      }
      if (nuevo.message === "dato ya existe" && nuevo.result[0].active === 1) {
        return console.log("dato ya existe"); //codigo para la alerta
      }
      setNombres({ campo: "", valido: null });
      setApellidos({ campo: "", valido: null });
      setCedula({ campo: "", valido: null });
      setFecha_nacimiento({ campo: "", valido: null });
      setTelefono({ campo: "", valido: null });
      setDireccion({ campo: "", valido: null });
      setCiudad({ campo: "", valido: null });
      setEdad({ campo: "", valido: null });
      setGenero({ campo: "", valido: null });
    } else {
      setFormValid(false);
    }
  };
  return (
    <>
      <Topbar />
      <div className={`wrapper ${isCollapsed ? "sidebar-collapsed" : ""}`}>
        <h3 className="titulo">{isEditing ? "Editar Paciente" : "Nuevo Paciente"}</h3>
        {formValid ? "ok" : "nom"}
        <div className="navegacion">
          <nav>
            <ul>
              <li>
                <Link to="/dashboard" className="navegacion__redirect">
                  Home
                </Link>
              </li>
              <li> / </li>
              <li>
                <Link to="/dashboard/pacientes" className="navegacion__redirect">
                  Pacientes
                </Link>
              </li>
              <li> / </li>
              <li>
                <b>{isEditing ? "Editar Paciente" : "Nuevo Paciente"}</b>
              </li>
            </ul>
          </nav>
        </div>
        <div className="crear-item">
          <button className="button actualizar" onClick={isEditing ? handleUpdate : onSubmit}>
            <span className="button__icon">
              <Icon component={isEditing ? SystemUpdateAlt : Save} className="icon" />
            </span>
            <span className="button__text">{isEditing ? "Actualizar" : "Guardar"}</span>
          </button>
        </div>
        <Formulario onSubmit={isEditing ? handleUpdate : onSubmit}>
          <ComponentInput
            state={nombres} //value
            setState={setNombres} //onChange
            title="Nombres"
            type="text"
            name="nombres"
            placeholder="Nombres"
            error="El campo está incompleto"
            expresion={expresiones.nombre}
          />
          <ComponentInput
            state={apellidos} //value
            setState={setApellidos} //onChange
            title="Apellidos"
            type="text"
            name="apellidos"
            placeholder="Apellidos"
            error="El campo está incompleto"
            expresion={expresiones.nombre}
          />
          <ComponentInput
            state={cedula} //value
            setState={setCedula} //onChange
            title="Cédula"
            type="text"
            name="cedula"
            placeholder="Cedula"
            error="la longitud de numeros debe ser de 15"
            expresion={expresiones.ruc}
          />
          <ComponentInput
            state={telefono} //value
            setState={setTelefono} //onChange
            title="Telefono"
            type="text"
            name="telefono"
            placeholder="Telefono"
          />
          <ComponentInput
            state={direccion} //value
            setState={setDireccion} //onChange
            title="Dirección"
            type="text"
            name="direccion"
            placeholder="Dirección"
            error="el campo está incompleto"
            expresion={expresiones.direccion}
          />
          <ComponentInput
            state={ciudad} //value
            setState={setCiudad} //onChange
            title="Ciudad"
            type="text"
            name="ciudad"
            placeholder="Ciudad"
            error="el campo está incompleto"
            expresion={expresiones.nombre}
          />
          <ComponentInput
            state={fecha_nacimiento} //value
            setState={setFecha_nacimiento} //onChange
            title="Fecha de Nacimiento"
            type="date"
            name="fecha_nacimiento"
            placeholder="Fecha de Nacimiento"
          />
          <ComponentInput
            state={edad} //value
            setState={setEdad} //onChange
            title="Edad:"
            type="text"
            name="edad"
            placeholder="Edad"
            error="Edad error "
            expresion={expresiones.edad}
          />
          <GrupoInput>
            <Label>Genero</Label>
            <Select value={genero.campo} onChange={(e) => setGenero({ campo: e.target.value })}>
              <Option value="0">Seleccione</Option>
              <Option value="Masculino">Masculino</Option>
              <Option value="Femenino">Femenino</Option>
            </Select>
            <br />
          </GrupoInput>
        </Formulario>
      </div>
    </>
  );
};

export default PacientesCreate;
