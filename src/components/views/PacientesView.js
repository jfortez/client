import React, { useEffect, useState } from "react";
import Topbar from "../layouts/topbar/Topbar";
import axios from "axios";

const PacientesView = () => {
  const [pacientes, setPacientes] = useState([]);
  const getPacientes = () => {
    axios
      .get("http://192.168.0.100:5000/api/pacientes")
      .then((response) => {
        setPacientes(response.data);
      })
      .catch((error) => console.error(error));
  };
  useEffect(() => {
    let unmounted = false;
    if (!unmounted) {
      getPacientes();
    }
    return () => {
      console.log("clean up");
      unmounted = true;
    };
  });

  return (
    <>
      <Topbar />
      <div className="wrapper">
        <h1>Pacientes</h1>
        <div>
          <nav>
            <ul>
              <li>Home</li>
              <li>Pacientes</li>
              <li>Home</li>
            </ul>
          </nav>
        </div>
        <div>Agregar</div>
        <div>
          <ul>
            {pacientes.map((paciente) => (
              <li key={paciente.id_Paciente}>{paciente.nombres}</li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default PacientesView;
