import React from "react";
import "./Sidebar.css";
import { NavLink, Link } from "react-router-dom";
import { Dashboard } from "@material-ui/icons";

const Sidebar = ({ isActive }) => {
  return (
    <>
      <div className={`slidebar ${isActive ? "" : "slidebar-expand"}`}>
        <ul className="slidebar-nav">
          <li className="slidebar-nav-item">
            <NavLink to="/dashboard" className="slidebar-nav-link">
              <div>
                <Dashboard className="slide-icon" />
              </div>
              <span>Dashboard</span>
            </NavLink>
          </li>
          <li className="slidebar-nav-item">
            <Link to="/dashboard/test" className="slidebar-nav-link">
              <div>
                <Dashboard className="slide-icon" />
              </div>
              <span>Test</span>
            </Link>
          </li>
          <li className="slidebar-nav-item">
            <NavLink to="/dashboard/personal" className="slidebar-nav-link">
              <div>
                <Dashboard className="slide-icon" />
              </div>
              <span>Personal</span>
            </NavLink>
          </li>
          <li className="slidebar-nav-item">
            <NavLink to="/dashboard/pacientes" className="slidebar-nav-link">
              <div>
                <Dashboard className="slide-icon" />
              </div>
              <span>Paciente</span>
            </NavLink>
          </li>
          <li className="slidebar-nav-item">
            <NavLink to="/dashboard/usuarios" className="slidebar-nav-link">
              <div>
                <Dashboard className="slide-icon" />
              </div>
              <span>Usuarios</span>
            </NavLink>
          </li>
          <li className="slidebar-nav-item">
            <NavLink to="/dashboard/test" className="slidebar-nav-link">
              <div>
                <Dashboard className="slide-icon" />
              </div>
              <span>Test</span>
            </NavLink>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
