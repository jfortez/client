import React from "react";
import Topbar from "../layouts/topbar/Topbar";
import useValues from "../../provider/useValues";

const OdontologoView = () => {
  const { isCollapsed } = useValues();
  return (
    <>
      <Topbar />
      <div className={`wrapper ${isCollapsed ? "sidebar-collapsed" : ""}`}>
        <h1>Odontologos</h1>
      </div>
    </>
  );
};

export default OdontologoView;
