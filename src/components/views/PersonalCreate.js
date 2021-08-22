import React, { useState, useEffect } from "react";
import "./DashboardView.css";
import Topbar from "../layouts/topbar/Topbar";
import useValues from "../../provider/useValues";
import { Formulario, GrupoInput, Select, Option, Label } from "../../elements/Formularios";
import expresiones from "../../utils/Expresiones";
import ComponentInput from "../layouts/forms/ComponentInput";
import services from "../../services/personal";
import cargoServices from "../../services/cargo";
import { Link, useLocation, useParams } from "react-router-dom";
import { Icon } from "@material-ui/core";
import { Save, SystemUpdateAlt } from "@material-ui/icons";
//Notificaciones
import notificacion from "../../utils/Notificaciones";

const PersonalCreate = () => {
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
  const [idCargo, setIdCargo] = useState({ campo: "", valido: null });
  // const [active, setActive] = useState({ campo: "", valido: null });
  const [cargo, setCargo] = useState([]);
  const listCargos = async () => {
    const cargos = await cargoServices.optionCargo();
    setCargo(cargos);
  };
  const { id } = useParams();
  const { pathname } = useLocation();
  useEffect(() => {
    if (pathname === `/dashboard/personal/${id}/edit`) {
      setIsEditing(true);
      const getPersonalById = async () => {
        const personal = await services.getPersonalById(id);
        const {
          id_Personal,
          nombres,
          apellidos,
          cedula,
          telefono,
          direccion,
          ciudad,
          fecha_nacimiento,
          email,
          id_Cargo,
        } = personal[0];
        setElementId(id_Personal);
        setNombres({ campo: nombres, valido: null });
        setApellidos({ campo: apellidos, valido: null });
        setCedula({ campo: cedula, valido: null });
        setTelefono({ campo: telefono, valido: null });
        setDireccion({ campo: direccion, valido: null });
        setCiudad({ campo: ciudad, valido: null });
        setFecha_nacimiento({ campo: fecha_nacimiento, valido: null });
        setEmail({ campo: email, valido: null });
        setIdCargo({ campo: id_Cargo, valido: null });
      };
      getPersonalById();
    }
  }, [id, pathname]);
  useEffect(() => {
    listCargos();
  }, []);
  const handleUpdate = async (evt) => {
    evt.preventDefault();
    const updatePersonal = {
      cedula: cedula.campo,
      nombres: nombres.campo,
      apellidos: apellidos.campo,
      telefono: telefono.campo,
      direccion: direccion.campo,
      ciudad: ciudad.campo,
      fecha_nacimiento: fecha_nacimiento.campo,
      email: email.campo,
      id_Cargo: idCargo.campo,
      // active: active.campo,
    };
    await services.updatePersonal(updatePersonal, elementId);
    notificacion("Actualizar Personal", "Se ha actualizado Personal satisfatoriamente", "info");
    setNombres({ ...nombres, valido: null });
    setApellidos({ ...apellidos, valido: null });
    setCedula({ ...cedula, valido: null });
    setTelefono({ ...telefono, valido: null });
    setDireccion({ ...direccion, valido: null });
    setCiudad({ ...ciudad, valido: null });
    setFecha_nacimiento({ ...fecha_nacimiento, valido: null });
    setEmail({ ...email, valido: null });
    setIdCargo({ ...idCargo, valido: null });
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    if (
      nombres.valido === "true" &&
      apellidos.valido === "true" &&
      cedula.valido === "true" &&
      direccion.valido === "true" &&
      ciudad.valido === "true" &&
      idCargo.campo > 0
    ) {
      const newPersonal = {
        nombres: nombres.campo,
        apellidos: apellidos.campo,
        cedula: cedula.campo,
        telefono: telefono.campo,
        direccion: direccion.campo,
        ciudad: ciudad.campo,
        fecha_nacimiento: fecha_nacimiento.campo,
        email: email.campo,
        id_Cargo: idCargo.campo,
      };
      const nuevoPersonal = await services.createPersonal(newPersonal);
      if (
        nuevoPersonal.message === "cedula ya existe" &&
        nuevoPersonal.cedulaExiste[0].active === 0
      ) {
        await services.updatePersonal(newPersonal, nuevoPersonal.cedulaExiste[0].id_Personal);
      }
      if (
        nuevoPersonal.message === "cedula ya existe" &&
        nuevoPersonal.cedulaExiste[0].active === 1
      ) {
        return notificacion(
          "Error, Item Duplicado",
          "El Item que intenta crear ya existe, no es posiblie duplicar",
          "danger"
        );
      }
      if (nuevoPersonal.message === "Dato ya existe") {
        return notificacion(
          "Error, Personal Ya Existe",
          "El Item que intenta crear ya se encuentra registrado",
          "danger"
        );
      }
      notificacion("Añadir Personal", "Se ha añadido personal Satisfatoriamente", "success");
      setNombres({ campo: "", valido: null });
      setApellidos({ campo: "", valido: null });
      setCedula({ campo: "", valido: null });
      setTelefono({ campo: "", valido: null });
      setDireccion({ campo: "", valido: null });
      setCiudad({ campo: "", valido: null });
      setFecha_nacimiento({ campo: "", valido: null });
      setEmail({ campo: "", valido: null });
      setIdCargo({ campo: "", valido: null });
    } else {
      notificacion("Añadir Personal", "Debe rellenar los campos para proceder a crear", "warning");
    }
  };

  return (
    <>
      <Topbar />
      <div className={`wrapper ${isCollapsed ? "sidebar-collapsed" : ""}`}>
        <h3 className="titulo">{isEditing ? "Editar Personal" : "Nuevo Personal"}</h3>
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
                <Link to="/dashboard/personal" className="navegacion__redirect">
                  Personal
                </Link>
              </li>
              <li> / </li>
              <li>
                <b>{isEditing ? "Editar Personal" : "Nuevo Personal"}</b>
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
            state={cedula} //value
            setState={setCedula} //onChange
            title="Cédula"
            type="text"
            name="cedula"
            placeholder="Cedula"
            error="el campo es obligatorio"
            expresion={expresiones.ruc}
          />
          <ComponentInput
            state={telefono} //value
            setState={setTelefono} //onChange
            title="Telefono"
            type="text"
            name="telefono"
            placeholder="Telefono"
            error="el campo es obligatorio"
            expresion={expresiones.telefono}
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
          />
          <GrupoInput>
            <Label>Cargo</Label>
            <Select
              value={idCargo.campo}
              name="id_Cargo"
              onChange={(e) => setIdCargo({ campo: e.target.value })}
            >
              <Option value="0">Seleccione</Option>
              {cargo.map((item) => {
                return (
                  <Option value={item.id} key={item.id}>
                    {item.nombre}
                  </Option>
                );
              })}
            </Select>
          </GrupoInput>
        </Formulario>
      </div>
    </>
  );
};

export default PersonalCreate;
