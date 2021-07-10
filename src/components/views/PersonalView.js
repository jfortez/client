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

const PersonalView = () => {
  const [usuario, setUsuario] = useState({ campo: "", valido: null });
  const [nombre, setNombre] = useState({ campo: "", valido: null });
  const [password, setPassword] = useState({ campo: "", valido: null });
  const [password2, setPassword2] = useState({ campo: "", valido: null });
  const [correo, setCorreo] = useState({ campo: "", valido: null });
  const [telefono, setTelefono] = useState({ campo: "", valido: null });
  const [terminos, setTerminos] = useState(false);
  const [formValid, setFormValid] = useState(null);
  const expresiones = {
    usuario: /^[a-zA-Z0-9_-]{4,16}$/, // Letras, numeros, guion y guion_bajo
    nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    password: /^.{4,12}$/, // 4 a 12 digitos.
    correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    telefono: /^\d{7,14}$/, // 7 a 14 numeros.
  };

  const validarPassword2 = () => {
    if (password.campo.length > 0) {
      if (password.campo !== password2.campo) {
        setPassword2((prevState) => {
          return { ...prevState, valido: "false" };
        });
      } else {
        setPassword2((prevState) => {
          return { ...prevState, valido: "true" };
        });
      }
    }
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (
      usuario.valido === "true" &&
      nombre.valido === "true" &&
      password.valido === "true" &&
      password2.valido === "true" &&
      correo.valido === "true" &&
      telefono.valido === "true" &&
      terminos
    ) {
      setFormValid(true);
      setUsuario({ campo: "", valido: null });
      setNombre({ campo: "", valido: null });
      setPassword({ campo: "", valido: null });
      setPassword2({ campo: "", valido: null });
      setCorreo({ campo: "", valido: null });
      setTelefono({ campo: "", valido: null });
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
            state={usuario}
            setState={setUsuario}
            title="Usuario"
            type="text"
            name="usuario"
            placeholder="jean123"
            error="El usuario tiene que ser de 4 a 16 digitos y solo puede contener numero letras "
            expresion={expresiones.usuario}
          />
          <ComponentInput
            state={nombre}
            setState={setNombre}
            title="Nombre"
            type="text"
            name="nombre"
            placeholder="Jean Caiza"
            error="error nombre "
            expresion={expresiones.nombre}
          />
          <ComponentInput
            state={password}
            setState={setPassword}
            title="Password"
            type="password"
            name="password"
            placeholder="contraseña"
            error="error contraseña "
            expresion={expresiones.password}
            // function={validarPassword2}
          />
          <ComponentInput
            state={password2}
            setState={setPassword2}
            title="Confirmar Password"
            type="password"
            name="password2"
            placeholder="Confirmar Contraseña"
            error="error contraseña2 "
            expresion={expresiones.password}
            function={validarPassword2}
          />
          <ComponentInput
            state={correo}
            setState={setCorreo}
            title="Correo"
            type="email"
            name="correo"
            placeholder="john@hotmail.com"
            error="Error al correo "
            expresion={expresiones.correo}
          />
          <ComponentInput
            state={telefono}
            setState={setTelefono}
            title="Telefono"
            type="text"
            name="telefono"
            placeholder="099899"
            error="Error al telefono "
            expresion={expresiones.telefono}
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
        {/* <form action="">
          <div>
            <label htmlFor="">nombres</label>
            <input type="text" name="nombres" placeholder="Ej: Darío Daniel" />
          </div>
          <div>
            <label htmlFor="">apellidos</label>
            <input
              type="text"
              name="apellidos"
              placeholder="Ej: Pacherrez Herrera"
            />
          </div>
          <div>
            <label htmlFor="">telefono</label>
            <input type="text" name="telefono" placeholder="Ej: 09*******1" />
          </div>
          <div>
            <label htmlFor="">dirección</label>
            <input
              type="text"
              name="direccion"
              placeholder="Ej: Av. Aurelios"
            />
          </div>
          <div>
            <label htmlFor="">ciudad</label>
            <input type="text" name="ciudad" placeholder="Ej: Guayaquil" />
          </div>
          <div>
            <label htmlFor="">email</label>
            <input type="text" name="email" placeholder="Ej: Av. Aurelios" />
          </div>
          <div>
            <label htmlFor="">fecha de nacimiento</label>
            <input
              type="text"
              name="fecha_nac"
              placeholder="Ej: Av. Aurelios"
            />
          </div>
          <div>
            <label htmlFor="">edad</label>
            <input type="text" name="edad" placeholder="Ej: Av. Aurelios" />
          </div>
          <div>
            <label htmlFor="">tipo documento</label>
            <input type="text" name="tipo_doc" placeholder="Ej: Av. Aurelios" />
          </div>
          <div>
            <label htmlFor="">numero de documento</label>
            <input
              type="text"
              name="num_documento"
              placeholder="Ej: Av. Aurelios"
            />
          </div>
          <div>
            <label htmlFor="">dirección</label>
            <input
              type="text"
              name="direccion"
              placeholder="Ej: Av. Aurelios"
            />
          </div>
          <div>
            <label htmlFor="">activo</label>
            <input type="text" name="active" placeholder="Ej: Av. Aurelios" />
          </div>
          <button onClick={(props) => handleSubmit(props)}> Enviar</button>
        </form> */}
      </div>
    </>
  );
};

export default PersonalView;
