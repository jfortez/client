import "./DashboardView.css";
import Topbar from "../layouts/topbar/Topbar";
import useValues from "../../provider/useValues";
import { Link, NavLink } from "react-router-dom";
import EmpresaView from "./EmpresaView";
import AccountView from "./AccountView";
import BackUpView from "./BackUpView";
import {
  // AccountBox,
  Business,
  // Storage
} from "@material-ui/icons";

const ConfigView = (props) => {
  const { pathname } = props.location;
  const { isCollapsed } = useValues();

  return (
    <>
      <Topbar />
      <div className={`wrapper ${isCollapsed ? "sidebar-collapsed" : ""}`}>
        <h3 className="titulo">Configuración</h3>
        <div className="navegacion">
          <nav>
            <ul>
              <li>
                <Link to="/dashboard" className="navegacion__redirect">
                  Inicio
                </Link>
              </li>
              <li> / </li>
              <li>
                <b>Configuración</b>
              </li>
            </ul>
          </nav>
        </div>
        <div className="row__config">
          <div className="col-left">
            <div className="vertical-menu">
              {/* <NavLink to="/dashboard/settings/account" className="link">
                <span className="navlink__icon">
                  <AccountBox className="navlink__icon__icon" />
                </span>
                <span className="navlink__title">Cuenta</span>
              </NavLink> */}
              <NavLink to="/dashboard/settings/empresa" className="link">
                <span className="navlink__icon">
                  <Business className="navlink__icon__icon" />
                </span>
                <span className="navlink__title">Empresa</span>
              </NavLink>
              {/* <NavLink to="/dashboard/settings/backup" className="link">
                <span className="navlink__icon">
                  <Storage className="navlink__icon__icon" />
                </span>
                <span className="navlink__title">Respaldo</span>
              </NavLink> */}
            </div>
          </div>
          <div className="col-right">
            <div className="contenido">
              {pathname === "/dashboard/settings" ? (
                <h4>Configuración</h4>
              ) : pathname === "/dashboard/settings/empresa" ? (
                <EmpresaView />
              ) : pathname === "/dashboard/settings/account" ? (
                <AccountView />
              ) : pathname === "/dashboard/settings/backup" ? (
                <BackUpView />
              ) : (
                <h1>nada</h1>
              )}{" "}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfigView;
