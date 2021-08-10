import React, { useEffect, useState } from "react";
import Topbar from "../layouts/topbar/Topbar";
import useValues from "../../provider/useValues";
import { Link, useLocation, useParams } from "react-router-dom";
import services from "../../services/proveedores";
import expresiones from "../../utils/Expresiones";
import {
  Formulario,
  ContenedorBotonCentrado,
  Boton,
  MensajeError,
} from "../../elements/Formularios";
import { Error } from "@material-ui/icons";
import ComponentInput from "../layouts/forms/ComponentInput";

const ProveedoresCreate = () => {
  const { isCollapsed } = useValues();
  const [elementId, setElementId] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [formValid, setFormValid] = useState(null);
  const [ruc, setRuc] = useState({ campo: "", valido: null });
  const [nombre, setNombre] = useState({ campo: "", valido: null });
  const [direccion, setDireccion] = useState({ campo: "", valido: null });
  const [ciudad, setCiudad] = useState({ campo: "", valido: null });
  const [telefono, setTelefono] = useState({ campo: "", valido: null });
  const [email, setEmail] = useState({ campo: "", valido: null });
  const { id } = useParams();
  const idProv = id;
  const { pathname } = useLocation();
  useEffect(() => {
    if (pathname === `/dashboard/proveedores/${idProv}/edit`) {
      setIsEditing(true);
      const getProveedoresById = async () => {
        const proveedores = await services.getProveedoresbyId(idProv);
        const { id, ruc, nombre, direccion, ciudad, telefono, email } = proveedores[0];
        setElementId(id);
        setRuc({ campo: ruc, valido: null });
        setNombre({ campo: nombre, valido: null });
        setTelefono({ campo: telefono, valido: null });
        setDireccion({ campo: direccion, valido: null });
        setCiudad({ campo: ciudad, valido: null });
        setEmail({ campo: email, valido: null });
      };
      getProveedoresById();
    }
  }, [idProv, pathname]);
  const onSubmit = async (event) => {
    event.preventDefault();
    if (
      ruc.valido === "true" &&
      nombre.valido === "true" &&
      direccion.valido === "true" &&
      ciudad.valido === "true"
    ) {
      const newItem = {
        ruc: ruc.campo,
        nombre: nombre.campo,
        telefono: telefono.campo,
        direccion: direccion.campo,
        ciudad: ciudad.campo,
        email: email.campo,
      };
      const nuevo = await services.createProveedores(newItem);
      if (nuevo.message === "el ruc ya existe" && nuevo.rucExiste[0].active === 0) {
        await services.updateProveedor(newItem, nuevo.rucExiste[0].id);
      }
      if (nuevo.message === "el ruc ya existe" && nuevo.rucExiste[0].active === 1) {
        return console.log("ruc ya existe"); //codigo para la alerta
      }
      setFormValid(true);
      setRuc({ campo: "", valido: null });
      setNombre({ campo: "", valido: null });
      setTelefono({ campo: "", valido: null });
      setDireccion({ campo: "", valido: null });
      setCiudad({ campo: "", valido: null });
      setEmail({ campo: "", valido: null });
    } else {
      setFormValid(false);
    }
  };
  const handleUpdate = async (evt) => {
    evt.preventDefault();
    const updateData = {
      ruc: ruc.campo,
      nombre: nombre.campo,
      telefono: telefono.campo,
      direccion: direccion.campo,
      ciudad: ciudad.campo,
      email: email.campo,
    };
    await services.updateProveedor(updateData, elementId);
    setRuc({ ...ruc, valido: null });
    setNombre({ ...nombre, valido: null });
    setTelefono({ ...telefono, valido: null });
    setDireccion({ ...direccion, valido: null });
    setCiudad({ ...ciudad, valido: null });
    setEmail({ ...email, valido: null });
  };
  return (
    <>
      <Topbar />
      <div className={`wrapper ${isCollapsed ? "sidebar-collapsed" : ""}`}>
        {isEditing ? <h1>Editar Proveedor</h1> : <h1>Nuevo Proveedor</h1>}

        <div>
          <nav>
            <ul>
              <li>
                <Link to="/dashboard">Home</Link>
              </li>
              <li>
                <Link to="/dashboard/proveedores">Proveedores</Link>
              </li>
              <li>{isEditing ? <b>Editar Proveedor</b> : <b>Nuevo Proveedor</b>}</li>
            </ul>
          </nav>
        </div>
        <Formulario onSubmit={isEditing ? handleUpdate : onSubmit}>
          <ComponentInput
            state={ruc} //value
            setState={setRuc} //onChange
            title="RUC"
            type="text"
            name="ruc"
            placeholder="RUC"
            error="la longitud de numeros debe ser de 13"
            expresion={expresiones.ruc}
          />
          <ComponentInput
            state={nombre} //value
            setState={setNombre} //onChange
            title="Nombre"
            type="text"
            name="nombre"
            placeholder="Nombre"
            error="El campo está incompleto"
            expresion={expresiones.compañia}
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
          <br />
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

export default ProveedoresCreate;
