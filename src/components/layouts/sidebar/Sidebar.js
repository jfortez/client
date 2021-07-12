import React from "react";
import "./Sidebar.css";
import { NavLink } from "react-router-dom";
import { Dashboard } from "@material-ui/icons";
import { removeUserSession } from "../../../utils/Common";

const Sidebar = ({ isActive }, props) => {
  const handleLogout = () => {
    removeUserSession();
  };
  return (
    <>
      <div className={`slidebar ${isActive ? "" : "slidebar-expand"}`}>
        <ul className="slidebar-nav">
          <li className="slidebar-nav-item">
            <NavLink exact to="/dashboard" className="slidebar-nav-link">
              <div>
                <Dashboard className="slide-icon" />
              </div>
              <span>Dashboard</span>
            </NavLink>
          </li>
          <li className="slidebar-nav-item">
            <NavLink exact to="/dashboard/test" className="slidebar-nav-link">
              <div>
                <Dashboard className="slide-icon" />
              </div>
              <span>Test</span>
            </NavLink>
          </li>
          <li className="slidebar-nav-item">
            <NavLink
              exact
              to="/dashboard/personal"
              className="slidebar-nav-link"
            >
              <div>
                <Dashboard className="slide-icon" />
              </div>
              <span>Personal</span>
            </NavLink>
          </li>
          <li className="slidebar-nav-item">
            <NavLink
              exact
              to="/dashboard/pacientes"
              className="slidebar-nav-link"
            >
              <div>
                <Dashboard className="slide-icon" />
              </div>
              <span>Paciente</span>
            </NavLink>
          </li>
          <li className="slidebar-nav-item">
            <NavLink
              exact
              to="/dashboard/usuarios"
              className="slidebar-nav-link"
            >
              <div>
                <Dashboard className="slide-icon" />
              </div>
              <span>Usuarios</span>
            </NavLink>
          </li>
          <li className="slidebar-nav-item">
            <NavLink
              exact
              to="/"
              onClick={handleLogout}
              className="slidebar-nav-link"
            >
              <div>
                <Dashboard className="slide-icon" />
              </div>
              <span>Salir</span>
            </NavLink>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
