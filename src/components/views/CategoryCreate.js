import React, { useState, useEffect } from "react";
import "./DashboardView.css";
import Topbar from "../layouts/topbar/Topbar";
import useValues from "../../provider/useValues";
import { Error } from "@material-ui/icons";
import {
  Formulario,
  ContenedorBotonCentrado,
  Boton,
  MensajeExito,
  MensajeError,
} from "../../elements/Formularios";
import ComponentInput from "../layouts/forms/ComponentInput";
import categoriaServices from "../../services/categoria";

const CategoryCreate = () => {
  const { isCollapsed } = useValues();
  const [isListed, setIsListed] = useState(false);
  const [nombre, setNombre] = useState({ campo: "", valido: null });
  const [descripcion, setDescripcion] = useState({ campo: "", valido: null });
  const [categorias, setCategorias] = useState([]);
  const [formValid, setFormValid] = useState(null);
  const getCategorias = async () => {
    const categorias = await categoriaServices.getCategorias();
    setCategorias(categorias);
  };
  useEffect(() => {
    getCategorias();
  }, [isListed]);
  const expresiones = {
    nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (nombre.valido === "true" && descripcion.valido === "true") {
      setFormValid(true);
      await categoriaServices.insertCategorias({
        nombre: nombre.campo,
        descripcion: descripcion.campo,
      });
    } else {
      setFormValid(false);
    }
  };
  const handleDelete = async (id) => {
    setIsListed(false);
    const deleteid = await categoriaServices.deleteCategoria(id);
    if (deleteid) {
      setIsListed(true);
    }
    console.log(deleteid);
  };
  const handleUpdate = () => {
    console.log("update");
  };
  return (
    <>
      <Topbar />
      <div className={`wrapper ${isCollapsed ? "sidebar-collapsed" : ""}`}>
        <h3>Create Category</h3>
        <div>
          <Formulario onSubmit={handleSubmit}>
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
              <Boton type="submit">Enviar</Boton>
              {formValid === true && <MensajeExito>Formulario enviado exitosamente!</MensajeExito>}
            </ContenedorBotonCentrado>
          </Formulario>
          <div>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Descripción</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {categorias
                  ? categorias.map((categoria) => {
                      return (
                        <tr key={categoria.id}>
                          <td>{categoria.id}</td>
                          <td>{categoria.nombre}</td>
                          <td>{categoria.descripcion}</td>
                          <td>
                            <button onClick={() => handleDelete(categoria.id)}>Eliminar</button>
                          </td>
                          <td>
                            <button onClick={handleUpdate}>Actualizar</button>
                          </td>
                        </tr>
                      );
                    })
                  : null}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryCreate;
