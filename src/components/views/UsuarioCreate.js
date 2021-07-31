import React, { useState } from "react";
import Topbar from "../layouts/topbar/Topbar";
import useValues from "../../provider/useValues";
import services from "../../services/usuarios";
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
import { Error } from "@material-ui/icons";
import ComponentInput from "../layouts/forms/ComponentInput";
import { Link } from "react-router-dom";

const UsuarioCreate = () => {
  const { isCollapsed } = useValues();
  const [usuario, setUsuario] = useState({ campo: "", valido: null });
  const [contraseña, setContraseña] = useState({ campo: "", valido: null });
  const [previlegios, setPrevilegios] = useState({ campo: "", valido: null });
  const [formValid, setFormValid] = useState(null);
  const expresiones = {
    usuario: /^[a-zA-Z0-9_-]{4,16}$/, // Letras, numeros, guion y guion_bajo
    password: /^.{4,12}$/, // 4 a 12 digitos.
    nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    telefono: /^\d{7,14}$/, // 7 a 14 numeros.
    numero: /^\d{5,15}$/, // 7 a 14 numeros.
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    if (usuario.valido === "true" && contraseña.valido === "true" && previlegios.campo > 0) {
      const newUsuario = {
        usuario: usuario.campo,
        contraseña: contraseña.campo,
        previlegios: previlegios.campo,
      };
      await services.createUsuarios(newUsuario);
      setFormValid(true);
      setUsuario({ campo: "", valido: null });
      setContraseña({ campo: "", valido: null });
      setPrevilegios({ campo: "", valido: null });
    } else {
      setFormValid(false);
    }
  };
  return (
    <>
      <Topbar />
      <div className={`wrapper ${isCollapsed ? "sidebar-collapsed" : ""}`}>
        <h1>Nuevo Usuario</h1>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/dashboard">Home</Link>
              </li>
              <li>
                <Link to="/dashboard/Usuarios">Usuarios</Link>
              </li>
              <li>
                <b>Nuevo Usuario</b>
              </li>
            </ul>
          </nav>
          <Formulario onSubmit={onSubmit}>
            <ComponentInput
              state={usuario} //value
              setState={setUsuario} //onChange
              title="Usuario"
              type="text"
              name="usuario"
              placeholder="Usuario"
              error="El campo está incompleto"
              expresion={expresiones.usuario}
            />
            <ComponentInput
              state={contraseña} //value
              setState={setContraseña} //onChange
              title="Contraseña"
              type="text"
              name="contraseña"
              placeholder="Contraseña"
              error="El campo está incompleto"
              expresion={expresiones.password}
            />
            <GrupoInput>
              <Label>Previlegios</Label>
              <Select
                value={previlegios.campo}
                onChange={(e) => setPrevilegios({ campo: e.target.value })}
              >
                <Option value="0">Seleccione</Option>
                <Option value="1">Super Admin</Option>
                <Option value="2">Admin</Option>
                <Option value="3">Básico</Option>
              </Select>
              <br />
            </GrupoInput>
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
              <Boton type="submit">Crear</Boton>
            </ContenedorBotonCentrado>
          </Formulario>
        </div>
      </div>
    </>
  );
};

export default UsuarioCreate;
