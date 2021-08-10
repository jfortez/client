import React from "react";
import Topbar from "../layouts/topbar/Topbar";
import useValues from "../../provider/useValues";
import { Link } from "react-router-dom";

const ComprasCreate = () => {
  const { isCollapsed } = useValues();
  return (
    <>
      <Topbar />
      <div className={`wrapper ${isCollapsed ? "sidebar-collapsed" : ""}`}>
        <h1>Nueva Compra</h1>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/dashboard">Home</Link>
              </li>
              <li>
                <Link to="/dashboard/compras">Compras</Link>
              </li>
              <li>
                <b>Nueva Compra</b>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};

export default ComprasCreate;
