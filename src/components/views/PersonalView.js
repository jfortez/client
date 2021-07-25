import React, { useState } from "react";
import "./DashboardView.css";
import Topbar from "../layouts/topbar/Topbar";
import useValues from "../../provider/useValues";
import {
  Formulario,
  ContenedorBotonCentrado,
  Boton,
  MensajeError,
} from "../../elements/Formularios";
import { Error } from "@material-ui/icons";
import ComponentInput from "../layouts/forms/ComponentInput";
import axios from "axios";

const PersonalView = () => {
  const { isCollapsed } = useValues();
  const [nombres, setNombres] = useState({ campo: "", valido: null });
  const [apellidos, setApellidos] = useState({ campo: "", valido: null });
  const [telefono, setTelefono] = useState({ campo: "", valido: null });
  const [direccion, setDireccion] = useState({ campo: "", valido: null });
  const [ciudad, setCiudad] = useState({ campo: "", valido: null });
  const [email, setEmail] = useState({ campo: "", valido: null });
  const [fecha_nac, setFecha_nac] = useState({ campo: "", valido: null });
  const [edad, setEdad] = useState({ campo: "", valido: null });
  const [tipo_doc, setTipo_Doc] = useState({ campo: "", valido: null });
  const [num_documento, setNum_Documento] = useState({
    campo: "",
    valido: null,
  });
  const [id_Usuario, setIdUsuario] = useState({ campo: "1", valido: null });
  const [usuario, setUsuario] = useState({ campo: "", valido: null });
  const [contraseña, setContraseña] = useState({ campo: "", valido: null });

  const [formValid, setFormValid] = useState(null);
  const expresiones = {
    usuario: /^[a-zA-Z0-9_-]{4,16}$/, // Letras, numeros, guion y guion_bajo
    nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    password: /^.{4,12}$/, // 4 a 12 digitos.
    correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    telefono: /^\d{7,14}$/, // 7 a 14 numeros.
    numero: /^\d{5,14}$/, // 7 a 14 numeros.
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (
      nombres.valido === "true" &&
      apellidos.valido === "true" &&
      telefono.valido === "true" &&
      direccion.valido === "true" &&
      ciudad.valido === "true" &&
      email.valido === "true" &&
      fecha_nac.valido === "true" &&
      edad.valido === "true" &&
      tipo_doc.valido === "true" &&
      num_documento.valido === "true" &&
      usuario.valido === "true" &&
      contraseña.valido === "true"
    ) {
      axios
        .post("http://localhost:5000/api/usuarios/create", {
          usuario: usuario.campo,
          contraseña: contraseña.campo,
          email: email.campo,
        })
        .then((response) => {
          console.log(response.data.results.insertId);
          setIdUsuario(response.data.results.insertId);
        });
      axios
        .post("http://localhost:5000/api/personal/create", {
          nombres: nombres.campo,
          apellidos: apellidos.campo,
          telefono: telefono.campo,
          direccion: direccion.campo,
          ciudad: ciudad.campo,
          email: email.campo,
          fecha_nac: fecha_nac.campo,
          edad: edad.campo,
          tipo_doc: tipo_doc.campo,
          num_documento: num_documento.campo,
          id_Usuario: id_Usuario.campo,
        })
        .then((response) => console.log(response));
      setFormValid(true);
      // setNombres({ campo: "", valido: null });
    } else {
      setFormValid(false);
    }
  };
  return (
    <>
      <Topbar />
      <div className={`wrapper ${isCollapsed ? "sidebar-collapsed" : ""}`}>
        <h1>Personal </h1>
        <Formulario onSubmit={onSubmit}>
          <ComponentInput
            state={nombres} //value
            setState={setNombres} //onChange
            title="Nombres:"
            type="text"
            name="nombres"
            placeholder="Nombres"
            error="error"
            expresion={expresiones.nombre}
          />
          <ComponentInput
            state={apellidos} //value
            setState={setApellidos} //onChange
            title="Apellidos:"
            type="text"
            name="apellidos"
            placeholder="apellidos"
            error="error"
            expresion={expresiones.nombre}
          />
          <ComponentInput
            state={telefono} //value
            setState={setTelefono} //onChange
            title="Telefono:"
            type="text"
            name="telefono"
            placeholder="Telefono"
            error="error"
            expresion={expresiones.telefono}
          />
          <ComponentInput
            state={direccion} //value
            setState={setDireccion} //onChange
            title="direccion:"
            type="text"
            name="direccion"
            placeholder="direccion"
            error="error"
            expresion={expresiones.nombre}
          />
          <ComponentInput
            state={ciudad} //value
            setState={setCiudad} //onChange
            title="ciudad:"
            type="text"
            name="ciudad"
            placeholder="ciudad"
            error="error"
            expresion={expresiones.nombre}
          />
          <ComponentInput
            state={email} //value
            setState={setEmail} //onChange
            title="email:"
            type="text"
            name="email"
            placeholder="email"
            error="error"
            expresion={expresiones.correo}
          />
          <ComponentInput
            state={ciudad} //value
            setState={setCiudad} //onChange
            title="ciudad:"
            type="text"
            name="ciudad"
            placeholder="ciudad"
            error="error"
            expresion={expresiones.nombre}
          />
          <ComponentInput
            state={fecha_nac} //value
            setState={setFecha_nac} //onChange
            title="fecha_nac:"
            type="text"
            name="fecha_nac"
            placeholder="fecha_nac"
            error="error"
            expresion={expresiones.nombre}
          />
          <ComponentInput
            state={edad} //value
            setState={setEdad} //onChange
            title="edad:"
            type="text"
            name="edad"
            placeholder="edad"
            error="error"
            expresion={expresiones.numero}
          />
          <ComponentInput
            state={tipo_doc} //value
            setState={setTipo_Doc} //onChange
            title="tipo_doc:"
            type="text"
            name="tipo_doc"
            placeholder="tipo_doc"
            error="error"
            expresion={expresiones.nombre}
          />
          <ComponentInput
            state={num_documento} //value
            setState={setNum_Documento} //onChange
            title="num_documento:"
            type="text"
            name="num_documento"
            placeholder="num_documento"
            error="error"
            expresion={expresiones.numero}
          />
          <ComponentInput
            state={usuario} //value
            setState={setUsuario} //onChange
            title="usuario:"
            type="text"
            name="usuario"
            placeholder="usuario"
            error="error"
            expresion={expresiones.usuario}
          />
          <ComponentInput
            state={contraseña} //value
            setState={setContraseña} //onChange
            title="contraseña:"
            type="text"
            name="contraseña"
            placeholder="contraseña"
            error="error"
            expresion={expresiones.password}
          />
          {/* Validacion */}
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
          </ContenedorBotonCentrado>
        </Formulario>
      </div>
    </>
  );
};

export default PersonalView;
