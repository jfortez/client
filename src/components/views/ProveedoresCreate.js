import React, { useEffect, useState } from "react";
import Topbar from "../layouts/topbar/Topbar";
import useValues from "../../provider/useValues";
import { Link, useLocation, useParams } from "react-router-dom";
import services from "../../services/proveedores";
import expresiones from "../../utils/Expresiones";
import { Formulario } from "../../elements/Formularios";
import ComponentInput from "../layouts/forms/ComponentInput";
import { Icon } from "@material-ui/core";
import { Save, SystemUpdateAlt } from "@material-ui/icons";
import notificacion from "../../utils/Notificaciones";

const ProveedoresCreate = () => {
  const { isCollapsed } = useValues();
  const [elementId, setElementId] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
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
        return notificacion(
          "Error, Item Duplicado",
          "El Item que intenta crear ya existe, no es posiblie duplicar",
          "danger"
        );
      }
      notificacion("Añadir Proveedor", "Se ha creado Proveedor satisfatoriamente", "success");
      setRuc({ campo: "", valido: null });
      setNombre({ campo: "", valido: null });
      setTelefono({ campo: "", valido: null });
      setDireccion({ campo: "", valido: null });
      setCiudad({ campo: "", valido: null });
      setEmail({ campo: "", valido: null });
    } else {
      notificacion("Añadir Proveedor", "Debe rellenar los campos para proceder", "warning");
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
    notificacion("Actualizar Proveedor", "Se ha actualizado Proveedor satisfatoriamente", "info");

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
        <h3 className="titulo">{isEditing ? "Editar Proveedor" : "Nuevo Proveedor"}</h3>
        <div className="navegacion">
          <nav>
            <ul>
              <li>
                <Link to="/dashboard" className="navegacion__redirect">
                  Inicio
                </Link>
              </li>
              <li> / </li>
              <li>
                <Link to="/dashboard/proveedores" className="navegacion__redirect">
                  Proveedores
                </Link>
              </li>
              <li> / </li>
              <li>
                <b>{isEditing ? "Editar Proveedor" : "Nuevo Proveedor"}</b>
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
        </Formulario>
      </div>
    </>
  );
};

export default ProveedoresCreate;
