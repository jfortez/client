import "./DashboardView.css";
import Topbar from "../layouts/topbar/Topbar";
import useValues from "../../provider/useValues";
import services from "../../services/servicios";
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
import { useEffect, useState } from "react";

const ServiciosCreate = () => {
  const { isCollapsed } = useValues();
  const [elementId, setElementId] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [formValid, setFormValid] = useState(null);
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
        return console.log("ruc ya existe"); //codigo para la alerta
      }
      setFormValid(true);
      setCod_servicio({ campo: "", valido: null });
      setNombre({ campo: "", valido: null });
      setDescripcion({ campo: "", valido: null });
      setPrecio({ campo: "", valido: null });
    } else {
      setFormValid(false);
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
    setCod_servicio({ ...cod_servicio, valido: null });
    setNombre({ ...nombre, valido: null });
    setDescripcion({ ...descripcion, valido: null });
    setPrecio({ ...precio, valido: null });
  };
  return (
    <>
      <Topbar />
      <div className={`wrapper ${isCollapsed ? "sidebar-collapsed" : ""}`}>
        {isEditing ? <h1>Editar Servicio</h1> : <h1>Nuevo Servicio</h1>}
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/dashboard">Home</Link>
              </li>
              <li>
                <Link to="/dashboard/servicios">Servicios</Link>
              </li>
              <li>{isEditing ? <b>Editar Servicio</b> : <b>Nuevo Servicio</b>}</li>
            </ul>
          </nav>
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
            expresion={expresiones.numero}
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

export default ServiciosCreate;
