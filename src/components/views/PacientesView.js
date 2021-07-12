import React, { useEffect, useState } from "react";
import Topbar from "../layouts/topbar/Topbar";
import axios from "axios";
import { DataGrid } from "@material-ui/data-grid";
import { Link } from "react-router-dom";
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
      unmounted = true;
    };
  });

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "nombres", headerName: "Nombres", width: 130 },
    { field: "apellidos", headerName: "Apellidos", width: 130 },
    { field: "telefono", headerName: "Telefono", width: 130 },
    { field: "direccion", headerName: "Dirección", width: 130 },
    { field: "ciudad", headerName: "Ciudad", width: 130 },
    { field: "tipo_doc", headerName: "Tipo Documento", width: 130 },
    { field: "num_documento", headerName: "Numero Documento", width: 130 },
    { field: "fecha_nac", headerName: "Fecha de Nacimiento", width: 130 },
    { field: "edad", headerName: "Edad", width: 130 },
    { field: "estadoCivil", headerName: "Estado Civil", width: 130 },
    { field: "genero", headerName: "Genero", width: 130 },
    { field: "fecha_registro", headerName: "Fecha Registro", width: 130 },
    { field: "email", headerName: "Email", width: 130 },
  ];
  return (
    <>
      <Topbar />
      <div className="wrapper">
        <h1>Pacientes</h1>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/dashboard">Home</Link>
              </li>
              <li>Pacientes</li>
            </ul>
          </nav>
        </div>
        <div>
          <Link to="/dashboard/pacientes/create">
            <button>Nuevo Paciente</button>
          </Link>
        </div>
        <div style={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={pacientes}
            columns={columns}
            pageSize={5}
            checkboxSelection
          />
        </div>
      </div>
    </>
  );
};

export default PacientesView;
