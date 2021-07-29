import React from "react";
import Topbar from "../layouts/topbar/Topbar";
import useValues from "../../provider/useValues";
const PageTest = () => {
  const { isCollapsed } = useValues();

  return (
    <>
      <Topbar />
      <div className={`wrapper ${isCollapsed ? "sidebar-collapsed" : ""}`}>
        <h1>test</h1>
        <h2>test2</h2>
      </div>
    </>
  );
};

export default PageTest;
