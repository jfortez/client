import React from "react";
import "./DashboardView.css";
import Topbar from "../layouts/topbar//Topbar";
import useValues from "../../provider/useValues";
const UsuariosView = () => {
  const { isCollapsed } = useValues();
  return (
    <>
      <Topbar />
      <div className={`wrapper ${isCollapsed ? "sidebar-collapsed" : ""}`}>
        <h1>Usuarios</h1>
      </div>
    </>
  );
};

export default UsuariosView;
