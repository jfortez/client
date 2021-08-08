import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Location = () => {
  return (
    <>
      <li>
        <Link to="/dashboard/ventas">Nueva Venta</Link>
      </li>
      <li>
        <Link to="/dashboard/ventas/reporte">Reporte de Ventas</Link>
      </li>
    </>
  );
};
const NavigationVentas = () => {
  const { pathname } = useLocation();
  return (
    <div>
      <ul>
        {pathname === "/dashboard/ventas" ? (
          <Location />
        ) : pathname === "/dashboard/ventas/reporte" ? (
          <li>
            <Link to="/dashboard/ventas">Nueva Venta</Link>
          </li>
        ) : null}
      </ul>
    </div>
  );
};

export default NavigationVentas;
