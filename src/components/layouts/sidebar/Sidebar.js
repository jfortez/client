import React from "react";
import "./Sidebar.css";
import { NavLink, useLocation } from "react-router-dom";
import { Icon } from "@material-ui/core";
import { SidebarData } from "./data";
import useValues from "../../../provider/useValues";
import { SettingsApplications } from "@material-ui/icons";

const Sidebar = () => {
  const { isCollapsed } = useValues();
  const { pathname } = useLocation();

  return (
    <div>
      <div className={`slidebar ${isCollapsed ? "" : "slidebar-expand"}`}>
        <ul className="slidebar-nav webkit">
          {SidebarData.map((item, index) => {
            return (
              <li key={index} className={item.class}>
                <NavLink exact={item.exact} to={item.url} className={item.urlClass}>
                  <div>
                    <Icon component={item.icon} className={item.iconClass} />
                  </div>
                  <span>{item.title}</span>
                </NavLink>
              </li>
            );
          })}
          {pathname === "/dashboard/settings/empresa" ||
          pathname === "/dashboard/settings/preferencias" ? (
            <li className="slidebar-nav-item">
              <NavLink to="/dashboard/settings/" className="slidebar-nav-link">
                <div>
                  <Icon component={SettingsApplications} className="slide-icon" />
                </div>
                <span>Configuración</span>
              </NavLink>
            </li>
          ) : null}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
