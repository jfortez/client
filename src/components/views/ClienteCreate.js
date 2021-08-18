import React, { useEffect, useState } from "react";
import Topbar from "../layouts/topbar/Topbar";
import useValues from "../../provider/useValues";
import services from "../../services/cliente";
import expresiones from "../../utils/Expresiones";
import {
  Formulario,
  ContenedorBotonCentrado,
  Boton,
  MensajeError,
} from "../../elements/Formularios";
import { Error } from "@material-ui/icons";
import ComponentInput from "../layouts/forms/ComponentInput";
import { Link, useLocation, useParams } from "react-router-dom";

const ClienteCreate = () => {
  const { isCollapsed } = useValues();
  const [elementId, setElementId] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [ruc, setRuc] = useState({ campo: "", valido: null });
  const [nombres, setNombres] = useState({ campo: "", valido: null });
  const [apellidos, setApellidos] = useState({ campo: "", valido: null });
  const [telefono, setTelefono] = useState({ campo: "", valido: null });
  const [direccion, setDireccion] = useState({ campo: "", valido: null });
  const [ciudad, setCiudad] = useState({ campo: "", valido: null });
  const [email, setEmail] = useState({ campo: "", valido: null });
  const [formValid, setFormValid] = useState(null);
  const { id } = useParams();
  const idCliente = id;
  const { pathname } = useLocation();
  useEffect(() => {
    if (pathname === `/dashboard/clientes/${idCliente}/edit`) {
      setIsEditing(true);
      const getClienteById = async () => {
        const cliente = await services.getClienteById(idCliente);
        const { id, ruc, nombres, apellidos, telefono, direccion, ciudad, email } = cliente[0];
        setElementId(id);
        setRuc({ campo: ruc, valido: null });
        setNombres({ campo: nombres, valido: null });
        setApellidos({ campo: apellidos, valido: null });
        setTelefono({ campo: telefono, valido: null });
        setDireccion({ campo: direccion, valido: null });
        setCiudad({ campo: ciudad, valido: null });
        setEmail({ campo: email, valido: null });
      };
      getClienteById();
    }
  }, [idCliente, pathname]);
  const handleUpdate = async (evt) => {
    evt.preventDefault();
    const updateCliente = {
      ruc: ruc.campo,
      nombres: nombres.campo,
      apellidos: apellidos.campo,
      email: email.campo,
      telefono: telefono.campo,
      direccion: direccion.campo,
      ciudad: ciudad.campo,
    };
    await services.updateCliente(updateCliente, elementId);
    setRuc({ ...ruc, valido: null });
    setNombres({ ...nombres, valido: null });
    setApellidos({ ...apellidos, valido: null });
    setTelefono({ ...telefono, valido: null });
    setDireccion({ ...direccion, valido: null });
    setCiudad({ ...ciudad, valido: null });
    setEmail({ ...email, valido: null });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    if (
      ruc.valido === "true" &&
      nombres.valido === "true" &&
      apellidos.valido === "true" &&
      direccion.valido === "true" &&
      ciudad.valido === "true"
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
      const nuevo = await services.createCliente(newCliente);
      if (nuevo.message === "el ruc ya existe" && nuevo.response[0].active === 0) {
        await services.updateCliente(newCliente, nuevo.response[0].id);
      }
      if (nuevo.message === "el ruc ya existe" && nuevo.response[0].active === 1) {
        return console.log("ruc ya existe"); //codigo para la alerta
      }
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
        {isEditing ? <h1>Editar Cliente</h1> : <h1>Nuevo Cliente</h1>}
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/dashboard">Home</Link>
              </li>
              <li>
                <Link to="/dashboard/clientes">Clientes</Link>
              </li>
              <li>{isEditing ? <b>Editar Cliente</b> : <b>Nuevo Cliente</b>}</li>
            </ul>
          </nav>
          <Formulario onSubmit={isEditing ? handleUpdate : onSubmit}>
            <ComponentInput
              state={ruc} //value
              setState={setRuc} //onChange
              title="RUC"
              type="text"
              name="ruc"
              placeholder="RUC"
              error="el campo es obligatorio"
              expresion={expresiones.ruc}
            />
            <ComponentInput
              state={nombres} //value
              setState={setNombres} //onChange
              title="Nombres"
              type="text"
              name="nombres"
              placeholder="Nombres"
              error="el campo es obligatorio"
              expresion={expresiones.nombre}
            />
            <ComponentInput
              state={apellidos} //value
              setState={setApellidos} //onChange
              title="Apellidos"
              type="text"
              name="apellidos"
              placeholder="Apellidos"
              error="el campo es obligatorio"
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
            />
            <ComponentInput
              state={direccion} //value
              setState={setDireccion} //onChange
              title="Dirección"
              type="text"
              name="direccion"
              placeholder="Dirección"
              error="el campo es obligatorio"
              expresion={expresiones.direccion}
            />
            <ComponentInput
              state={ciudad} //value
              setState={setCiudad} //onChange
              title="Ciudad"
              type="text"
              name="ciudad"
              placeholder="Ciudad"
              error="el campo es obligatorio"
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
              {isEditing ? (
                <Boton type="submit">Actualizar</Boton>
              ) : (
                <Boton type="submit">Crear</Boton>
              )}
            </ContenedorBotonCentrado>
          </Formulario>
        </div>
      </div>
    </>
  );
};

export default ClienteCreate;
