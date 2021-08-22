import React, { useState, useEffect } from "react";
import "./DashboardView.css";
import Topbar from "../layouts/topbar/Topbar";
import useValues from "../../provider/useValues";
import { Save, SystemUpdateAlt } from "@material-ui/icons";
import { Formulario } from "../../elements/Formularios";
import ComponentInput from "../layouts/forms/ComponentInput";
import services from "../../services/categoria";
import { Link, useLocation, useParams } from "react-router-dom";
import { Icon } from "@material-ui/core";
import notificacion from "../../utils/Notificaciones";

const CategoryCreate = () => {
  const { isCollapsed } = useValues();
  const [elementId, setElementId] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [nombre, setNombre] = useState({ campo: "", valido: null });
  const [descripcion, setDescripcion] = useState({ campo: "", valido: null });
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
    notificacion("Actualizar Categoría", "Se ha actualizado Categoría satisfatoriamente", "info");
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    if (nombre.valido === "true" && descripcion.valido === "true") {
      const newItem = {
        nombre: nombre.campo,
        descripcion: descripcion.campo,
      };
      const nuevo = await services.insertCategorias(newItem);
      if (nuevo.message === "el dato existe" && nuevo.catExiste[0].active === 0) {
        await services.updateCategoria(newItem, nuevo.catExiste[0].id);
      }
      if (nuevo.message === "el dato existe" && nuevo.catExiste[0].active === 1) {
        return notificacion(
          "Error, Item Duplicado",
          "El Item que intenta crear ya existe, no es posiblie duplicar",
          "danger"
        );
      }
      notificacion("Añadir Categoría", "Se ha creado Categoría satisfatoriamente", "success");
      setNombre({ campo: "" });
      setDescripcion({ campo: "" });
    } else {
      notificacion("Añadir Categoría", "Debe rellenar los campos para proceder", "warning");
    }
  };
  return (
    <>
      <Topbar />
      <div className={`wrapper ${isCollapsed ? "sidebar-collapsed" : ""}`}>
        <h3 className="titulo">{isEditing ? "Editar Categoría" : "Nuevo Categoría"}</h3>
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
                <Link to="/dashboard/productos" className="navegacion__redirect">
                  Productos
                </Link>
              </li>
              <li> / </li>
              <li>
                <Link to="/dashboard/productos/categoria" className="navegacion__redirect">
                  Categorías
                </Link>
              </li>
              <li> / </li>
              <li>
                <b>{isEditing ? "Editar Categoría" : "Nuevo Categoría"}</b>
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
        <div>
          <Formulario>
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
          </Formulario>
        </div>
      </div>
    </>
  );
};

export default CategoryCreate;
