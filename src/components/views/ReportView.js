import "./DashboardView.css";
import Topbar from "../layouts/topbar/Topbar";
import useValues from "../../provider/useValues";
import { NavLink, useLocation } from "react-router-dom";
import ReporteriaVentas from "./ReporteriaVentas";
import ReporteriaCaja from "./ReporteriaCaja";
import ReporteriaHistoriaPaciente from "./ReporteriaHistoriaPaciente";

const ReportView = () => {
  const { isCollapsed } = useValues();
  const { pathname } = useLocation();
  return (
    <>
      <Topbar />
      <div className={`wrapper ${isCollapsed ? "sidebar-collapsed" : ""}`}>
        <h1>Reportería</h1>
        {/* Navegacion */}
        <div className="navegacion">
          <nav>
            <ul>
              <li>
                <NavLink exact={true} to="/dashboard" className="navegacion__redirect">
                  Home
                </NavLink>
              </li>
              <li> / </li>
              <li>
                <NavLink to="/dashboard/reporteria/ventas" className="navegacion__redirect">
                  Ventas
                </NavLink>
              </li>
              <li> / </li>
              <li>
                <NavLink to="/dashboard/reporteria/caja" className="navegacion__redirect">
                  Caja
                </NavLink>
              </li>
              <li> / </li>
              <li>
                <NavLink
                  to="/dashboard/reporteria/historialpaciente"
                  className="navegacion__redirect"
                >
                  Historial Paciente
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
        <div>
          {pathname === "/dashboard/reporteria/ventas" ? (
            <ReporteriaVentas />
          ) : pathname === "/dashboard/reporteria/caja" ? (
            <ReporteriaCaja />
          ) : pathname === "/dashboard/reporteria/historialpaciente" ? (
            <ReporteriaHistoriaPaciente />
          ) : null}
        </div>
      </div>
    </>
  );
};

export default ReportView;
