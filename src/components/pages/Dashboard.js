import React from "react";
import Topbar from "../layouts/topbar/Topbar";
import "../views/DashboardView.css";
import useValues from "../../provider/useValues";

const Dashboard = () => {
  const { isCollapsed, user } = useValues();
  var img = new Image();
  img.src = "/img/logo.png";
  return (
    <>
      <Topbar />
      <div className={`wrapper ${isCollapsed ? "sidebar-collapsed" : ""}`}>
        <div className="row">
          <div className="col-12">
            <div className="home__page home__header">
              <div>
                <h2 className="home__title">
                  BIENVENIDO <span>{user?.usuario}</span>
                </h2>
              </div>
              <img
                src={`${process.env.PUBLIC_URL + "/img/logo.png"}`}
                alt="logo"
                className="home__img"
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="home__page home__body"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
