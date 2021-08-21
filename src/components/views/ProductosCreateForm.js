import React from "react";
import { Formulario, GrupoInput, Select, Option, Label } from "../../elements/Formularios";
import ComponentInput from "../layouts/forms/ComponentInput";
import expresiones from "../../utils/Expresiones";
import { Icon } from "@material-ui/core";
import { PostAdd } from "@material-ui/icons";
import { useLocation } from "react-router-dom";

const ProductosCreateForm = ({
  isEditing,
  handleUpdate,
  onSubmit,
  cod_Producto,
  setCod_Producto,
  nombre,
  setNombre,
  descripcion,
  setDescripcion,
  cantidad,
  setCantidad,
  costo,
  setCosto,
  precio,
  setPrecio,
  idCategoria,
  setIdCategoria,
  categorias,
  handleAddProductos,
}) => {
  const { pathname } = useLocation();
  return (
    <div>
      {pathname === "/dashboard/compras/create" ? (
        <span className="add__compra">Agregar Producto</span>
      ) : null}
      <Formulario onSubmit={isEditing ? handleUpdate : onSubmit}>
        <ComponentInput
          state={cod_Producto} //value
          setState={setCod_Producto} //onChange
          title="Codigo"
          type="text"
          name="codigo"
          placeholder="Codigo"
          error="El campo está incompleto"
          expresion={expresiones.cod}
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
      </Formulario>
      {pathname === "/dashboard/compras/create" ? (
        <div className="crear-item">
          <button className="button actualizar" onClick={handleAddProductos}>
            <span className="button__icon">
              <Icon component={PostAdd} className="icon" />
            </span>
            <span className="button__text">Agregar Producto</span>
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default ProductosCreateForm;
