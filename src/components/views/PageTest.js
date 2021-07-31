import React, { useState } from "react";
import Topbar from "../layouts/topbar/Topbar";
import useValues from "../../provider/useValues";
import {
  Formulario,
  Boton,
  ContenedorBotonCentrado,
  GrupoInput,
  Select,
  Option,
  Label,
} from "../../elements/Formularios";
import ComponentInput from "../layouts/forms/ComponentInput";
const PageTest = () => {
  const { isCollapsed } = useValues();
  const [nombres, setNombres] = useState({ campo: "", valido: null });
  return (
    <>
      <Topbar />
      <div className={`wrapper ${isCollapsed ? "sidebar-collapsed" : ""}`}>
        <h1>test</h1>
        <h2>test2</h2>
        <Formulario>
          <ComponentInput
            state={nombres} //value
            setState={setNombres} //onChange
            title="Nombres:"
            type="text"
            name="nombres"
            placeholder="Nombres Completos"
            error="Nombre Error "
          />
          <ComponentInput
            state={nombres} //value
            setState={setNombres} //onChange
            title="Nombres:"
            type="text"
            name="nombres"
            placeholder="Nombres Completos"
            error="Nombre Error "
          />
          <ComponentInput
            state={nombres} //value
            setState={setNombres} //onChange
            title="Nombres:"
            type="text"
            name="nombres"
            placeholder="Nombres Completos"
            error="Nombre Error "
          />
          <ComponentInput
            state={nombres} //value
            setState={setNombres} //onChange
            title="Nombres:"
            type="text"
            name="nombres"
            placeholder="Nombres Completos"
            error="Nombre Error "
          />
          <ComponentInput
            state={nombres} //value
            setState={setNombres} //onChange
            title="Nombres:"
            type="text"
            name="nombres"
            placeholder="Nombres Completos"
            error="Nombre Error "
          />
          <GrupoInput>
            <Label>Texto</Label>
            <Select>
              <Option value="value1">value1</Option>
              <Option value="value2">value2</Option>
              <Option value="value3">value3</Option>
            </Select>
          </GrupoInput>
          <ContenedorBotonCentrado>
            <Boton type="submit">Enviar</Boton>
          </ContenedorBotonCentrado>
        </Formulario>
      </div>
    </>
  );
};

export default PageTest;
