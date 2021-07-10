import React, { useState } from "react";
import "./DashboardView.css";
import Topbar from "../layouts/topbar/Topbar";
import {
  Formulario,
  Label,
  ContenedorBotonCentrado,
  ContenedorTerminos,
  Boton,
  MensajeExito,
  MensajeError,
} from "../../elements/Formularios";
import { Error } from "@material-ui/icons";
import ComponentInput from "../layouts/forms/ComponentInput";
import axios from "axios";

const PersonalView = () => {
  const [usuario, setUsuario] = useState({ campo: "", valido: null });
  const [contraseña, setContraseña] = useState({ campo: "", valido: null });
  const [email, setEmail] = useState({ campo: "", valido: null });
  // const [usuario, setUsuario] = useState("");
  // const [contraseña, setContraseña] = useState("");
  // const [email, setEmail] = useState("");
  const [terminos, setTerminos] = useState(false);
  const [formValid, setFormValid] = useState(null);
  const expresiones = {
    usuario: /^[a-zA-Z0-9_-]{4,16}$/, // Letras, numeros, guion y guion_bajo
    nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    password: /^.{4,12}$/, // 4 a 12 digitos.
    correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    telefono: /^\d{7,14}$/, // 7 a 14 numeros.
  };

  // const validarPassword2 = () => {
  //   if (password.campo.length > 0) {
  //     if (password.campo !== password2.campo) {
  //       setPassword2((prevState) => {
  //         return { ...prevState, valido: "false" };
  //       });
  //     } else {
  //       setPassword2((prevState) => {
  //         return { ...prevState, valido: "true" };
  //       });
  //     }
  //   }
  // };

  const onSubmit = (event) => {
    event.preventDefault();
    const active = 1;
    if (usuario.valido === "true" && contraseña.valido === "true" && terminos) {
      axios
        .post("http://localhost:5000/api/usuarios/create", {
          usuario: usuario.campo,
          contraseña: contraseña.campo,
          email: email.campo,
          active,
        })
        .then((response) => console.log(response));
      setFormValid(true);
      setUsuario({ campo: "", valido: null });
      setContraseña({ campo: "", valido: null });
      setEmail({ campo: "", valido: null });
    } else {
      setFormValid(false);
    }
  };
  return (
    <>
      <Topbar />
      <div className="wrapper">
        <h1>Personal </h1>
        <Formulario onSubmit={onSubmit}>
          <ComponentInput
            state={usuario} //value
            setState={setUsuario} //onChange
            title="Usuario"
            type="text"
            name="usuario"
            placeholder="jean123"
            error="El usuario tiene que ser de 4 a 16 digitos y solo puede contener numero letras "
            expresion={expresiones.usuario}
          />
          <ComponentInput
            state={contraseña} //value
            setState={setContraseña} //onChange
            title="Contraseña"
            type="password"
            name="contraseña"
            placeholder="Contraseña"
            error="Error de Contraseña"
            expresion={expresiones.password}
          />
          <ComponentInput
            state={email} //value
            setState={setEmail} //onChange
            title="Email"
            type="email"
            name="email"
            placeholder="jean@hotmail.com"
            error="Error de Email"
            expresion={expresiones.correo}
          />
          <ContenedorTerminos>
            <Label>
              <input
                type="checkbox"
                name="terminos"
                id="terminos"
                checked={terminos}
                onChange={(e) => setTerminos(e.target.checked)}
              />
              Acepto los Terminos y Condiciones
            </Label>
          </ContenedorTerminos>
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
            {formValid === true && (
              <MensajeExito>Formulario enviado exitosamente!</MensajeExito>
            )}
          </ContenedorBotonCentrado>
        </Formulario>
      </div>
    </>
  );
};

export default PersonalView;
