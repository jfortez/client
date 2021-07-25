import React from "react";
import Topbar from "../layouts/topbar/Topbar";
import { Link } from "react-router-dom";
import Table from "../layouts/uses/Table";
import useValues from "../../provider/useValues";

const PacientesView = () => {
  const { isCollapsed } = useValues();

  return (
    <>
      <Topbar />
      <div className={`wrapper ${isCollapsed ? "sidebar-collapsed" : ""}`}>
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
