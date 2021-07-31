import "./DashboardView.css";
import Topbar from "../layouts/topbar/Topbar";
import useValues from "../../provider/useValues";
import { NavLink } from "react-router-dom";
import EmpresaView from "./EmpresaView";
import AccountView from "./AccountView";
import BackUpView from "./BackUpView";

const ConfigView = (props) => {
  const { pathname } = props.location;
  const { isCollapsed } = useValues();

  return (
    <>
      <Topbar />
      <div className={`wrapper ${isCollapsed ? "sidebar-collapsed" : ""}`}>
        <h1>Configuraciones</h1>
        <div>
          <nav>
            <ul>
              <li>
                <NavLink to="/dashboard">Home</NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/settings">Configuración</NavLink>
              </li>
            </ul>
          </nav>
        </div>
        <h3>Navegación</h3>
        <div>
          <ul>
            <li>
              <NavLink to="/dashboard/settings/account">Configuración de la Cuenta</NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/settings/empresa">Datos de Compañía</NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/settings/backup">Respaldo</NavLink>
            </li>
          </ul>
        </div>
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
        )}
      </div>
    </>
  );
};

export default ConfigView;
