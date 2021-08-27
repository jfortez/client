import { Icon } from "@material-ui/core";
import { Save } from "@material-ui/icons";
import React, { useEffect } from "react";
import { useState } from "react";
import { Formulario } from "../../elements/Formularios";
import expresiones from "../../utils/Expresiones";
import ComponentInput from "../layouts/forms/ComponentInput";
import useValues from "../../provider/useValues";
import services from "../../services/values";
import notificacion from "../../utils/Notificaciones";

const PreferenciasView = () => {
  const { values, setValues } = useValues();
  const [numfactura, setNumfactura] = useState({ campo: "", valido: null });
  useEffect(() => {
    setNumfactura({ campo: values.num_recibo, valido: null });
  }, [values]);
  const onSubmit = async () => {
    const newValue = { num_recibo: numfactura.campo };
    await services.updateValues(newValue);
    setValues({ ...values, num_recibo: numfactura.campo });
    setNumfactura({ campo: numfactura, valido: null });
    notificacion("Mensaje", "Se ha guardado los datos con exito", "success");
  };
  return (
    <div>
      <h3 className="titulo">Preferencias</h3>
      <div className="crear-item">
        <button className="button actualizar" onClick={onSubmit}>
          <span className="button__icon">
            <Icon component={Save} className="icon" />
          </span>
          <span className="button__text">Guardar</span>
        </button>
      </div>
      <Formulario onSubmit={onSubmit}>
        <p>Empezar Factura Desde: </p>
        <ComponentInput
          state={numfactura} //value
          setState={setNumfactura} //onChange
          title="Número de Factura"
          type="text"
          name="factura"
          placeholder="Factura #"
          error="El Campo es requerido"
          expresion={expresiones.factura}
        />
      </Formulario>
    </div>
  );
};

export default PreferenciasView;
