import React from "react";
import Topbar from "../layouts/topbar/Topbar";
import useValues from "../../provider/useValues";
import { NavLink } from "react-router-dom";
import { Accessible } from "@material-ui/icons";

const PageTest = () => {
  const { isCollapsed } = useValues();

  return (
    <>
      <Topbar />
      ertical-menu
      <div className={`wrapper ${isCollapsed ? "sidebar-collapsed" : ""}`}>
        <h1>Página de Pertical-menurueba</h1>
        <div className="row">
          <div className="col-left">
            <h1>Left</h1>
            <div className="vertical-menu">
              <NavLink to="/dashboard/test/link1" className="link">
                <span className="navlink__icon">
                  <Accessible />
                </span>
                <span className="navlink__title">Cuenta</span>
              </NavLink>
              <NavLink to="/dashboard/test/link2" className="link">
                <span className="navlink__icon">
                  <Accessible />
                </span>
                <span className="navlink__title">Empresa</span>
              </NavLink>
              <NavLink to="/dashboard/test/link3" className="link">
                <span className="navlink__icon">
                  <Accessible />
                </span>
                <span className="navlink__title">Respaldo</span>
              </NavLink>
            </div>
          </div>
          <div className="col-right">
            <h1>Right</h1>
            <h1>test</h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default PageTest;
