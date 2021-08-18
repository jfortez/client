import "./DashboardView.css";
import Topbar from "../layouts/topbar/Topbar";
import useValues from "../../provider/useValues";
import { useState, useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import services from "../../services/productos";
import categoriaServices from "../../services/categoria";
import expresiones from "../../utils/Expresiones";
import {
  Formulario,
  ContenedorBotonCentrado,
  Boton,
  MensajeError,
  GrupoInput,
  Select,
  Option,
  Label,
} from "../../elements/Formularios";
import { Error } from "@material-ui/icons";
import ComponentInput from "../layouts/forms/ComponentInput";
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
  const [formValid, setFormValid] = useState(null);
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
      // active: active.campo,
    };
    await services.updateProductos(updtProducto, elementId);
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
      await services.createProductos(nuevoProducto);
      setFormValid(true);
      setCod_Producto({ campo: "", valido: null });
      setNombre({ campo: "", valido: null });
      setDescripcion({ campo: "", valido: null });
      setCantidad({ campo: "", valido: null });
      setCosto({ campo: "", valido: null });
      setPrecio({ campo: "", valido: null });
      setIdCategoria({ campo: "", valido: null });
    } else {
      setFormValid(false);
    }
  };
  return (
    <>
      <Topbar />
      <div className={`wrapper ${isCollapsed ? "sidebar-collapsed" : ""}`}>
        {isEditing ? <h1>Editar Producto</h1> : <h1>Nuevo Producto</h1>}

        <div>
          <nav>
            <ul>
              <li>
                <Link to="/dashboard">Home</Link>
              </li>
              <li>
                <Link to="/dashboard/productos">Productos</Link>
              </li>
              <li>{isEditing ? <b>Editar Producto</b> : <b>Nuevo Producto</b>}</li>
            </ul>
          </nav>
        </div>
        <Formulario onSubmit={isEditing ? handleUpdate : onSubmit}>
          <ComponentInput
            state={cod_Producto} //value
            setState={setCod_Producto} //onChange
            title="Codigo"
            type="text"
            name="codigo"
            placeholder="Codigo"
            error="El campo está incompleto"
            expresion={expresiones.codigo}
          />
          <ComponentInput
            state={nombre} //value
            setState={setNombre} //onChange
            title="Nombre"
            type="text"
            name="nombre"
            placeholder="Nombre"
            error="El campo está incompleto"
            expresion={expresiones.nombre}
          />
          <ComponentInput
            state={descripcion} //value
            setState={setDescripcion} //onChange
            title="Descripcion"
            type="text"
            name="descripcion"
            placeholder="Descripcion"
            error="El campo está incompleto"
            expresion={expresiones.nombre}
          />
          <br />
          <ComponentInput
            state={cantidad} //value
            setState={setCantidad} //onChange
            title="Cantidad"
            type="text"
            name="cantidad"
            placeholder="Cantidad"
            error="El campo está incompleto"
            expresion={expresiones.numero}
          />
          <ComponentInput
            state={costo} //value
            setState={setCosto} //onChange
            title="Costo"
            type="text"
            name="costo"
            placeholder="Costo"
            error="El campo está incompleto"
            expresion={expresiones.numero}
          />
          <ComponentInput
            state={precio} //value
            setState={setPrecio} //onChange
            title="Precio"
            type="text"
            name="precio"
            placeholder="Precio"
            error="El campo está incompleto"
            expresion={expresiones.numero}
          />
          <br />
          <GrupoInput>
            <Label>Categoría</Label>
            <Select
              value={idCategoria.campo}
              name="id_Categoria"
              onChange={(e) => setIdCategoria({ campo: e.target.value })}
            >
              <Option value="0">Seleccione</Option>
              {categorias ? (
                categorias.map((item) => {
                  return (
                    <Option value={item.id} key={item.id}>
                      {item.nombre}
                    </Option>
                  );
                })
              ) : (
                <Option>taco</Option>
              )}
            </Select>
            <br />
          </GrupoInput>
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

export default ProductCreate;
