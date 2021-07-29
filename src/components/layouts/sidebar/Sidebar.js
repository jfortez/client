import React from "react";
import "./Sidebar.css";
import { NavLink } from "react-router-dom";
import { Icon } from "@material-ui/core";
import { SidebarData } from "./data";
import useValues from "../../../provider/useValues";

const Sidebar = () => {
  const { isCollapsed } = useValues();
  return (
    <div>
      <div className={`slidebar ${isCollapsed ? "" : "slidebar-expand"}`}>
        <ul className="slidebar-nav webkit">
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
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
