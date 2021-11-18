import React, { useState, useEffect } from "react";
import { Formulario } from "../../elements/Formularios";
import ComponentInput from "../layouts/forms/ComponentInput";
import services from "../../services/empresa";
import expresiones from "../../utils/Expresiones";
import notificacion from "../../utils/Notificaciones";
import { Icon } from "@material-ui/core";
import { Save } from "@material-ui/icons";
const EmpresaView = () => {
  const [id, setId] = useState(0);
  const [ruc, setRuc] = useState({ campo: "", valido: null });
  const [nombre, setNombre] = useState({ campo: "", valido: null });
  const [direccion, setDireccion] = useState({ campo: "", valido: null });
  const [direccion2, setDireccion2] = useState({ campo: "", valido: null });
  const [ciudad, setCiudad] = useState({ campo: "", valido: null });
  const [telefono, setTelefono] = useState({ campo: "", valido: null });
  const [isListed, setIsListed] = useState(false);
  const onSubmit = async (e) => {
    e.preventDefault();
    const newEmpresa = {
      ruc: ruc.campo,
      nombre: nombre.campo,
      direccion: direccion.campo,
      direccion2: direccion2.campo,
      ciudad: ciudad.campo,
      telefono: telefono.campo,
    };
    await services.saveEmpresa(newEmpresa, id);
    notificacion("Mensaje", "Se ha guardado los datos con exito", "success");
    setIsListed(!isListed);
    // notificacion("Error", "Debe rellenar los campos requeridos", "danger");
  };
  const getEmpresa = async () => {
    const empresa = await services.optionEmpresa();
    if (empresa.length > 0) {
      const { id, ruc, nombre, direccion, direccion2, ciudad, telefono } = empresa[0];
      setId(id);
      setRuc({ campo: ruc, valido: null });
      setNombre({ campo: nombre, valido: null });
      setDireccion({ campo: direccion, valido: null });
      setDireccion2({ campo: direccion2 ? direccion2 : "", valido: null });
      setCiudad({ campo: ciudad, valido: null });
      setTelefono({ campo: telefono, valido: null });
    }
  };
  useEffect(() => {
    getEmpresa();
  }, [isListed]);
  return (
    <>
      <div>
        <h3 className="titulo">Información de la Empresa</h3>
        <div className="crear-item">
          <button className="button actualizar" onClick={onSubmit}>
            <span className="button__icon">
              <Icon component={Save} className="icon" />
            </span>
            <span className="button__text">Guardar</span>
          </button>
        </div>

        <Formulario onSubmit={onSubmit}>
          <ComponentInput
            state={ruc} //value
            setState={setRuc} //onChange
            title="RUC"
            type="text"
            name="ruc"
            placeholder="RUC"
            error="El Campo es requerido"
            expresion={expresiones.ruc}
          />
          <ComponentInput
            state={nombre} //value
            setState={setNombre} //onChange
            title="Nombre"
            type="text"
            name="nombre"
            placeholder="Nombre"
            error="El Campo es requerido"
            expresion={expresiones.nombre}
          />
          <ComponentInput
            state={telefono} //value
            setState={setTelefono} //onChange
            title="Telefono"
            type="text"
            name="telefono"
            placeholder="Telefono"
          />
          <ComponentInput
            state={direccion} //value
            setState={setDireccion} //onChange
            title="Dirección"
            type="text"
            name="direccion"
            placeholder="Dirección"
            error="El Campo es requerido"
            expresion={expresiones.direccion}
          />
          <ComponentInput
            state={direccion2} //value
            setState={setDireccion2} //onChange
            title="Dirección 2"
            type="text"
            name="direccion2"
            placeholder="Dirección 2"
          />
          <ComponentInput
            state={ciudad} //value
            setState={setCiudad} //onChange
            title="Ciudad"
            type="text"
            name="ciudad"
            placeholder="Ciudad"
            error="El Campo es requerido"
            expresion={expresiones.nombre}
          />
        </Formulario>
      </div>
    </>
  );
};

export default EmpresaView;
