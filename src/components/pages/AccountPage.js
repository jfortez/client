import React from "react";
import "../views/DashboardView.css";
import Topbar from "../layouts/topbar/Topbar";
import useValues from "../../provider/useValues";

const AccountPage = () => {
  const { isCollapsed } = useValues();

  return (
    <>
      <Topbar />
      <div className={`wrapper ${isCollapsed ? "sidebar-collapsed" : ""}`}>
        <h1>Account Page</h1>
      </div>
    </>
  );
};

export default AccountPage;
