import "./DashboardView.css";
import Topbar from "../layouts/topbar/Topbar";
import useValues from "../../provider/useValues";

const ReportView = () => {
  const { isCollapsed } = useValues();
  return (
    <>
      <Topbar />
      <div className={`wrapper ${isCollapsed ? "sidebar-collapsed" : ""}`}>
        <h1>Reportería</h1>
      </div>
    </>
  );
};

export default ReportView;
