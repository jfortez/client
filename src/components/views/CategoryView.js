import React, { useState, useEffect } from "react";
import "./DashboardView.css";
import Topbar from "../layouts/topbar/Topbar";
import useValues from "../../provider/useValues";
import services from "../../services/categoria";
import { Link, useHistory } from "react-router-dom";
import { Loader } from "../../elements/Loader";
import { Delete, Update, Add } from "@material-ui/icons";

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
        <h3 className="titulo">Categorías de Productos</h3>
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
                <Link to="/dashboard/productos" className="navegacion__redirect">
                  Productos
                </Link>
              </li>
              <li> / </li>
              <li>
                <b>Categorías de Productos</b>
              </li>
            </ul>
          </nav>
        </div>
        <div className="crear-item">
          <Link to="/dashboard/productos/categoria/create" className="button__link">
            <button className="button crear">
              <span className="button__icon">
                <Add className="icon" />
              </span>
              <span className="button__text">Nueva Categoría</span>
            </button>
          </Link>
        </div>
        <div>
          <table className="paleBlueRows">
            <thead>
              <tr>
                <th>#</th>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <Loader loading={isLoading} />
              ) : categorias ? (
                categorias.map((categoria, index) => {
                  return (
                    <tr key={categoria.id}>
                      <td>{index + 1}</td>
                      <td>{categoria.nombre}</td>
                      <td>{categoria.descripcion}</td>
                      <td className="botones">
                        <button
                          onClick={() => handleDelete(categoria.id)}
                          className="button borrar"
                        >
                          <Delete />
                        </button>
                        <button
                          onClick={() => handleUpdate(categoria.id)}
                          className="button actualizar"
                        >
                          <Update />
                        </button>
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
