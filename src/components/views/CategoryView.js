import React, { useState, useEffect } from "react";
import "./DashboardView.css";
import Topbar from "../layouts/topbar/Topbar";
import useValues from "../../provider/useValues";
import services from "../../services/categoria";
import { Link, useHistory } from "react-router-dom";
import { Loader } from "../../elements/Loader";

const CategoryView = () => {
  const { isCollapsed } = useValues();
  const [isListed, setIsListed] = useState(false);
  const [categorias, setCategorias] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();
  useEffect(() => {
    let source = services.Axios.CancelToken.source();
    let unmounted = false;
    const getCategorias = async () => {
      try {
        const categorias = await services.getCategorias(source);
        if (!unmounted) {
          setCategorias(categorias);
          setIsLoading(false);
        }
      } catch (error) {
        if (!unmounted) {
          if (services.Axios.isCancel(error)) {
            console.log("AxiosCancel: caught cancel", error.message);
          } else {
            console.log("throw error", error.message);
          }
        }
      }
    };
    getCategorias();
    setIsListed(false);
    return () => {
      unmounted = true;
      source.cancel("Cancelling in Cleanup");
    };
  }, [isListed]);
  const newCategory = () => {
    history.push("/dashboard/productos/categoria/create");
  };
  const handleDelete = async (id) => {
    setIsLoading(true);
    const deleteid = await services.bajaCategoria(id);
    if (deleteid) {
      setIsListed(true);
    }
  };
  const handleUpdate = (id) => {
    history.push(`/dashboard/productos/categoria/${id}/edit`);
  };
  return (
    <>
      <Topbar />
      <div className={`wrapper ${isCollapsed ? "sidebar-collapsed" : ""}`}>
        <h1>Nueva Categoría</h1>
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
                <b>Categoría</b>
              </li>
            </ul>
          </nav>
          <button onClick={newCategory}>Nueva Categoría</button>
        </div>
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
              {isLoading ? (
                <Loader loading={isLoading} />
              ) : categorias ? (
                categorias.map((categoria) => {
                  return (
                    <tr key={categoria.id}>
                      <td>{categoria.id}</td>
                      <td>{categoria.nombre}</td>
                      <td>{categoria.descripcion}</td>
                      <td>
                        <button onClick={() => handleDelete(categoria.id)}>Eliminar</button>
                        <button onClick={() => handleUpdate(categoria.id)}>Actualizar</button>
                      </td>
                    </tr>
                  );
                })
              ) : null}
            </tbody>
          </table>
        </div>
      </div>{" "}
    </>
  );
};

export default CategoryView;
