import React, { useState } from "react";
import "./Topbar.css";
import { Menu } from "@material-ui/icons";
import Sidebar from "../sidebar/Sidebar";

const Topbar = () => {
  const [isActive, setActive] = useState(false);
  const handleToggle = () => {
    const active = setActive(!isActive);
    const a = sessionStorage.setItem("isActive", active);
    console.log(a);
  };

  return (
    <>
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
        <ul className="navbar-nav nav-right">
          <li className="nav-item">
            <div>Account</div>
          </li>
        </ul>
      </div>
      <Sidebar isActive={isActive} />
    </>
  );
};

export default Topbar;
