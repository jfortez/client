import React, { useEffect, useState } from "react";
import Topbar from "../layouts/topbar/Topbar";
import useValues from "../../provider/useValues";
import { Link, useLocation, useParams } from "react-router-dom";
import expresiones from "../../utils/Expresiones";
import { Formulario } from "../../elements/Formularios";
import ComponentInput from "../layouts/forms/ComponentInput";
import services from "../../services/odontologos";
import { Icon } from "@material-ui/core";
import { Save, SystemUpdateAlt } from "@material-ui/icons";
import notificacion from "../../utils/Notificaciones";

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
    };
    await services.updateOdontologo(updateData, elementId);
    notificacion("Actualizar Odontologo", "Se ha actualizado Odontologo satisfatoriamente", "info");
    setNombres({ ...nombres, valido: null });
    setApellidos({ ...apellidos, valido: null });
    setCedula({ ...cedula, valido: null });
    setTelefono({ ...telefono, valido: null });
    setDireccion({ ...direccion, valido: null });
    setCiudad({ ...ciudad, valido: null });
    setFecha_nacimiento({ ...fecha_nacimiento, valido: null });
    setEmail({ ...email, valido: null });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    if (
      nombres.valido === "true" &&
      apellidos.valido === "true" &&
      cedula.valido === "true" &&
      direccion.valido === "true" &&
      ciudad.valido === "true"
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
      const nuevoOdontologo = await services.createOdontologo(newOdontologo);
      if (
        nuevoOdontologo.message === "cedula ya existe" &&
        nuevoOdontologo.cedulaExiste[0].active === 0
      ) {
        await services.updateOdontologo(
          newOdontologo,
          nuevoOdontologo.cedulaExiste[0].id_Odontologo
        );
      }
      if (
        nuevoOdontologo.message === "cedula ya existe" &&
        nuevoOdontologo.cedulaExiste[0].active === 1
      ) {
        return console.log("El dato ya existe"); //codigo para la alerta
      }
      if (nuevoOdontologo.message === "Dato ya existe") {
        return console.log("El dato ya existe en la base de datos global");
      }
      notificacion("Añadir Odontologo", "Se ha creado Odontologo satisfatoriamente", "success");
      setNombres({ campo: "", valido: null });
      setApellidos({ campo: "", valido: null });
      setCedula({ campo: "", valido: null });
      setTelefono({ campo: "", valido: null });
      setDireccion({ campo: "", valido: null });
      setCiudad({ campo: "", valido: null });
      setFecha_nacimiento({ campo: "", valido: null });
      setEmail({ campo: "", valido: null });
    } else {
      notificacion("Añadir Odontologo", "Debe rellenar los campos para proceder", "warning");
    }
  };
  return (
    <>
      <Topbar />
      <div className={`wrapper ${isCollapsed ? "sidebar-collapsed" : ""}`}>
        <h3 className="titulo">{isEditing ? "Editar Odontólogo" : "Nuevo Odontólogo"}</h3>
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
                <Link to="/dashboard/odontologos" className="navegacion__redirect">
                  Odontólogos
                </Link>
              </li>
              <li> / </li>
              <li>
                <b>{isEditing ? "Editar Odontólogo" : "Nuevo Odontólogo"}</b>
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
            state={email} //value
            setState={setEmail} //onChange
            title="Correo"
            type="text"
            name="email"
            placeholder="Correo"
          />
        </Formulario>
      </div>
    </>
  );
};

export default OdontologoCreate;
