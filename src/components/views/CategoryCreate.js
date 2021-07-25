import "./DashboardView.css";
import Topbar from "../layouts/topbar/Topbar";
import useValues from "../../provider/useValues";
const CategoryCreate = () => {
  const { isCollapsed } = useValues();
  return (
    <>
      <Topbar />
      <div className={`wrapper ${isCollapsed ? "sidebar-collapsed" : ""}`}>
        <h1>Create Category</h1>
      </div>
    </>
  );
};

export default CategoryCreate;
