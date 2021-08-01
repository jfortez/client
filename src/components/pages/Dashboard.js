import React from "react";
import Topbar from "../layouts/topbar/Topbar";
import "../views/DashboardView.css";
import useValues from "../../provider/useValues";
import { PlaylistAddCheck, Autorenew, DoneAll, BugReport } from "@material-ui/icons";
const Dashboard = () => {
  const { isCollapsed, user } = useValues();
  return (
    <>
      <Topbar />
      <div className={`wrapper ${isCollapsed ? "sidebar-collapsed" : ""}`}>
        <div className="row">
          <h3>Bienvenido {user?.usuario}</h3>
        </div>
        <div className="row">
          <div className="col-3">
            <div className="counter bg-primary">
              <PlaylistAddCheck className="iconcol" />
              <h3>100+</h3>
              <p>To do</p>
            </div>
          </div>
          <div className="col-3">
            <div className="counter bg-warning">
              <Autorenew className="iconcol" />
              <h3>100+</h3>
              <p>In Progress</p>
            </div>
          </div>
          <div className="col-3">
            <div className="counter bg-success">
              <DoneAll className="iconcol" />
              <h3>100+</h3>
              <p>Completed</p>
            </div>
          </div>
          <div className="col-3">
            <div className="counter bg-danger">
              <BugReport className="iconcol" />
              <h3>100+</h3>
              <p>Issues</p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-3">
            <div className="counter bg-primary">
              <PlaylistAddCheck className="iconcol" />
              <h3>100+</h3>
              <p>To do</p>
            </div>
          </div>
          <div className="col-3">
            <div className="counter bg-warning">
              <Autorenew className="iconcol" />
              <h3>100+</h3>
              <p>In Progress</p>
            </div>
          </div>
          <div className="col-3">
            <div className="counter bg-success">
              <DoneAll className="iconcol" />
              <h3>100+</h3>
              <p>Completed</p>
            </div>
          </div>
          <div className="col-3">
            <div className="counter bg-danger">
              <BugReport className="iconcol" />
              <h3>100+</h3>
              <p>Issues</p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-3">
            <div className="counter bg-primary">
              <PlaylistAddCheck className="iconcol" />
              <h3>100+</h3>
              <p>To do</p>
            </div>
          </div>
          <div className="col-3">
            <div className="counter bg-warning">
              <Autorenew className="iconcol" />
              <h3>100+</h3>
              <p>In Progress</p>
            </div>
          </div>
          <div className="col-3">
            <div className="counter bg-success">
              <DoneAll className="iconcol" />
              <h3>100+</h3>
              <p>Completed</p>
            </div>
          </div>
          <div className="col-3">
            <div className="counter bg-danger">
              <BugReport className="iconcol" />
              <h3>100+</h3>
              <p>Issues</p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-3">
            <div className="counter bg-primary">
              <PlaylistAddCheck className="iconcol" />
              <h3>100+</h3>
              <p>To do</p>
            </div>
          </div>
          <div className="col-3">
            <div className="counter bg-warning">
              <Autorenew className="iconcol" />
              <h3>100+</h3>
              <p>In Progress</p>
            </div>
          </div>
          <div className="col-3">
            <div className="counter bg-success">
              <DoneAll className="iconcol" />
              <h3>100+</h3>
              <p>Completed</p>
            </div>
          </div>
          <div className="col-3">
            <div className="counter bg-danger">
              <BugReport className="iconcol" />
              <h3>100+</h3>
              <p>Issues</p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-3">
            <div className="counter bg-primary">
              <PlaylistAddCheck className="iconcol" />
              <h3>100+</h3>
              <p>To do</p>
            </div>
          </div>
          <div className="col-3">
            <div className="counter bg-warning">
              <Autorenew className="iconcol" />
              <h3>100+</h3>
              <p>In Progress</p>
            </div>
          </div>
          <div className="col-3">
            <div className="counter bg-success">
              <DoneAll className="iconcol" />
              <h3>100+</h3>
              <p>Completed</p>
            </div>
          </div>
          <div className="col-3">
            <div className="counter bg-danger">
              <BugReport className="iconcol" />
              <h3>100+</h3>
              <p>Issues</p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-3">
            <div className="counter bg-primary">
              <PlaylistAddCheck className="iconcol" />
              <h3>100+</h3>
              <p>To do</p>
            </div>
          </div>
          <div className="col-3">
            <div className="counter bg-warning">
              <Autorenew className="iconcol" />
              <h3>100+</h3>
              <p>In Progress</p>
            </div>
          </div>
          <div className="col-3">
            <div className="counter bg-success">
              <DoneAll className="iconcol" />
              <h3>100+</h3>
              <p>Completed</p>
            </div>
          </div>
          <div className="col-3">
            <div className="counter bg-danger">
              <BugReport className="iconcol" />
              <h3>100+</h3>
              <p>Issues</p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-3">
            <div className="counter bg-primary">
              <PlaylistAddCheck className="iconcol" />
              <h3>100+</h3>
              <p>To do</p>
            </div>
          </div>
          <div className="col-3">
            <div className="counter bg-warning">
              <Autorenew className="iconcol" />
              <h3>100+</h3>
              <p>In Progress</p>
            </div>
          </div>
          <div className="col-3">
            <div className="counter bg-success">
              <DoneAll className="iconcol" />
              <h3>100+</h3>
              <p>Completed</p>
            </div>
          </div>
          <div className="col-3">
            <div className="counter bg-danger">
              <BugReport className="iconcol" />
              <h3>100+</h3>
              <p>Issues</p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-3">
            <div className="counter bg-primary">
              <PlaylistAddCheck className="iconcol" />
              <h3>100+</h3>
              <p>To do</p>
            </div>
          </div>
          <div className="col-3">
            <div className="counter bg-warning">
              <Autorenew className="iconcol" />
              <h3>100+</h3>
              <p>In Progress</p>
            </div>
          </div>
          <div className="col-3">
            <div className="counter bg-success">
              <DoneAll className="iconcol" />
              <h3>100+</h3>
              <p>Completed</p>
            </div>
          </div>
          <div className="col-3">
            <div className="counter bg-danger">
              <BugReport className="iconcol" />
              <h3>100+</h3>
              <p>Issues</p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-3">
            <div className="counter bg-primary">
              <PlaylistAddCheck className="iconcol" />
              <h3>100+</h3>
              <p>To do</p>
            </div>
          </div>
          <div className="col-3">
            <div className="counter bg-warning">
              <Autorenew className="iconcol" />
              <h3>100+</h3>
              <p>In Progress</p>
            </div>
          </div>
          <div className="col-3">
            <div className="counter bg-success">
              <DoneAll className="iconcol" />
              <h3>100+</h3>
              <p>Completed</p>
            </div>
          </div>
          <div className="col-3">
            <div className="counter bg-danger">
              <BugReport className="iconcol" />
              <h3>100+</h3>
              <p>Issues</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
