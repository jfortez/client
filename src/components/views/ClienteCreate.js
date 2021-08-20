import React, { useEffect, useState } from "react";
import Topbar from "../layouts/topbar/Topbar";
import useValues from "../../provider/useValues";
import services from "../../services/cliente";
import expresiones from "../../utils/Expresiones";
import { Formulario } from "../../elements/Formularios";
import ComponentInput from "../layouts/forms/ComponentInput";
import { Link, useLocation, useParams } from "react-router-dom";
import { Icon } from "@material-ui/core";
import { Save, SystemUpdateAlt } from "@material-ui/icons";

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
        <h3 className="titulo">{isEditing ? "Editar Cliente" : "Nuevo Cliente"}</h3>
        {formValid ? "ok" : "nom"}
        <div>
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
                  <Link to="/dashboard/clientes" className="navegacion__redirect">
                    Clientes
                  </Link>
                </li>
                <li> / </li>
                <li>
                  <b>{isEditing ? "Editar Cliente" : "Nuevo Cliente"}</b>
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
      </div>
    </>
  );
};

export default ClienteCreate;
