import React from "react";
import "./Sidebar.css";
import { NavLink } from "react-router-dom";
import { ExitToApp } from "@material-ui/icons";
import { Icon } from "@material-ui/core";
import { removeUserSession } from "../../../utils/Common";
import { SidebarData } from "./data";

const Sidebar = ({ isActive }) => {
  const handleLogout = () => {
    removeUserSession();
  };
  return (
    <div>
      <div className={`slidebar ${isActive ? "" : "slidebar-expand"}`}>
        <ul className="slidebar-nav">
          {SidebarData.map((item, index) => {
            return (
              <li key={index} className={item.class}>
                <NavLink exact to={item.url} className={item.urlClass}>
                  <div>
                    <Icon component={item.icon} className={item.iconClass} />
                  </div>
                  <span>{item.title}</span>
                </NavLink>
              </li>
            );
          })}
          <li className="slidebar-nav-item">
            <NavLink exact to="/" onClick={handleLogout} className="slidebar-nav-link">
              <div>
                <Icon component={ExitToApp} className="slide-icon" />
              </div>
              <span>Salir</span>
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
