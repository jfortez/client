import React from "react";
import Topbar from "../layouts/topbar/Topbar";
import useValues from "../../provider/useValues";
const PageTest = () => {
  const { isCollapsed } = useValues();

  return (
    <>
      <Topbar />
      <div className={`wrapper ${isCollapsed ? "sidebar-collapsed" : ""}`}>
        <h1>Página de Pertical-menurueba</h1>
        <div class="container">
          <div class="item-0">1</div>

          <div class="item-1">1</div>

          <div class="item-2">2</div>
        </div>
      </div>
    </>
  );
};

export default PageTest;
