import React from "react";
import {
  Label,
  GrupoInput,
  LeyendaError,
  Input,
  IconoValidacion,
} from "../../../elements/Formularios";
import { CheckCircle, Cancel } from "@material-ui/icons";

const ComponentInput = (props) => {
  const validacion = () => {
    if (props.expresion) {
      if (props.expresion.test(props.state.campo)) {
        props.setState({ ...props.state, valido: "true" });
      } else {
        props.setState({ ...props.state, valido: "false" });
      }
    }
    if (props.function) {
      props.function();
    }
  };
  return (
    <div>
      <Label htmlFor={props.name} valido={props.state.valido}>
        {props.title}
      </Label>
      <GrupoInput>
        <Input
          type={props.type}
          name={props.name}
          id={props.name}
          placeholder={props.placeholder}
          value={props.state.campo}
          onChange={(e) =>
            props.setState({ ...props.state, campo: e.target.value })
          }
          onKeyUp={validacion}
          onBlur={validacion}
          valido={props.state.valido}
        />
        <IconoValidacion
          component={props.state.valido === "true" ? CheckCircle : Cancel}
          valido={props.state.valido}
        />
      </GrupoInput>
      <LeyendaError valido={props.state.valido}>{props.error}</LeyendaError>
    </div>
  );
};

export default ComponentInput;
