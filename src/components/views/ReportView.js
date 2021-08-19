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
        <ul>
          <NavLink to="/dashboard/reporteria/ventas">
            <li>Ventas</li>
          </NavLink>
          <NavLink to="/dashboard/reporteria/caja">
            <li>Caja</li>
          </NavLink>
          <NavLink to="/dashboard/reporteria/historialpaciente">
            <li>Historial Paciente</li>
          </NavLink>
        </ul>
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
