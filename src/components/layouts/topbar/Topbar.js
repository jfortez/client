import React, { useState } from "react";
import "./Topbar.css";
import { Menu } from "@material-ui/icons";
import Sidebar from "../sidebar/Sidebar";
import { Link } from "react-router-dom";

const Topbar = () => {
  const [isActive, setActive] = useState(false);
  const handleToggle = () => {
    setActive(!isActive);
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
        <ul className="navbar-nav nav-right">
          <li className="nav-item">
            <Link exact to="/dashboard/account">
              <div>Account</div>
            </Link>
          </li>
        </ul>
      </div>
      <Sidebar isActive={isActive} />
    </div>
  );
};

export default Topbar;
