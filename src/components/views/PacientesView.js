import React from "react";
import Topbar from "../layouts/topbar/Topbar";
import { Link } from "react-router-dom";
import Table from "../layouts/uses/Table";
const PacientesView = () => {
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
        <Table />
      </div>
    </>
  );
};

export default PacientesView;
