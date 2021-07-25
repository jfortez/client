import React, { useState } from "react";
import "./DashboardView.css";
import Topbar from "../layouts/topbar/Topbar";
import axios from "axios";
import useValues from "../../provider/useValues";
import { Error } from "@material-ui/icons";
import {
  Formulario,
  ContenedorBotonCentrado,
  Boton,
  MensajeExito,
  MensajeError,
} from "../../elements/Formularios";
import ComponentInput from "../layouts/forms/ComponentInput";

const NuevoPacientes = () => {
  const { isCollapsed } = useValues();
  const [nombres, setNombres] = useState({ campo: "", valido: null });
  const [apellidos, setApellidos] = useState({ campo: "", valido: null });
  const [telefono, setTelefono] = useState({ campo: "", valido: null });
  const [direccion, setDireccion] = useState({ campo: "", valido: null });
  const [ciudad, setCiudad] = useState({ campo: "", valido: null });
  const [tipo_doc, set_Tipo_Doc] = useState({ campo: "", valido: null });
  const [num_documento, setNum_Documento] = useState({
    campo: "",
    valido: null,
  });
  const [fecha_nac, setFecha_nac] = useState({ campo: "", valido: null });
  const [edad, setEdad] = useState({ campo: "", valido: null });
  const [estadoCivil, setEstadoCivil] = useState({ campo: "", valido: null });
  const [genero, setGenero] = useState({ campo: "", valido: null });
  const [email, setEmail] = useState({ campo: "", valido: null });
  const [formValid, setFormValid] = useState(null);
  const expresiones = {
    usuario: /^[a-zA-Z0-9_-]{4,16}$/, // Letras, numeros, guion y guion_bajo
    nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    password: /^.{4,12}$/, // 4 a 12 digitos.
    correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    telefono: /^\d{7,14}$/, // 7 a 14 numeros.
    edad: /^\d{1,5}$/, // 7 a 14 numeros.
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (
      nombres.valido === "true" &&
      apellidos.valido === "true" &&
      telefono.valido === "true" &&
      direccion.valido === "true" &&
      ciudad.valido === "true" &&
      tipo_doc.valido === "true" &&
      num_documento.valido === "true" &&
      fecha_nac.valido === "true" &&
      estadoCivil.valido === "true" &&
      genero.valido === "true" &&
      email.valido === "true"
    ) {
      setFormValid(true);
      axios
        .post("http://192.168.0.100:5000/api/pacientes/create", {
          nombres: nombres.campo,
          apellidos: apellidos.campo,
          telefono: telefono.campo,
          direccion: direccion.campo,
          ciudad: ciudad.campo,
          tipo_doc: tipo_doc.campo,
          num_documento: num_documento.campo,
          fecha_nac: fecha_nac.campo,
          edad: edad.campo,
          estadoCivil: estadoCivil.campo,
          genero: genero.campo,
          email: email.campo,
        })
        .then((response) => {
          const code = response.data.code;
          console.log(response.data);
          if (code === "e500") {
            console.log(response.data.message);
          } else {
            setNombres({ campo: "", valido: null });
            setApellidos({ campo: "", valido: null });
            setTelefono({ campo: "", valido: null });
            setDireccion({ campo: "", valido: null });
            setCiudad({ campo: "", valido: null });
            set_Tipo_Doc({ campo: "", valido: null });
            setNum_Documento({ campo: "", valido: null });
            setFecha_nac({ campo: "", valido: null });
            setEdad({ campo: "", valido: null });
            setEstadoCivil({ campo: "", valido: null });
            setGenero({ campo: "", valido: null });
            setEmail({ campo: "", valido: null });
          }
        });
    } else {
      setFormValid(false);
    }
  };
  return (
    <>
      <Topbar />
      <div className={`wrapper ${isCollapsed ? "sidebar-collapsed" : ""}`}>
        <h1>Pacientes</h1>
        <Formulario onSubmit={onSubmit}>
          <ComponentInput
            state={nombres} //value
            setState={setNombres} //onChange
            title="Nombres:"
            type="text"
            name="nombres"
            placeholder="Nombres Completos"
            error="Nombre Error "
            expresion={expresiones.nombre}
          />
          <ComponentInput
            state={apellidos} //value
            setState={setApellidos} //onChange
            title="Nombres:"
            type="text"
            name="apellidos"
            placeholder="Apellidos Completos"
            error="Apellido Error "
            expresion={expresiones.nombre}
          />
          <ComponentInput
            state={telefono} //value
            setState={setTelefono} //onChange
            title="Telefono:"
            type="text"
            name="telefono"
            placeholder="telefono"
            error="telefono Error "
            expresion={expresiones.telefono}
          />
          <ComponentInput
            state={direccion} //value
            setState={setDireccion} //onChange
            title="Dirección:"
            type="text"
            name="direccion"
            placeholder="direccion"
            error="direccion Error "
            expresion={expresiones.nombre}
          />
          <ComponentInput
            state={ciudad} //value
            setState={setCiudad} //onChange
            title="Ciudad:"
            type="text"
            name="ciudad"
            placeholder="ciudad"
            error="ciudad Error "
            expresion={expresiones.nombre}
          />
          <ComponentInput
            state={tipo_doc} //value
            setState={set_Tipo_Doc} //onChange
            title="Tipo de Documento:"
            type="text"
            name="tipo_doc"
            placeholder="Tipo de Documento"
            error="Tipo de Documento Error "
            expresion={expresiones.nombre}
          />
          <ComponentInput
            state={num_documento} //value
            setState={setNum_Documento} //onChange
            title="Número de Documento:"
            type="text"
            name="num_documento"
            placeholder="Numero Documento"
            error="Numero de Documento Error "
            expresion={expresiones.telefono}
          />
          <ComponentInput
            state={fecha_nac} //value
            setState={setFecha_nac} //onChange
            title="Fecha de Nacimiento:"
            type="text"
            name="fecha_nac"
            placeholder="Fecha de Nacimiento"
            error="Fecha nac error "
            expresion={expresiones.nombre}
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
          <ComponentInput
            state={estadoCivil} //value
            setState={setEstadoCivil} //onChange
            title="Estado Civil:"
            type="text"
            name="estadoCivil"
            placeholder="Estado Civil"
            error="estadoCivil error "
            expresion={expresiones.nombre}
          />
          <ComponentInput
            state={genero} //value
            setState={setGenero} //onChange
            title="Genero:"
            type="text"
            name="genero"
            placeholder="Genero"
            error="genero error "
            expresion={expresiones.nombre}
          />
          <ComponentInput
            state={email} //value
            setState={setEmail} //onChange
            title="Email:"
            type="text"
            name="email"
            placeholder="Email"
            error="email error "
            expresion={expresiones.correo}
          />
          {formValid === false && (
            <MensajeError>
              <p>
                <Error />
                <b>Error: </b> Por favor rellene el formulario correctamente
              </p>
            </MensajeError>
          )}
          <ContenedorBotonCentrado>
            <Boton type="submit">Enviar</Boton>
            {formValid === true && <MensajeExito>Formulario enviado exitosamente!</MensajeExito>}
          </ContenedorBotonCentrado>
        </Formulario>
      </div>
    </>
  );
};

export default NuevoPacientes;
