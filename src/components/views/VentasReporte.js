import Topbar from "../layouts/topbar/Topbar";
import useValues from "../../provider/useValues";
import "./DashboardView.css";
import NavigationVentas from "../../components/layouts/ventaComponents/NavigationVentas";

const VentasReporte = () => {
  const { isCollapsed } = useValues();

  return (
    <>
      <Topbar />
      <div className={`wrapper ${isCollapsed ? "sidebar-collapsed" : ""}`}>
        <NavigationVentas />
        <h1>Reporte de Ventas</h1>
      </div>
    </>
  );
};

export default VentasReporte;
