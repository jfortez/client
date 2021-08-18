import React, { useState, useEffect } from "react";
import "./DashboardView.css";
import Topbar from "../layouts/topbar/Topbar";
import useValues from "../../provider/useValues";
import { Error } from "@material-ui/icons";
import {
  Formulario,
  ContenedorBotonCentrado,
  Boton,
  // MensajeExito,
  MensajeError,
} from "../../elements/Formularios";
import ComponentInput from "../layouts/forms/ComponentInput";
import services from "../../services/categoria";
import { Link, useLocation, useParams } from "react-router-dom";

const CategoryCreate = () => {
  const { isCollapsed } = useValues();
  const [elementId, setElementId] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [nombre, setNombre] = useState({ campo: "", valido: null });
  const [descripcion, setDescripcion] = useState({ campo: "", valido: null });
  const [formValid, setFormValid] = useState(null);
  const expresiones = {
    nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
  };
  const { id } = useParams();
  const idCategoria = id;
  const { pathname } = useLocation();
  useEffect(() => {
    if (pathname === `/dashboard/productos/categoria/${idCategoria}/edit`) {
      setIsEditing(true);
      const getClienteById = async () => {
        const categoria = await services.getCategoriasById(idCategoria);
        const { id, nombre, descripcion } = categoria[0];
        setElementId(id);
        setNombre({ campo: nombre, valido: null });
        setDescripcion({ campo: descripcion, valido: null });
      };
      getClienteById();
    }
  }, [idCategoria, pathname]);
  const handleUpdate = async (evt) => {
    evt.preventDefault();
    const updateCliente = {
      nombre: nombre.campo,
      descripcion: descripcion.campo,
    };
    await services.updateCategoria(updateCliente, elementId);
    setNombre({ ...nombre, valido: null });
    setDescripcion({ ...descripcion, valido: null });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    if (nombre.valido === "true" && descripcion.valido === "true") {
      setFormValid(true);
      const newItem = {
        nombre: nombre.campo,
        descripcion: descripcion.campo,
      };
      const nuevo = await services.insertCategorias(newItem);
      if (nuevo.message === "el dato existe" && nuevo.catExiste[0].active === 0) {
        await services.updateCategoria(newItem, nuevo.catExiste[0].id);
      }
      if (nuevo.message === "el dato existe" && nuevo.catExiste[0].active === 1) {
        return console.log("el dato existe"); //codigo para la alerta
      }
      setNombre({ campo: "" });
      setDescripcion({ campo: "" });
    } else {
      setFormValid(false);
    }
  };
  return (
    <>
      <Topbar />
      <div className={`wrapper ${isCollapsed ? "sidebar-collapsed" : ""}`}>
        {isEditing ? <h1>Editar Categoría</h1> : <h1>Nuevo Categoría</h1>}

        <div>
          <nav>
            <ul>
              <li>
                <Link to="/dashboard">Home</Link>
              </li>
              <li>
                <Link to="/dashboard/productos">Productos</Link>
              </li>
              <li>
                <Link to="/dashboard/productos/categoria">Categoria</Link>
              </li>
              <li>{isEditing ? <b>Editar Categoría</b> : <b>Nuevo Categoría</b>}</li>
            </ul>
          </nav>
        </div>
        <div>
          <Formulario onSubmit={isEditing ? handleUpdate : onSubmit}>
            <ComponentInput
              state={nombre} //value
              setState={setNombre} //onChange
              title="Nombre:"
              type="text"
              name="nombre"
              placeholder="Nombre de Categoría"
              error="Nombre error "
              expresion={expresiones.nombre}
            />
            <ComponentInput
              state={descripcion} //value
              setState={setDescripcion} //onChange
              title="Descripción:"
              type="text"
              name="descripcion"
              placeholder="Descripción de Categoría"
              error="Descripción error "
              expresion={expresiones.nombre}
            />
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
              {/* {formValid === true && <MensajeExito>Formulario enviado exitosamente!</MensajeExito>} */}
            </ContenedorBotonCentrado>
          </Formulario>
        </div>
      </div>
    </>
  );
};

export default CategoryCreate;
