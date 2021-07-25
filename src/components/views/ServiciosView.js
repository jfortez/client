import "./DashboardView.css";
import Topbar from "../layouts/topbar/Topbar";
import useValues from "../../provider/useValues";
const ServiciosView = () => {
  const { isCollapsed } = useValues();
  return (
    <>
      <Topbar />
      <div className={`wrapper ${isCollapsed ? "sidebar-collapsed" : ""}`}>
        <h1>Servicios</h1>
      </div>
    </>
  );
};

export default ServiciosView;
