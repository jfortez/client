import React, { useState } from "react";
import Topbar from "../layouts/topbar/Topbar";
import useValues from "../../provider/useValues";
import services from "../../services/cliente";
import {
  Formulario,
  ContenedorBotonCentrado,
  Boton,
  MensajeError,
} from "../../elements/Formularios";
import { Error } from "@material-ui/icons";
import ComponentInput from "../layouts/forms/ComponentInput";
import { Link } from "react-router-dom";

const ClienteCreate = () => {
  const { isCollapsed } = useValues();
  const [ruc, setRuc] = useState({ campo: "", valido: null });
  const [nombres, setNombres] = useState({ campo: "", valido: null });
  const [apellidos, setApellidos] = useState({ campo: "", valido: null });
  const [telefono, setTelefono] = useState({ campo: "", valido: null });
  const [direccion, setDireccion] = useState({ campo: "", valido: null });
  const [ciudad, setCiudad] = useState({ campo: "", valido: null });
  const [email, setEmail] = useState({ campo: "", valido: null });
  const [formValid, setFormValid] = useState(null);
  const expresiones = {
    nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    telefono: /^\d{7,14}$/, // 7 a 14 numeros.
    numero: /^\d{5,15}$/, // 7 a 14 numeros.
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    if (
      ruc.valido === "true" &&
      nombres.valido === "true" &&
      apellidos.valido === "true" &&
      telefono.valido === "true" &&
      direccion.valido === "true" &&
      ciudad.valido === "true" &&
      email.valido === "true"
    ) {
      const newCliente = {
        ruc: ruc.campo,
        nombres: nombres.campo,
        apellidos: apellidos.campo,
        telefono: telefono.campo,
        direccion: direccion.campo,
        ciudad: ciudad.campo,
        email: email.campo,
      };
      await services.createCliente(newCliente);
      setFormValid(true);
      setRuc({ campo: "", valido: null });
      setNombres({ campo: "", valido: null });
      setApellidos({ campo: "", valido: null });
      setTelefono({ campo: "", valido: null });
      setDireccion({ campo: "", valido: null });
      setCiudad({ campo: "", valido: null });
      setEmail({ campo: "", valido: null });
    } else {
      setFormValid(false);
    }
  };
  return (
    <>
      <Topbar />
      <div className={`wrapper ${isCollapsed ? "sidebar-collapsed" : ""}`}>
        <h1>Nuevo Cliente</h1>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/dashboard">Home</Link>
              </li>
              <li>
                <Link to="/dashboard/clientes">Clientes</Link>
              </li>
              <li>
                <b>Nuevo Cliente</b>
              </li>
            </ul>
          </nav>
          <Formulario onSubmit={onSubmit}>
            <ComponentInput
              state={ruc} //value
              setState={setRuc} //onChange
              title="RUC"
              type="text"
              name="ruc"
              placeholder="RUC"
              error="la longitud de numeros debe ser de 15"
              expresion={expresiones.numero}
            />
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
              state={email} //value
              setState={setEmail} //onChange
              title="Correo"
              type="text"
              name="email"
              placeholder="Correo"
              error="el campo está incompleto"
              expresion={expresiones.correo}
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
              <Boton type="submit">Crear</Boton>
            </ContenedorBotonCentrado>
          </Formulario>
        </div>
      </div>
    </>
  );
};

export default ClienteCreate;
