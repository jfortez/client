import "./DashboardView.css";
import Topbar from "../layouts/topbar/Topbar";
import useValues from "../../provider/useValues";
import services from "../../services/servicios";
import expresiones from "../../utils/Expresiones";
import { Formulario } from "../../elements/Formularios";
import ComponentInput from "../layouts/forms/ComponentInput";
import { Link, useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Icon } from "@material-ui/core";
import { Save, SystemUpdateAlt } from "@material-ui/icons";
import notificacion from "../../utils/Notificaciones";

const ServiciosCreate = () => {
  const { isCollapsed } = useValues();
  const [elementId, setElementId] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [cod_servicio, setCod_servicio] = useState({ campo: "", valido: null });
  const [nombre, setNombre] = useState({ campo: "", valido: null });
  const [descripcion, setDescripcion] = useState({ campo: "", valido: null });
  const [precio, setPrecio] = useState({ campo: "", valido: null });
  const { id } = useParams();
  const idServ = id;
  const { pathname } = useLocation();
  useEffect(() => {
    if (pathname === `/dashboard/servicios/${idServ}/edit`) {
      setIsEditing(true);
      const getServiciosById = async () => {
        const servicio = await services.getServiciosById(idServ);
        const { id, cod_servicio, nombre, descripcion, precio } = servicio[0];
        setElementId(id);
        setCod_servicio({ campo: cod_servicio, valido: null });
        setNombre({ campo: nombre, valido: null });
        setDescripcion({ campo: descripcion, valido: null });
        setPrecio({ campo: precio, valido: null });
      };
      getServiciosById();
    }
  }, [idServ, pathname]);
  const onSubmit = async (event) => {
    event.preventDefault();
    if (cod_servicio.valido === "true" && nombre.valido === "true" && precio.valido === "true") {
      const newItem = {
        cod_servicio: cod_servicio.campo,
        nombre: nombre.campo,
        descripcion: descripcion.campo,
        precio: precio.campo,
      };
      const nuevo = await services.createServicios(newItem);
      if (nuevo.message === "el Servicio ya existe" && nuevo.codExiste[0].active === 0) {
        await services.updateServicios(newItem, nuevo.codExiste[0].id);
      }
      if (nuevo.message === "el Servicio ya existe" && nuevo.codExiste[0].active === 1) {
        return notificacion(
          "Error, Item Duplicado",
          "El Item que intenta crear ya existe, no es posiblie duplicar",
          "danger"
        );
      }
      notificacion("A??adir Servicio", "Se ha creado Servicio satisfatoriamente", "success");
      setCod_servicio({ campo: "", valido: null });
      setNombre({ campo: "", valido: null });
      setDescripcion({ campo: "", valido: null });
      setPrecio({ campo: "", valido: null });
    } else {
      notificacion("A??adir Servicio", "Debe rellenar los campos para proceder", "warning");
    }
  };
  const handleUpdate = async (evt) => {
    evt.preventDefault();
    const updateData = {
      cod_servicio: cod_servicio.campo,
      nombre: nombre.campo,
      descripcion: descripcion.campo,
      precio: precio.campo,
    };
    await services.updateServicios(updateData, elementId);
    notificacion("Actualizar Servicio", "Se ha actualizado Servicio satisfatoriamente", "info");
    setCod_servicio({ ...cod_servicio, valido: null });
    setNombre({ ...nombre, valido: null });
    setDescripcion({ ...descripcion, valido: null });
    setPrecio({ ...precio, valido: null });
  };
  return (
    <>
      <Topbar />
      <div className={`wrapper ${isCollapsed ? "sidebar-collapsed" : ""}`}>
        <h3 className="titulo">{isEditing ? "Editar Servicio" : "Nuevo Servicio"}</h3>
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
                <Link to="/dashboard/servicios" className="navegacion__redirect">
                  Servicios
                </Link>
              </li>
              <li> / </li>
              <li>
                <b>{isEditing ? "Editar Servicio" : "Nuevo Servicio"}</b>
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
            state={cod_servicio} //value
            setState={setCod_servicio} //onChange
            title="Codigo del Servicio"
            type="text"
            name="codigo_servicio"
            placeholder="Codigo del Servicio"
            error="el campo es requerible"
            expresion={expresiones.cod}
          />
          <ComponentInput
            state={nombre} //value
            setState={setNombre} //onChange
            title="Nombre del Servicio"
            type="text"
            name="nombre"
            placeholder="Nombre del Servicio"
            error="el campo es requerible"
            expresion={expresiones.nombre_servicio}
          />
          <ComponentInput
            state={descripcion} //value
            setState={setDescripcion} //onChange
            title="Descripcion del Servicio"
            type="text"
            name="descripcion"
            placeholder="Descripcion del Servicio"
          />
          <ComponentInput
            state={precio} //value
            setState={setPrecio} //onChange
            title="Precio"
            type="text"
            name="precio"
            placeholder="Precio"
            error="el campo es requerible"
            expresion={expresiones.decimal}
          />
        </Formulario>
      </div>
    </>
  );
};

export default ServiciosCreate;
