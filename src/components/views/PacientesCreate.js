import React, { useState } from "react";
import "./DashboardView.css";
import Topbar from "../layouts/topbar/Topbar";
import useValues from "../../provider/useValues";
import { Error } from "@material-ui/icons";
import {
  Formulario,
  ContenedorBotonCentrado,
  Boton,
  MensajeError,
  GrupoInput,
  Label,
  Select,
  Option,
} from "../../elements/Formularios";
import ComponentInput from "../layouts/forms/ComponentInput";
import services from "../../services/paciente";
import { Link } from "react-router-dom";
const PacientesCreate = () => {
  const { isCollapsed } = useValues();
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
  const expresiones = {
    nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    telefono: /^\d{7,14}$/, // 7 a 14 numeros.
    numero: /^\d{5,14}$/, // 7 a 14 numeros.
    edad: /^\d{1,3}$/, // 1 a 3 numeros.
    fecha: /^\d{4}-\d{2}-\d{2}$/,
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    if (
      nombres.valido === "true" &&
      apellidos.valido === "true" &&
      cedula.valido === "true" &&
      telefono.valido === "true" &&
      direccion.valido === "true" &&
      ciudad.valido === "true" &&
      fecha_nacimiento.valido === "true" &&
      edad.valido === "true" &&
      (genero.campo === "Masculino" || genero.campo === "Masculino")
    ) {
      setFormValid(true);
      const nuevoPaciente = {
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
      const item = await services.createPacientes(nuevoPaciente);
      if (item.code === "e500") {
        console.log(item.message); //paciente ya se encuentra registrado
      } else {
        setNombres({ campo: "", valido: null });
        setApellidos({ campo: "", valido: null });
        setTelefono({ campo: "", valido: null });
        setDireccion({ campo: "", valido: null });
        setCiudad({ campo: "", valido: null });
        setEdad({ campo: "", valido: null });
        setGenero({ campo: "", valido: null });
      }
    } else {
      setFormValid(false);
    }
  };
  return (
    <>
      <Topbar />
      <div className={`wrapper ${isCollapsed ? "sidebar-collapsed" : ""}`}>
        <h1>Nuevo Paciente</h1>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/dashboard">Home</Link>
              </li>
              <li>
                <Link to="/dashboard/pacientes">Pacientes</Link>
              </li>
              <li>
                <b>Nuevo Paciente</b>
              </li>
            </ul>
          </nav>
        </div>
        <Formulario onSubmit={onSubmit}>
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
            expresion={expresiones.numero}
          />
          <br />
          <ComponentInput
            state={telefono} //value
            setState={setTelefono} //onChange
            title="Telefono"
            type="text"
            name="telefono"
            placeholder="Telefono"
            error="el campo está incompleto"
            expresion={expresiones.telefono}
          />
          <ComponentInput
            state={direccion} //value
            setState={setDireccion} //onChange
            title="Dirección"
            type="text"
            name="direccion"
            placeholder="Dirección"
            error="el campo está incompleto"
            expresion={expresiones.nombre}
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
          <br />
          <ComponentInput
            state={fecha_nacimiento} //value
            setState={setFecha_nacimiento} //onChange
            title="Fecha de Nacimiento"
            type="date"
            name="fecha_nacimiento"
            placeholder="Fecha de Nacimiento"
            error="el campo está incompleto"
            expresion={expresiones.fecha}
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

          {formValid === false && (
            <MensajeError>
              <p>
                <Error />
                <b>Error: </b> Por favor rellene el formulario correctamente
              </p>
            </MensajeError>
          )}
          <ContenedorBotonCentrado>
            <Boton type="submit">Crear</Boton>
          </ContenedorBotonCentrado>
        </Formulario>
      </div>
    </>
  );
};

export default PacientesCreate;
