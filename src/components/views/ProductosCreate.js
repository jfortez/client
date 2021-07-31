import "./DashboardView.css";
import Topbar from "../layouts/topbar/Topbar";
import useValues from "../../provider/useValues";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import services from "../../services/productos";
import categoriaServices from "../../services/categoria";
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
  const [categorias, setCategorias] = useState([]);
  const [cod_Producto, setCod_Producto] = useState({ campo: "", valido: null });
  const [nombre, setNombre] = useState({ campo: "", valido: null });
  const [descripcion, setDescripcion] = useState({ campo: "", valido: null });
  const [cantidad, setCantidad] = useState({ campo: "", valido: null });
  const [costo, setCosto] = useState({ campo: "", valido: null });
  const [precio, setPrecio] = useState({ campo: "", valido: null });
  const [idCategoria, setIdCategoria] = useState({ campo: "", valido: null });
  const [formValid, setFormValid] = useState(null);
  const expresiones = {
    nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    telefono: /^\d{7,14}$/, // 7 a 14 numeros.
    numero: /^\d{0,9}$/, // 0 a 9 numeros.
    codigo: /^\d{5,50}$/, // 7 a 14 numeros.
    fecha: /^\d{4}-\d{2}-\d{2}$/,
  };
  const listCategorias = async () => {
    const categorias = await categoriaServices.getCategorias();
    console.log(categorias);
    setCategorias(categorias);
  };
  useEffect(() => {
    listCategorias();
  }, []);

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
        <h1>Nuevo Producto</h1>
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
                <b>Nuevo Producto</b>
              </li>
            </ul>
          </nav>
        </div>
        <Formulario onSubmit={onSubmit}>
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
              name="id_Cargo"
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
            <Boton type="submit">Crear</Boton>
          </ContenedorBotonCentrado>
        </Formulario>
      </div>
    </>
  );
};

export default ProductCreate;
