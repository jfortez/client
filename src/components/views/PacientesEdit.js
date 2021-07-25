import React from "react";
import Topbar from "../layouts/topbar/Topbar";
import { useParams } from "react-router-dom";
import useValues from "../../provider/useValues";

const PacientesEdit = () => {
  const { isCollapsed } = useValues();
  const { id } = useParams();
  return (
    <>
      <Topbar />
      <div className={`wrapper ${isCollapsed ? "sidebar-collapsed" : ""}`}>
        <h1>id: {id}</h1>
      </div>
    </>
  );
};

export default PacientesEdit;
