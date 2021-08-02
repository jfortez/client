import React, { useState, useEffect } from "react";
import {
  Formulario,
  ContenedorBotonCentrado,
  Boton,
  MensajeError,
} from "../../elements/Formularios";
import { Error } from "@material-ui/icons";
import ComponentInput from "../layouts/forms/ComponentInput";
import services from "../../services/empresa";
const EmpresaView = () => {
  const [id, setId] = useState(0);
  const [ruc, setRuc] = useState({ campo: "", valido: null });
  const [nombre, setNombre] = useState({ campo: "", valido: null });
  const [direccion, setDireccion] = useState({ campo: "", valido: null });
  const [direccion2, setDireccion2] = useState({ campo: "", valido: null });
  const [ciudad, setCiudad] = useState({ campo: "", valido: null });
  const [telefono, setTelefono] = useState({ campo: "", valido: null });
  const [formValid, setFormValid] = useState(null);
  const [isListed, setIsListed] = useState(false);
  const expresiones = {
    nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    direccion: /^[a-zA-Z0-9À-ÿ\s]{4,100}$/, // Letras, numeros, Acentos
    correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    telefono: /^\d{7,14}$/, // 7 a 14 numeros.
    numero: /^\d{5,14}$/, // 7 a 14 numeros.
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    if (
      ruc.valido === "true" &&
      nombre.valido === "true" &&
      direccion.valido === "true" &&
      ciudad.valido === "true"
    ) {
      const newEmpresa = {
        ruc: ruc.campo,
        nombre: nombre.campo,
        direccion: direccion.campo,
        direccion2: direccion2.campo,
        ciudad: ciudad.campo,
        telefono: telefono.campo,
      };
      await services.saveEmpresa(newEmpresa, id);
      setFormValid(true);
      setIsListed(true);
    } else {
      setFormValid(false);
    }
  };
  const getEmpresa = async () => {
    const empresa = await services.optionEmpresa();
    const { id, ruc, nombre, direccion, direccion2, ciudad, telefono } = empresa[0];
    setId(id);
    setRuc({ campo: ruc, valido: "true" });
    setNombre({ campo: nombre, valido: "true" });
    setDireccion({ campo: direccion, valido: "true" });
    setDireccion2({ campo: direccion2, valido: null });
    setCiudad({ campo: ciudad, valido: "true" });
    setTelefono({ campo: telefono, valido: null });
  };
  useEffect(() => {
    getEmpresa();
    setIsListed(false);
  }, [isListed]);
  return (
    <>
      <div>
        <h1>Información de la Empresa</h1>
        <Formulario onSubmit={onSubmit}>
          <ComponentInput
            state={ruc} //value
            setState={setRuc} //onChange
            title="RUC"
            type="text"
            name="ruc"
            placeholder="RUC"
            error="El Campo es requerido"
            expresion={expresiones.numero}
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
          <br />
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
            expresion={expresiones.direccion}
          />
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
            <Boton type="submit">Guardar</Boton>
          </ContenedorBotonCentrado>
        </Formulario>
      </div>
    </>
  );
};

export default EmpresaView;
