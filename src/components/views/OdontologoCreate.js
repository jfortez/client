import React, { useEffect, useState } from "react";
import Topbar from "../layouts/topbar/Topbar";
import useValues from "../../provider/useValues";
import { Link, useLocation, useParams } from "react-router-dom";
import {
  Formulario,
  ContenedorBotonCentrado,
  Boton,
  MensajeError,
} from "../../elements/Formularios";
import { Error } from "@material-ui/icons";
import ComponentInput from "../layouts/forms/ComponentInput";
import services from "../../services/odontologos";

const OdontologoCreate = () => {
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
  const [email, setEmail] = useState({ campo: "", valido: null });
  const [formValid, setFormValid] = useState(null);
  const expresiones = {
    nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    telefono: /^\d{7,14}$/, // 7 a 14 numeros.
    numero: /^\d{5,14}$/, // 7 a 14 numeros.
    fecha: /^\d{4}-\d{2}-\d{2}$/,
  };
  const { id } = useParams();
  const { pathname } = useLocation();
  useEffect(() => {
    if (pathname === `/dashboard/odontologos/${id}/edit`) {
      setIsEditing(true);
      const getOdontologoById = async () => {
        const odontologo = await services.getOdontologosById(id);
        const {
          id_Odontologo,
          nombres,
          apellidos,
          cedula,
          telefono,
          direccion,
          ciudad,
          fecha_nacimiento,
          email,
        } = odontologo[0];
        setElementId(id_Odontologo);
        setNombres({ campo: nombres, valido: null });
        setApellidos({ campo: apellidos, valido: null });
        setCedula({ campo: cedula, valido: null });
        setTelefono({ campo: telefono, valido: null });
        setDireccion({ campo: direccion, valido: null });
        setCiudad({ campo: ciudad, valido: null });
        setFecha_nacimiento({ campo: fecha_nacimiento, valido: null });
        setEmail({ campo: email, valido: null });
      };
      getOdontologoById();
    }
  }, [id, pathname]);
  const handleUpdate = async (evt) => {
    evt.preventDefault();
    const updateData = {
      cedula: cedula.campo,
      nombres: nombres.campo,
      apellidos: apellidos.campo,
      telefono: telefono.campo,
      direccion: direccion.campo,
      ciudad: ciudad.campo,
      fecha_nacimiento: fecha_nacimiento.campo,
      email: email.campo,
      // active: active.campo,
    };
    await services.updateOdontologo(updateData, elementId);
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
      email.valido === "true"
    ) {
      const newOdontologo = {
        nombres: nombres.campo,
        apellidos: apellidos.campo,
        cedula: cedula.campo,
        telefono: telefono.campo,
        direccion: direccion.campo,
        ciudad: ciudad.campo,
        fecha_nacimiento: fecha_nacimiento.campo,
        email: email.campo,
      };
      await services.createOdontologo(newOdontologo);
      setFormValid(true);
      setNombres({ campo: "", valido: null });
      setApellidos({ campo: "", valido: null });
      setCedula({ campo: "", valido: null });
      setTelefono({ campo: "", valido: null });
      setDireccion({ campo: "", valido: null });
      setCiudad({ campo: "", valido: null });
      setFecha_nacimiento({ campo: "", valido: null });
      setEmail({ campo: "", valido: null });
    } else {
      setFormValid(false);
    }
  };
  return (
    <>
      <Topbar />
      <div className={`wrapper ${isCollapsed ? "sidebar-collapsed" : ""}`}>
        {isEditing ? <h1>Editar Odontologo</h1> : <h1>Nuevo Odontologo</h1>}
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/dashboard">Home</Link>
              </li>
              <li>
                <Link to="/dashboard/odontologos">Odontologos</Link>
              </li>
              <li>{isEditing ? <b>Editar Odontologo</b> : <b>Nuevo Odontologo</b>}</li>
            </ul>
          </nav>
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
            {isEditing ? (
              <Boton type="submit">Actualizar</Boton>
            ) : (
              <Boton type="submit">Crear</Boton>
            )}
          </ContenedorBotonCentrado>
        </Formulario>
      </div>
    </>
  );
};

export default OdontologoCreate;
