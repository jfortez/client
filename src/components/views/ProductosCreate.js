import "./DashboardView.css";
import Topbar from "../layouts/topbar/Topbar";
import useValues from "../../provider/useValues";
import { useState, useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import services from "../../services/productos";
import categoriaServices from "../../services/categoria";
import { Icon } from "@material-ui/core";
import { Save, SystemUpdateAlt } from "@material-ui/icons";
import notificacion from "../../utils/Notificaciones";
import ProductosCreateForm from "./ProductosCreateForm";

const ProductCreate = () => {
  const { isCollapsed } = useValues();
  const [elementId, setElementId] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [categorias, setCategorias] = useState([]);
  const [cod_Producto, setCod_Producto] = useState({ campo: "", valido: null });
  const [nombre, setNombre] = useState({ campo: "", valido: null });
  const [descripcion, setDescripcion] = useState({ campo: "", valido: null });
  const [cantidad, setCantidad] = useState({ campo: "", valido: null });
  const [costo, setCosto] = useState({ campo: "", valido: null });
  const [precio, setPrecio] = useState({ campo: "", valido: null });
  const [idCategoria, setIdCategoria] = useState({ campo: "", valido: null });
  const { id } = useParams();
  const productoId = id;
  const { pathname } = useLocation();
  useEffect(() => {
    if (pathname === `/dashboard/productos/${productoId}/edit`) {
      setIsEditing(true);
      const getPersonalById = async () => {
        const productos = await services.getProductosById(productoId);
        const { id, cod_producto, nombre, descripcion, cantidad, costo, precio, id_categoria } =
          productos[0];
        setElementId(id);
        setCod_Producto({ campo: cod_producto, valido: null });
        setNombre({ campo: nombre, valido: null });
        setDescripcion({ campo: descripcion, valido: null });
        setCantidad({ campo: cantidad, valido: null });
        setCosto({ campo: costo, valido: null });
        setPrecio({ campo: precio, valido: null });
        setIdCategoria({ campo: id_categoria, valido: null });
      };
      getPersonalById();
    }
  }, [productoId, pathname]);
  const listCategorias = async () => {
    const categorias = await categoriaServices.optionCategorias();
    setCategorias(categorias);
  };
  useEffect(() => {
    listCategorias();
  }, []);
  const handleUpdate = async (evt) => {
    evt.preventDefault();
    const updtProducto = {
      cod_producto: cod_Producto.campo,
      nombre: nombre.campo,
      descripcion: descripcion.campo,
      cantidad: cantidad.campo,
      costo: costo.campo,
      precio: precio.campo,
      id_categoria: idCategoria.campo,
    };
    await services.updateProductos(updtProducto, elementId);
    notificacion("Actualizar Producto", "Se ha actualizado Producto satisfatoriamente", "info");
    setCod_Producto({ ...cod_Producto, valido: null });
    setNombre({ ...nombre, valido: null });
    setDescripcion({ ...descripcion, valido: null });
    setCantidad({ ...cantidad, valido: null });
    setCosto({ ...costo, valido: null });
    setPrecio({ ...precio, valido: null });
    setIdCategoria({ ...idCategoria, valido: null });
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    if (
      cod_Producto.valido === "true" &&
      nombre.valido === "true" &&
      descripcion.valido === "true" &&
      cantidad.valido === "true" &&
      costo.valido === "true" &&
      precio.valido === "true" &&
      idCategoria.campo > 0
    ) {
      const nuevoProducto = {
        cod_producto: cod_Producto.campo,
        nombre: nombre.campo,
        descripcion: descripcion.campo,
        cantidad: cantidad.campo,
        costo: costo.campo,
        precio: precio.campo,
        id_categoria: idCategoria.campo,
      };
      const nuevo = await services.createProductos(nuevoProducto);
      if (nuevo.message === "el dato existe" && nuevo.codExiste[0].active === 0) {
        await services.updateProductos(nuevoProducto, nuevo.codExiste[0].id);
      }
      if (nuevo.message === "el dato existe" && nuevo.codExiste[0].active === 1) {
        return console.log("Producto ya existe"); //codigo para la alerta
      }
      notificacion("Añadir Producto", "Se ha creado Producto satisfatoriamente", "success");
      setCod_Producto({ campo: "", valido: null });
      setNombre({ campo: "", valido: null });
      setDescripcion({ campo: "", valido: null });
      setCantidad({ campo: "", valido: null });
      setCosto({ campo: "", valido: null });
      setPrecio({ campo: "", valido: null });
      setIdCategoria({ campo: "", valido: null });
    } else {
      notificacion("Añadir Producto", "Debe rellenar los campos para proceder", "warning");
    }
  };
  return (
    <>
      <Topbar />
      <div className={`wrapper ${isCollapsed ? "sidebar-collapsed" : ""}`}>
        <h3 className="titulo">{isEditing ? "Editar Producto" : "Nuevo Producto"}</h3>
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
                <b>{isEditing ? "Editar Producto" : "Nuevo Producto"}</b>
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
        <ProductosCreateForm
          isEditing={isEditing}
          handleUpdate={handleUpdate}
          onSubmit={onSubmit}
          cod_Producto={cod_Producto}
          setCod_Producto={setCod_Producto}
          nombre={nombre}
          setNombre={setNombre}
          descripcion={descripcion}
          setDescripcion={setDescripcion}
          cantidad={cantidad}
          setCantidad={setCantidad}
          costo={costo}
          setCosto={setCosto}
          precio={precio}
          setPrecio={setPrecio}
          idCategoria={idCategoria}
          setIdCategoria={setIdCategoria}
          categorias={categorias}
        />
      </div>
    </>
  );
};

export default ProductCreate;
