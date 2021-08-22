import React from "react";
import Topbar from "../layouts/topbar/Topbar";
import "../views/DashboardView.css";
import useValues from "../../provider/useValues";
// import home from "../../img/home.jpg";
const Dashboard = () => {
  const { isCollapsed, user } = useValues();
  return (
    <>
      <Topbar />
      <div className={`wrapper ${isCollapsed ? "sidebar-collapsed" : ""}`}>
        <div className="test__">
          <div className="home__img"></div>
        </div>
        <div className="home__img"></div>

        {/* <div className="row">
          <div className="col-12">
            <div className="home__page home__header">
              <h2>Bienvenido {user?.usuario}</h2>
            </div>
          </div>
        </div> */}
        {/* <div className="row">
          <div className="col-12">
            <div className="home__page home__body"></div>
          </div>
        </div> */}
      </div>
    </>
  );
};

export default Dashboard;
