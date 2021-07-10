import React from "react";
import "./DashboardView.css";
import Topbar from "../layouts/topbar/Topbar";
const PersonalView = () => {
  const handleSubmit = () => {};
  return (
    <>
      <Topbar />
      <div className="wrapper">
        <h1>Personal </h1>
        <form action="">
          <div>
            <label htmlFor="">nombres</label>
            <input type="text" name="nombres" placeholder="Ej: Darío Daniel" />
          </div>
          <div>
            <label htmlFor="">apellidos</label>
            <input
              type="text"
              name="apellidos"
              placeholder="Ej: Pacherrez Herrera"
            />
          </div>
          <div>
            <label htmlFor="">telefono</label>
            <input type="text" name="telefono" placeholder="Ej: 09*******1" />
          </div>
          <div>
            <label htmlFor="">dirección</label>
            <input
              type="text"
              name="direccion"
              placeholder="Ej: Av. Aurelios"
            />
          </div>
          <div>
            <label htmlFor="">ciudad</label>
            <input type="text" name="ciudad" placeholder="Ej: Guayaquil" />
          </div>
          <div>
            <label htmlFor="">email</label>
            <input type="text" name="email" placeholder="Ej: Av. Aurelios" />
          </div>
          <div>
            <label htmlFor="">fecha de nacimiento</label>
            <input
              type="text"
              name="fecha_nac"
              placeholder="Ej: Av. Aurelios"
            />
          </div>
          <div>
            <label htmlFor="">edad</label>
            <input type="text" name="edad" placeholder="Ej: Av. Aurelios" />
          </div>
          <div>
            <label htmlFor="">tipo documento</label>
            <input type="text" name="tipo_doc" placeholder="Ej: Av. Aurelios" />
          </div>
          <div>
            <label htmlFor="">numero de documento</label>
            <input
              type="text"
              name="num_documento"
              placeholder="Ej: Av. Aurelios"
            />
          </div>
          <div>
            <label htmlFor="">dirección</label>
            <input
              type="text"
              name="direccion"
              placeholder="Ej: Av. Aurelios"
            />
          </div>
          <div>
            <label htmlFor="">activo</label>
            <input type="text" name="active" placeholder="Ej: Av. Aurelios" />
          </div>
          <button onClick={(props) => handleSubmit(props)}> Enviar</button>
        </form>
      </div>
    </>
  );
};

export default PersonalView;
