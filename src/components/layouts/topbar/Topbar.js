import React, { useState } from "react";
import "./Topbar.css";
import { Menu, ExitToApp, Settings } from "@material-ui/icons";
import Sidebar from "../sidebar/Sidebar";
import { Link } from "react-router-dom";
import img from "../../../img/pic.jpg";
import { removeUserSession } from "../../../utils/Common";
import useValues from "../../../provider/useValues";
import notificacion from "../../../utils/Notificaciones";

const Topbar = () => {
  const { collapseSidebar, logout } = useValues();
  const [isDropDown, setIsDropDown] = useState(false);
  const handleToggle = () => {
    collapseSidebar();
  };
  const handleDropDown = () => {
    setIsDropDown(!isDropDown);
  };
  const handleLogout = () => {
    notificacion("Cerrar Sesión", "Cierre de Sesión realizado con exito", "success");
    removeUserSession();
    logout();
  };
  return (
    <div>
      <div className="navbar">
        {/* LEFT */}
        <ul className="navbar-nav">
          <li className="nav-item">
            <div>
              <Menu className="nav-icon" onClick={handleToggle} />
            </div>
          </li>
        </ul>
        {/* RIGHT */}
        {/* {`wrapper ${isCollapsed ? "sidebar-collapsed" : ""}`} */}
        <ul className="navbar-nav nav-right">
          <li className="nav-item avt-wrapper">
            <div className="avt dropdown">
              <img src={img} alt="a" className="dropdown-toggle" onClick={handleDropDown} />
              <ul className={`dropdown-menu ${isDropDown ? "dropdown-expand" : null}`}>
                <li className="dropdown-menu-item">
                  <Link to="/dashboard/settings" className="dropdown-menu-link">
                    <div>
                      <Settings className="dropdown-icon" />
                    </div>
                    <span>Configuración</span>
                  </Link>
                </li>
                <li className="dropdown-menu-item">
                  <Link to="/" className="dropdown-menu-link" onClick={handleLogout}>
                    <div>
                      <ExitToApp className="dropdown-icon" />
                    </div>
                    <span>Logout</span>
                  </Link>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
      <Sidebar />
    </div>
  );
};

export default Topbar;
